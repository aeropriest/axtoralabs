import { NextResponse } from 'next/server';
import { decideAndConsumeAccess } from '@/lib/access-control';

/**
 * POST /api/session
 *
 * Mints a short-lived OpenAI Realtime session token for the client. Gated
 * by lib/access-control.ts which enforces:
 *   - N free sessions per IP per UTC day (RATE_LIMIT_DAILY)
 *   - paid credit-second balance keyed to the connected wallet (X-Wallet-Address)
 *
 * Returns the OpenAI session payload PLUS an X-Axtora-Tier header and an
 * `axtora` block describing which tier the user is on, so the client can
 * render the right banner / upsell.
 */
// Voices supported by the OpenAI Realtime API.
const SUPPORTED_REALTIME_VOICES = [
  'alloy',
  'echo',
  'shimmer',
  'ash',
  'ballad',
  'coral',
  'sage',
  'verse',
] as const;
const DEFAULT_VOICE = 'ash';

export async function POST(request: Request) {
  try {
    // Read the requested voice from the body (sent by the client based on
    // the active persona). Fall back to the default if missing/invalid.
    let requestedVoice = DEFAULT_VOICE as string;
    try {
      const body = await request.clone().json();
      if (body && typeof body.voice === 'string') {
        requestedVoice = body.voice;
      }
    } catch {
      // No body or not JSON — fine, use the default.
    }
    const voice = (SUPPORTED_REALTIME_VOICES as readonly string[]).includes(
      requestedVoice
    )
      ? requestedVoice
      : DEFAULT_VOICE;

    let access;
    try {
      access = await decideAndConsumeAccess(request);
    } catch (err) {
      console.error('[session] access-control crash, denying request:', err);
      return NextResponse.json(
        { error: 'Access control unavailable. Please try again shortly.' },
        { status: 503 }
      );
    }

    if (!access.allowed) {
      let status = 429;
      let message: string;
      if (access.reason === 'wallet_required') {
        status = 401;
        message = 'Connect a wallet to start talking.';
      } else if (access.reason === 'free_exhausted') {
        status = 402;
        message =
          "Your free trial is used up. Top up with $VIRTUAL credits to keep talking.";
      } else if (access.reason === 'ip_daily_exhausted') {
        status = 429;
        message =
          'Daily session limit reached for this network. Please try again tomorrow.';
      } else {
        status = 503;
        message =
          'We could not check your access right now. Please try again in a moment.';
      }
      return NextResponse.json(
        {
          error: 'access_denied',
          code: access.reason,
          message,
          tier: access.tier,
          freeTrial: access.freeTrial,
          creditSeconds: access.creditSeconds,
          resetAtIso: access.resetAtIso,
          walletAddress: access.walletAddress,
          ip: { used: access.ipUsed, limit: access.ipLimit },
        },
        {
          status,
          headers: {
            'X-Axtora-Tier': access.tier ?? 'none',
            'X-Axtora-Free-Trial-Remaining': String(
              access.freeTrial.remainingSeconds
            ),
            'X-Axtora-Credit-Seconds': String(access.creditSeconds),
          },
        }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY environment variable is not set');
      return NextResponse.json(
        {
          error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.',
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://api.openai.com/v1/realtime/sessions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-realtime-preview-2024-12-17',
          voice,
          modalities: ['audio', 'text'],
          instructions:
            "Start conversation with the user by saying 'Hello, how can I help you today?' Use the available tools when relevant. After executing a tool, you will need to respond (create a subsequent conversation item) to the user sharing the function result or error. If you do not respond with additional message with function result, user will not know you successfully executed the tool. Speak and respond in the language of the user.",
          tool_choice: 'auto',
          // Hard cap on each assistant reply to bound output cost.
          max_response_output_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      let errorMessage = `OpenAI API request failed: ${response.status} ${response.statusText}`;
      let errorCode: string | null = null;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error && errorJson.error.code) {
          errorCode = errorJson.error.code;
          errorMessage = errorJson.error.message || errorMessage;
        }
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }

      if (errorCode === 'unsupported_country_region_territory') {
        return NextResponse.json(
          {
            error: 'Location Error',
            message:
              'This service is not available in your current location. Please try using a VPN or contact support.',
            code: errorCode,
          },
          { status: 403 }
        );
      }
      if (response.status === 403) {
        return NextResponse.json(
          {
            error: 'Access Denied',
            message: errorMessage,
            code: errorCode || 'forbidden',
          },
          { status: 403 }
        );
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    // Surface the access-control decision so the client can update its UI
    // without a second round-trip to /api/quota.
    return NextResponse.json(
      {
        ...data,
        axtora: {
          tier: access.tier,
          freeTrial: access.freeTrial,
          creditSeconds: access.creditSeconds,
          walletAddress: access.walletAddress,
          resetAtIso: access.resetAtIso,
        },
      },
      {
        headers: {
          'X-Axtora-Tier': access.tier ?? 'none',
          'X-Axtora-Free-Trial-Remaining': String(
            access.freeTrial.remainingSeconds
          ),
          'X-Axtora-Credit-Seconds': String(access.creditSeconds),
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/session:', error);
    const statusCode =
      error instanceof Error && error.message.includes('403') ? 403 : 500;
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    let hint = 'Please check your OpenAI API key configuration and try again.';
    if (errorMessage.includes('403') && errorMessage.includes('Forbidden')) {
      hint =
        'This could be due to region restrictions, invalid API key, or insufficient permissions.';
    }
    return NextResponse.json(
      { error: errorMessage, hint },
      { status: statusCode }
    );
  }
}
