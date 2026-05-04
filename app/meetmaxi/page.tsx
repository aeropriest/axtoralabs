'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MeetMaxiPage() {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="bg-gradient-to-b from-[#5A4C8E] to-[#2D2A4A] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Meet <span className="text-[#F9C846]">MAXI</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium">
              Your AI Companion for Learning and Play
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Ask, learn, and play with Maxi, your friendly AI assistant that grows with you.
              Available now on iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">              
              <Link 
                href="https://play.google.com" 
                className="border-2 border-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white hover:bg-opacity-10 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                </svg>
                Google Play
              </Link>
            </div>
          </div>
          <div className="relative h-[600px] w-full max-w-[300px] mx-auto md:mx-0 md:ml-auto">
            <div className="absolute inset-0 bg-[#5A4C8E] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#7A6CAE]">
              <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-t-3xl"></div>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-black rounded-b-3xl"></div>
              <div className="h-full w-full pt-6 pb-6 flex items-center justify-center">
                <div className="relative h-full w-full">
                  {/* App screenshot showing the main interface */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-4 bg-[#f5f7fa]">
                    <div className="w-full">
                      <div className="bg-[#e9f0ff] rounded-full py-2 px-4 flex items-center gap-3 w-fit mx-auto">
                        <div className="w-8 h-8 rounded-full bg-[#1a2b4b] flex items-center justify-center overflow-hidden">
                          <span className="text-white text-xs">👨‍🚀</span>
                        </div>
                        <span className="text-[#4a5568] font-medium">Captain Cosmo</span>
                      </div>
                    </div>
                    
                    <div className="w-32 h-32 rounded-full bg-white border-8 border-[#ffebee] flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#ffcdd2]"></div>
                    </div>
                    
                    <div className="text-center text-[#4a5568] text-sm">
                      <p>Press and hold to speak</p>
                    </div>
                    
                    <div className="w-full bg-white rounded-full p-2 flex justify-between">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#a0aec0]">
                        <span>👤</span>
                      </button>
                      <button className="w-8 h-8 rounded-full bg-[#e9f0ff] flex items-center justify-center text-[#5A4C8E]">
                        <span>🎤</span>
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#a0aec0]">
                        <span>⚙️</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-[#2D2A4A] py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('features')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'features' 
                    ? 'bg-[#5A4C8E] text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('how-it-works')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'how-it-works' 
                    ? 'bg-[#5A4C8E] text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'privacy' 
                    ? 'bg-[#5A4C8E] text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Privacy
              </button>
            </div>
          </div>

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon="🎙️"
                title="Voice Recognition"
                description="Talk to Maxi naturally using your voice. Our advanced speech recognition understands even young voices."
              />
              <FeatureCard 
                icon="🧠"
                title="Smart Responses"
                description="Get personalized, age-appropriate answers to your questions on virtually any topic."
              />
              <FeatureCard 
                icon="📚"
                title="Educational Content"
                description="Learn about science, history, math, and more in a fun, interactive way."
              />
              <FeatureCard 
                icon="🔒"
                title="Child-Friendly"
                description="Safe and appropriate for all ages with parental controls and content filtering."
              />
              <FeatureCard 
                icon="💬"
                title="Conversation History"
                description="Review past chats and continue conversations where you left off."
              />
              <FeatureCard 
                icon="🌈"
                title="Fun Interactions"
                description="Play games, tell stories, and have entertaining conversations with your AI friend."
              />
            </div>
          )}

          {activeTab === 'how-it-works' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Simple Voice Commands</h3>
                  <p className="text-lg">
                    Just tap the microphone button and speak naturally to Maxi. Ask questions, 
                    request information, or just chat about your day. Maxi understands natural 
                    language and responds in a friendly, conversational way.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
                  {/* Voice interface mockup */}
                  <div className="w-64 h-full bg-[#f5f7fa] rounded-xl shadow-lg flex flex-col justify-between py-6 px-4">
                    <div className="w-full flex justify-center">
                      <div className="bg-[#e9f0ff] rounded-full py-2 px-4 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1a2b4b] flex items-center justify-center">
                          <span className="text-white text-xs">👨‍🚀</span>
                        </div>
                        <span className="text-[#4a5568] text-sm">Captain Cosmo</span>
                      </div>
                    </div>
                    
                    <div className="flex-grow flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white border-8 border-[#ffebee] flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#ffcdd2]"></div>
                      </div>
                    </div>
                    
                    <div className="text-center text-[#4a5568] text-xs mb-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-gray-100 p-4 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
                  {/* Character selection mockup */}
                  <div className="w-64 h-full bg-white rounded-xl shadow-lg flex flex-col py-6 px-4">
                    <h3 className="text-[#2D2A4A] text-lg font-semibold mb-4">Personas</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#f8f0ff] p-3 rounded-lg border border-[#e9d8ff]">
                        <div className="w-12 h-12 rounded-full bg-[#1a2b4b] mx-auto mb-2 flex items-center justify-center overflow-hidden">
                          <span className="text-white text-sm">🐻</span>
                        </div>
                        <h4 className="text-[#5A4C8E] text-sm font-medium text-center">Captain Cosmo</h4>
                        <p className="text-[#6b7280] text-xs text-center mt-1">An adventurous space explorer</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="w-12 h-12 rounded-full bg-[#1a2b4b] mx-auto mb-2 flex items-center justify-center overflow-hidden">
                          <span className="text-white text-sm">🐻</span>
                        </div>
                        <h4 className="text-[#2D2A4A] text-sm font-medium text-center">Professor Quirkz</h4>
                        <p className="text-[#6b7280] text-xs text-center mt-1">A funny scientist</p>
                      </div>
                    </div>
                    
                    <h3 className="text-[#2D2A4A] text-lg font-semibold mt-6 mb-3">Voices</h3>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#f8f0ff] p-3 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-[#e9f0ff] mx-auto mb-1 flex items-center justify-center">
                          <span className="text-[#5A4C8E] text-xs">🔊</span>
                        </div>
                        <p className="text-[#5A4C8E] text-xs text-center">Alloy</p>
                        <p className="text-[#6b7280] text-[10px] text-center">Versatile</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="w-8 h-8 rounded-full bg-[#f5f7fa] mx-auto mb-1 flex items-center justify-center">
                          <span className="text-[#6b7280] text-xs">🔊</span>
                        </div>
                        <p className="text-[#2D2A4A] text-xs text-center">Echo</p>
                        <p className="text-[#6b7280] text-[10px] text-center">Warm</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-[#2D2A4A] text-xs text-center mt-4">Fable</p>
                        <p className="text-[#6b7280] text-[10px] text-center">Story</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Personalized Experience</h3>
                  <p className="text-lg mb-4">
                    Choose from a variety of fun characters like Captain Cosmo or Professor Quirkz to be your AI companion.
                    Each character has their own unique personality and style of interaction.
                  </p>
                  <p className="text-lg">
                    Select different voice options to customize how Maxi sounds when speaking to you.
                    From warm and friendly to energetic and playful, find the perfect voice for your experience.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Easy Account Management</h3>
                  <p className="text-lg mb-4">
                    Sign in with your email to access your personalized settings and preferences across devices.
                    Your account keeps your experience consistent no matter where you use Maxi.
                  </p>
                  <p className="text-lg">
                    Parents can create and manage accounts for their children, ensuring appropriate content
                    and a safe learning environment tailored to their age and interests.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
                  {/* Account screen mockup */}
                  <div className="w-64 h-full bg-white rounded-xl shadow-lg flex flex-col py-6 px-4">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-[#f5f7fa] flex items-center justify-center">
                        <span className="text-[#5A4C8E] font-semibold">U</span>
                      </div>
                      <div>
                        <h4 className="text-[#2D2A4A] font-semibold">User</h4>
                        <p className="text-[#6b7280] text-xs">test@axarsoft.com</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-[#5A4C8E] text-white py-3 rounded-lg flex items-center justify-center gap-2 mb-auto">
                      <span className="text-sm">→</span>
                      <span className="text-sm font-medium">Log Out</span>
                    </button>
                    
                    <div className="w-full bg-white rounded-full p-1 flex justify-between mt-8">
                      <button className="w-6 h-6 rounded-full bg-[#f8f0ff] flex items-center justify-center text-[#5A4C8E] text-xs">
                        <span>👤</span>
                      </button>
                      <button className="w-6 h-6 rounded-full flex items-center justify-center text-[#a0aec0] text-xs">
                        <span>🎤</span>
                      </button>
                      <button className="w-6 h-6 rounded-full flex items-center justify-center text-[#a0aec0] text-xs">
                        <span>⚙️</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Your Privacy Matters</h3>
                <p className="text-lg mb-4">
                  At Axar Toys, we take your privacy seriously, especially when it comes to 
                  children&apos;s data. Here&apos;s how we protect your information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-[#f8f0ff] flex items-center justify-center mb-4">
                      <span className="text-[#5A4C8E] text-xl">🔒</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">No Conversation Storage</h4>
                    <p className="text-gray-600">
                      We don&apos;t save your conversations or queries. Each interaction is processed in real-time and then discarded. We have specifically designed our system to prioritize your privacy by not retaining conversation history.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-[#f8f0ff] flex items-center justify-center mb-4">
                      <span className="text-[#5A4C8E] text-xl">📝</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Minimal Data Collection</h4>
                    <p className="text-gray-600">
                      We only collect the information necessary to provide the service, such as account 
                      details for login purposes. Your personal information is kept to a minimum.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-[#f8f0ff] flex items-center justify-center mb-4">
                      <span className="text-[#5A4C8E] text-xl">🚫</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">No Advertising</h4>
                    <p className="text-gray-600">
                      We do not use your data for advertising purposes or sell it to third parties. 
                      Your information is used solely to provide and improve our service.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-[#f8f0ff] flex items-center justify-center mb-4">
                      <span className="text-[#5A4C8E] text-xl">👨‍👩‍👧‍👦</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Parental Controls</h4>
                    <p className="text-gray-600">
                      Parents have full control over their child&apos;s account and can review and manage 
                      any settings or information associated with it at any time.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-xl font-bold mb-4">How We Use Permissions</h3>
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f8f0ff] flex-shrink-0 flex items-center justify-center mr-4">
                    <span className="text-[#5A4C8E]">🎤</span>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold">Microphone Access</h4>
                    <p className="text-gray-600">
                      Used only to capture your voice for speech-to-text conversion during active use. 
                      We do not record or store audio files after processing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#f8f0ff] flex-shrink-0 flex items-center justify-center mr-4">
                    <span className="text-[#5A4C8E]">📶</span>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold">Network Access</h4>
                    <p className="text-gray-600">
                      Required to communicate with our AI services to process your queries and generate responses.
                      All data is transmitted securely using encryption.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg mb-4">
                  For our complete privacy policy with detailed information about how we protect your data:
                </p>
                <Link 
                  href="/privacy" 
                  className="bg-[#5A4C8E] text-white px-8 py-3 rounded-full font-semibold inline-flex items-center justify-center gap-2 hover:bg-opacity-90 transition"
                >
                  View Full Privacy Policy
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Parents & Kids Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Maxi has become my daughter's favorite learning companion. She asks it questions about everything from dinosaurs to space!"
              author="Sarah K."
              role="Parent of 8-year-old"
            />
            <TestimonialCard 
              quote="I love asking Maxi to help me with my homework. It explains things in a way that's easy to understand."
              author="Jacob, 12"
              role="Student"
            />
            <TestimonialCard 
              quote="As a teacher, I recommend Maxi to my students' parents. It's a wonderful tool that makes learning fun and interactive."
              author="Michael T."
              role="Elementary School Teacher"
            />
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="bg-[#3D3267] py-20 px-4 md:px-8 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Download MeetMaxi Today</h2>
          <p className="text-xl opacity-90 mb-10">
            Start a conversation with your new AI friend and discover the joy of learning together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">            
            <Link 
              href="https://play.google.com" 
              className="border-2 border-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white hover:bg-opacity-10 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
              </svg>
              Get it on Google Play
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2A4A] py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MeetMaxi</h3>
              <p className="opacity-70">
                Your AI companion for learning and play.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="space-y-2 opacity-70">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/meetmaxi">MeetMaxi</Link></li>
                <li><Link href="/support">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 opacity-70">
                <li><Link href="https://axarsoft.com/privacy">Privacy Policy</Link></li>
                <li><Link href="https://axarsoft.com/terms">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 opacity-70">
                <li><a href="mailto:support@axarsoft.com">support@axarsoft.com</a></li>
                <li><Link href="https://axarsoft.com/support">Support Center</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center opacity-70">
            <p>© {new Date().getFullYear()} Axar Toys. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="bg-[#3D3267] p-6 rounded-xl">
      <div className="text-3xl text-[#F9C846] mb-4">&quot;</div>
      <p className="italic mb-6">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm opacity-70">{role}</p>
      </div>
    </div>
  );
}
