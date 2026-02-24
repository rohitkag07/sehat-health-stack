import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur dark:bg-black/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🏥 Sehat</h1>
          <div className="flex gap-6">
            <Link href="/samples" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 font-semibold">
              🧪 Samples
            </Link>
            <Link href="/labs" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              Labs
            </Link>
            <Link href="/medicines" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              Medicines
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Apna Blood Test Report Samjho,
            <br />
            Hindi Mein
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload karo apna blood test PDF, aur AI aapko simple Hindi mein batayega ki sab normal hai ya nahi.
            <br />
            <strong>100% Private. 100% Secure.</strong>
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/upload"
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
            >
              📄 Upload Blood Report
            </Link>
            <Link
              href="/labs"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition"
            >
              🔬 Compare Lab Prices
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">Health Report AI</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Blood test reports ko AI analyze karta hai aur Hindi/Hinglish mein simple explanation deta hai.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">MedCompare</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Indore ke 50+ labs ke prices compare karo. CBC, Lipid Profile, Sugar test — sabse sasta dhundo.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-xl font-bold mb-2">GenericDawa</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Mehengi dawai ka generic alternative dhundo. 70-90% tak paise bachao.
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 dark:text-gray-500 mb-6">Trusted by people in Indore</p>
          <div className="flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <strong className="text-2xl text-blue-600">5+</strong>
              <p>Labs Listed</p>
            </div>
            <div>
              <strong className="text-2xl text-blue-600">₹0</strong>
              <p>Free to Start</p>
            </div>
            <div>
              <strong className="text-2xl text-blue-600">100%</strong>
              <p>Private & Secure</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>Built with ❤️ for India's healthcare accessibility</p>
          <p className="text-sm mt-2">Starting from Indore → Pan-India</p>
        </div>
      </footer>
    </div>
  );
}
