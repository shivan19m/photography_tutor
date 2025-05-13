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
        <div className="flex flex-wrap justify-center items-stretch gap-8 md:gap-12 py-4 md:px-8">
          {/* Composition Card */}
          <div className="bg-white p-8 rounded-xl shadow-md flex-1 max-w-xs flex flex-col items-center justify-center mx-2 md:mx-0">
            <div className="w-14 h-14 mx-auto mb-4 text-blue-500 flex items-center justify-center">
              {/* Grid/Frame Icon for Composition */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5" />
                <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5" />
                <line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center whitespace-nowrap">Composition</h3>
          </div>
          {/* ISO Card */}
          <div className="bg-white p-8 rounded-xl shadow-md flex-1 max-w-xs flex flex-col items-center justify-center mx-2 md:mx-0">
            <div className="w-14 h-14 mx-auto mb-4 text-blue-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center whitespace-nowrap">ISO</h3>
          </div>
          {/* Aperture Card */}
          <div className="bg-white p-8 rounded-xl shadow-md flex-1 max-w-xs flex flex-col items-center justify-center mx-2 md:mx-0">
            <div className="w-14 h-14 mx-auto mb-4 text-blue-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center whitespace-nowrap">Aperture</h3>
          </div>
          {/* Shutter Speed Card */}
          <div className="bg-white p-8 rounded-xl shadow-md min-w-[220px] flex flex-col items-center mx-2 md:mx-4">
            <div className="w-14 h-14 mx-auto mb-4 text-blue-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center whitespace-nowrap">Shutter Speed</h3>
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
