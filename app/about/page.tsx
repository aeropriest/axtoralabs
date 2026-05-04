import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">ABOUT US</h1>
          <h2 className="text-4xl font-semibold text-blue-600 mb-6">
            We nurture fintech brands that care
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Axar Soft is a disruptive DTC accelerator that brings fintech brand experts, 
            digitally native operators and talent together -- building and partnering with 
            purposeful brands that seek to advance financial technology in Asia.
          </p>
        </div>

        {/* Problem Statement */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            Thousands of DTC businesses & founders want to build & grow their business 
            across Asia. They need a partner they can trust.
          </p>
        </div>

        {/* How We Build Brands */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How we build brands
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-4">1</span>
                <h3 className="text-xl font-semibold text-gray-900">Research & Strategy</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Leveraging our deep understanding of consumer insights, before we begin 
                our core team dives deep into order to understand and identify if there 
                is a clear market opportunity to build a brand in Asia.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-4">2</span>
                <h3 className="text-xl font-semibold text-gray-900">Define Business Plan</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Once we&apos;ve established the opportunity and see room for growth, we like 
                to get into the nuts and bolts of the plan, laying out the initial 
                hypothesis and roadmap for the next 6 months.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-4">3</span>
                <h3 className="text-xl font-semibold text-gray-900">Secure Operations & Logistics</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Depending on the initial target market, we make sure all logistics are 
                covered when it comes to distribution in the respective regions of 
                expected growth.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-4">4</span>
                <h3 className="text-xl font-semibold text-gray-900">Launch & Scale in Asia</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Once launched, we&apos;re constantly iterating and deploying the latest 
                growth strategies based on real time data from consumers, social media 
                and sales channels in daily & weekly cycles.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-lg text-gray-700">Years of Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-lg text-gray-700">Brands Grown</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-lg text-gray-700">Fintech Partners</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            OUR TEAM
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded-lg">
                <Image
                  src="/1.png"
                  alt="Ashok Jaiswal"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ashok Jaiswal</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded-lg">
                <Image
                  src="/2.png"
                  alt="Ka Ki Liu"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ka Ki Liu</h3>
              <p className="text-gray-600">Head of Marketing</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded-lg">
                <Image
                  src="/3.png"
                  alt="Anshul Ghanshala"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Anshul Ghanshala</h3>
              <p className="text-gray-600">Software Developer</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-900 rounded-lg p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-bold mr-4">
                  AS
                </div>
                <span className="text-sm">axar soft</span>
              </div>
              <p className="text-lg leading-relaxed">
                We build and partner with fintech brands, and grow them in 
                multipliers across Asia.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <p className="text-lg">(852) 6043 4478</p>
                <p className="text-lg">ashok@axarsoft.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
