import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform -rotate-1" />
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Master Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  Camera Settings
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Learn how to take control of your photography with manual camera settings
              </p>
              <div className="flex space-x-4">
                <a
                  href="/learn"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all group"
                >
                  Start Learning
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/hero-image.jpg"
                alt="Photography example"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Master the Three Pillars of Photography
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "ISO",
              description: "Control your camera's light sensitivity to capture perfect shots in any lighting condition.",
              icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
            },
            {
              title: "Aperture",
              description: "Master depth of field to create stunning portraits and landscape photos.",
              icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12a5 5 0 119.9 0A5 5 0 017 12zm0 0h10" />
                </svg>
              ),
            },
            {
              title: "Shutter Speed",
              description: "Freeze action or create artistic motion blur with perfect timing.",
              icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform" />
              <div className="relative bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl transform rotate-1" />
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to take your photography to the next level?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our interactive lessons and practice with real-world examples
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/learn"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Start Learning
            </a>
            <a
              href="/quiz"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 border-2 border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transform hover:-translate-y-0.5 transition-all"
            >
              Take the Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
