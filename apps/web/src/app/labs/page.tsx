'use client';

import Link from 'next/link';

// Sample lab data (will come from Supabase later)
const labs = [
  { id: 1, name: 'Dr. Lal PathLabs', area: 'Vijay Nagar', rating: 4.3, homeCollection: true, tests: 150 },
  { id: 2, name: 'Redcliffe Labs', area: 'South Tukoganj', rating: 4.1, homeCollection: true, tests: 200 },
  { id: 3, name: 'Thyrocare', area: 'Indore', rating: 4.2, homeCollection: true, tests: 100 },
  { id: 4, name: 'Metropolis', area: 'Palasia', rating: 4.0, homeCollection: true, tests: 180 },
  { id: 5, name: 'Gupta Pathology Lab', area: 'Vijay Nagar', rating: 4.5, homeCollection: false, tests: 80 },
];

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur dark:bg-black/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">🏥 Sehat</Link>
          <div className="flex gap-6">
            <Link href="/labs" className="text-blue-600 font-semibold">Labs</Link>
            <Link href="/medicines" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Medicines</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Login</Link>
          </div>
        </div>
      </nav>

      {/* Labs Section */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🔬 Lab Price Comparison</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Indore ke best labs ke prices compare karo aur paise bachao
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search labs..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Areas</option>
            <option>Vijay Nagar</option>
            <option>Palasia</option>
            <option>South Tukoganj</option>
          </select>
        </div>

        {/* Labs List */}
        <div className="grid gap-4">
          {labs.map((lab) => (
            <div
              key={lab.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-1">{lab.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">📍 {lab.area}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-green-600">⭐ {lab.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lab.tests} tests available</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                {lab.homeCollection && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                    🏠 Home Collection Available
                  </span>
                )}
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                  📄 Online Reports
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <Link
                  href={`/lab/${lab.id}`}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-center"
                >
                  View Tests
                </Link>
                <a
                  href={`tel:+917310000000`}
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition"
                >
                  📞 Call
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Tests */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Popular Tests in Indore</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {['CBC ₹299+', 'Lipid Profile ₹499+', 'LFT ₹399+', 'KFT ₹399+', 'HbA1c ₹299+', 'TSH ₹349+', 'Vitamin B12 ₹799+', 'Vitamin D3 ₹899+'].map((test) => (
              <Link
                key={test}
                href={`/labs?test=${encodeURIComponent(test)}`}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center hover:shadow-md transition cursor-pointer"
              >
                <p className="font-semibold">{test}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
