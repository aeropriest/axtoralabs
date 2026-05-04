import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, voice } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Validate that the voice is one of the supported OpenAI voices
    // OpenAI supports: alloy, echo, fable, onyx, nova, shimmer
    const supportedVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
    const openaiVoice = supportedVoices.includes(voice) ? voice : 'alloy';

    // Call OpenAI API to convert text to speech
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: openaiVoice,
      input: text,
    });

    // Convert the response to an ArrayBuffer
    const buffer = await mp3.arrayBuffer();

    // Return the audio file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error in text-to-speech API:', error);
    return NextResponse.json(
      { error: 'Failed to convert text to speech' },
      { status: 500 }
    );
  }
}
