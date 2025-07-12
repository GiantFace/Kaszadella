import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Oldal nem található
        </h2>
        
        <p className="text-gray-600 mb-6">
          A keresett oldal nem létezik vagy át lett helyezve.
        </p>
        
        <div className="space-y-3">
          <Link 
            href="/"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Vissza a főoldalra
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Vissza az előző oldalra
          </button>
        </div>
      </div>
    </div>
  );
} 