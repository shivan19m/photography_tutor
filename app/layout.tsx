import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PhotoLearn - Master Your Camera Settings",
  description: "Learn photography basics with interactive lessons and quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent opacity-50 pointer-events-none" />
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex items-center group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform" />
                    <span className="relative px-3 py-1 text-xl font-bold text-white">
                      PhotoLearn
                    </span>
                  </div>
                </a>
              </div>
              <div className="flex items-center space-x-6">
                <a 
                  href="/learn" 
                  className="relative text-white bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  Learn
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="mt-20 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">About PhotoLearn</h3>
                <p className="mt-4 text-gray-600">
                  Master the art of photography through interactive lessons and hands-on practice.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="/learn" className="text-gray-600 hover:text-blue-500">Lessons</a>
                  </li>
                  <li>
                    <a href="/quiz" className="text-gray-600 hover:text-blue-500">Practice Quiz</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
