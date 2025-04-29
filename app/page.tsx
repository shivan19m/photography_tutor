import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto text-center space-y-8 p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Learn the Basic Camera Settings in 10 Minutes
        </h1>
        <p className="text-xl text-gray-600">
          Master the fundamentals of:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          {/* ISO Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 mx-auto mb-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">ISO</h3>
          </div>
          
          {/* Aperture Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 mx-auto mb-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Aperture</h3>
          </div>
          
          {/* Shutter Speed Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 mx-auto mb-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Shutter Speed</h3>
          </div>
        </div>
        
        <div className="pt-8">
          <Link
            href="/learn"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
}
