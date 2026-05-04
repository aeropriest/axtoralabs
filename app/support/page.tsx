import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'MeetMaxi Support | Axarsoft',
  description: 'Get help and support for MeetMaxi, your personal AI assistant.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            MeetMaxi Support
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            We&apos;re here to help you get the most out of your personal AI assistant.
          </p>
        </div>

        {/* Getting Started Guide */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 bg-[#5A4C8E] text-white">
            <h2 className="text-2xl font-bold">Getting Started with MeetMaxi</h2>
            <p className="mt-1 text-sm text-gray-100">A step-by-step guide to using your AI companion</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-full h-64 bg-[#f8f0ff] rounded-lg mb-4 p-4 flex items-center justify-center relative overflow-hidden">
                  <div className="w-48 h-full bg-white rounded-xl shadow-md flex flex-col py-6 px-4">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-[#5A4C8E]">meet maxi</h3>
                      <p className="text-gray-500 text-sm">ask, learn, play</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Download & Install</h3>
                <p className="text-gray-600">
                  Download MeetMaxi from the App Store or Google Play and install it on your device.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-full h-64 bg-[#f8f0ff] rounded-lg mb-4 p-4 flex items-center justify-center relative overflow-hidden">
                  <div className="w-48 h-full bg-white rounded-xl shadow-md flex flex-col py-6 px-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Welcome back</h3>
                    <div className="space-y-4">
                      <div className="text-left">
                        <p className="text-sm text-gray-500 mb-1">Email ID</p>
                        <div className="w-full h-10 border rounded-md px-3 flex items-center">
                          <p className="text-sm text-gray-700">test@axarsoft.com</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-500 mb-1">Password</p>
                        <div className="w-full h-10 border rounded-md px-3 flex items-center">
                          <p className="text-sm text-gray-700">••••••••</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Create an Account</h3>
                <p className="text-gray-600">
                  Sign up with your email or log in if you already have an account.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-full h-64 bg-[#f8f0ff] rounded-lg mb-4 p-4 flex items-center justify-center relative overflow-hidden">
                  <div className="w-48 h-full bg-[#f5f7fa] rounded-xl shadow-md flex flex-col items-center justify-between py-6 px-4">
                    <div className="w-full">
                      <div className="bg-[#e9f0ff] rounded-full py-2 px-3 flex items-center gap-2 w-fit mx-auto">
                        <div className="w-6 h-6 rounded-full bg-[#1a2b4b] flex items-center justify-center">
                          <span className="text-white text-xs">👨‍🚀</span>
                        </div>
                        <span className="text-[#4a5568] text-xs">Captain Cosmo</span>
                      </div>
                    </div>
                    
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-[#ffebee] flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#ffcdd2]"></div>
                    </div>
                    
                    <div className="text-center text-[#4a5568] text-xs">
                      <p>Press and hold to speak</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Start Talking</h3>
                <p className="text-gray-600">
                  Press and hold the microphone button to speak with Maxi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">How to Use MeetMaxi</h2>
          </div>
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#5A4C8E] text-white flex items-center justify-center mr-2 text-sm">1</span>
                  Choosing Your Character
                </h3>
                <div className="flex items-start mb-6">
                  <div className="w-full h-48 bg-[#f8f0ff] rounded-lg p-3 flex items-center justify-center relative overflow-hidden">
                    <div className="w-40 h-full bg-white rounded-xl shadow-sm flex flex-col py-4 px-3">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Personas</h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#f8f0ff] p-2 rounded-lg border border-[#e9d8ff]">
                          <div className="w-8 h-8 rounded-full bg-[#1a2b4b] mx-auto mb-1 flex items-center justify-center overflow-hidden">
                            <span className="text-white text-xs">🐻</span>
                          </div>
                          <p className="text-[#5A4C8E] text-xs font-medium text-center">Captain Cosmo</p>
                        </div>
                        
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                          <div className="w-8 h-8 rounded-full bg-[#1a2b4b] mx-auto mb-1 flex items-center justify-center overflow-hidden">
                            <span className="text-white text-xs">🐻</span>
                          </div>
                          <p className="text-gray-700 text-xs font-medium text-center">Professor Quirkz</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-gray-600">
                  <p className="mb-2"><strong>To choose a character:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Tap the profile icon at the bottom of the screen</li>
                    <li>Select the &quot;Personas&quot; tab</li>
                    <li>Choose your favorite character</li>
                    <li>Each character has a unique personality and style</li>
                  </ol>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#5A4C8E] text-white flex items-center justify-center mr-2 text-sm">2</span>
                  Talking to Maxi
                </h3>
                <div className="flex items-start mb-6">
                  <div className="w-full h-48 bg-[#f8f0ff] rounded-lg p-3 flex items-center justify-center relative overflow-hidden">
                    <div className="w-40 h-full bg-[#f5f7fa] rounded-xl shadow-sm flex flex-col items-center justify-between py-4 px-3">
                      <div className="w-16 h-16 rounded-full bg-white border-4 border-[#ffebee] flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#ffcdd2]"></div>
                      </div>
                      
                      <div className="text-center text-[#4a5568] text-xs">
                        <p>Press and hold to speak</p>
                      </div>
                      
                      <div className="w-full bg-white rounded-full p-1 flex justify-between">
                        <button className="w-6 h-6 rounded-full flex items-center justify-center text-[#a0aec0] text-xs">
                          <span>👤</span>
                        </button>
                        <button className="w-6 h-6 rounded-full bg-[#e9f0ff] flex items-center justify-center text-[#5A4C8E] text-xs">
                          <span>🎤</span>
                        </button>
                        <button className="w-6 h-6 rounded-full flex items-center justify-center text-[#a0aec0] text-xs">
                          <span>⚙️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-gray-600">
                  <p className="mb-2"><strong>To talk with Maxi:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Press and hold the microphone button</li>
                    <li>Speak clearly while holding the button</li>
                    <li>Release when you&apos;re done speaking</li>
                    <li>Maxi will respond to your question or request</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="space-y-8">
              <div>
                <dt className="text-lg font-medium text-gray-900">What is MeetMaxi?</dt>
                <dd className="mt-2 text-gray-600">
                  MeetMaxi is your personal AI assistant that helps you with daily tasks, answers questions, and provides intelligent conversation through voice interaction. It&apos;s designed to be educational, entertaining, and helpful for users of all ages.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">Why does MeetMaxi need microphone access?</dt>
                <dd className="mt-2 text-gray-600">
                  MeetMaxi requires microphone access to record your voice for speech-to-text conversion, allowing you to interact with the AI assistant through voice commands. Your privacy is important to us, and audio is only processed when you&apos;re actively using the app and pressing the microphone button.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">Can I change Maxi&apos;s voice?</dt>
                <dd className="mt-2 text-gray-600">
                  Yes! You can choose from several voice options including Alloy, Echo, and Fable. Each voice has its own unique characteristics. To change the voice, go to the settings menu and select the &quot;Voices&quot; option.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">Is my data secure?</dt>
                <dd className="mt-2 text-gray-600">
                  Yes, we take data security seriously. We do not save your conversations with Maxi. Your voice inputs are processed in real-time and then discarded. For more information, please visit our <Link href="/privacy" className="text-[#5A4C8E] font-medium hover:underline">Privacy Policy</Link> page.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <p className="text-gray-600 mb-4">
              If you need additional help or have specific questions about MeetMaxi, please reach out to our support team:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#5A4C8E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3 text-gray-600">
                  <p>Email: support@axarsoft.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#5A4C8E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3 text-gray-600">
                  <p>Response Time: Within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
