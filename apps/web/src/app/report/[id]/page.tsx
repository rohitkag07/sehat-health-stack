'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ReportPage() {
  const params = useParams();
  
  // Mock analysis data (will come from AI backend)
  const analysis = {
    summary: "Aapka blood test report mostly normal hai. Sirf 2 values thodi abnormal hain - Vitamin D3 kam hai aur HbA1c borderline high hai. Koi serious problem nahi hai, lekin kuch lifestyle changes karne chahiye.",
    abnormalValues: [
      { name: 'Vitamin D3', value: '12 ng/mL', normal: '30-100 ng/mL', status: 'low', severity: 'medium' },
      { name: 'HbA1c', value: '6.2%', normal: '<5.7%', status: 'high', severity: 'low' },
    ],
    normalValues: [
      { name: 'Hemoglobin', value: '14.2 g/dL', normal: '13-17 g/dL' },
      { name: 'WBC', value: '7,500 /μL', normal: '4,000-11,000 /μL' },
      { name: 'Platelets', value: '2.5 L/μL', normal: '1.5-4.5 L/μL' },
      { name: 'Cholesterol', value: '180 mg/dL', normal: '<200 mg/dL' },
    ],
    recommendations: [
      'Roz 20-30分钟 dhoop mein rahein (Vitamin D3 ke liye)',
      'Vitamin D3 supplement shuru karein (doctor se consult karke)',
      'Sugar intake kam karein (HbA1c control ke liye)',
      'Roz 30分钟 walk karein',
      '3 mahine baad repeat test karein'
    ],
    urgency: 'low'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur dark:bg-black/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">🏥 Sehat</Link>
          <div className="flex gap-6">
            <Link href="/labs" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Labs</Link>
            <Link href="/medicines" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Medicines</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Login</Link>
          </div>
        </div>
      </nav>

      {/* Report Analysis */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Status Banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl">✅</div>
            <div>
              <h1 className="text-2xl font-bold">Analysis Complete</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Overall: <span className="text-green-600 font-semibold">Mostly Normal</span> • 2 values need attention
              </p>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🤖 AI Summary (Hindi)
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        {/* Abnormal Values */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">⚠️ Abnormal Values</h2>
          <div className="space-y-4">
            {analysis.abnormalValues.map((item, idx) => (
              <div key={idx} className={`p-4 rounded-xl border-l-4 ${
                item.severity === 'medium' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your value: <strong>{item.value}</strong> (Normal: {item.normal})
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.status === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.status === 'high' ? '↑ High' : '↓ Low'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Normal Values */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">✅ Normal Values</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {analysis.normalValues.map((item, idx) => (
              <div key={idx} className="flex justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">💡 Recommendations</h2>
          <ul className="space-y-3">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/labs"
            className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition text-center"
          >
            🔬 Book Follow-up Tests
          </Link>
          <button className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition">
            📥 Download PDF
          </button>
          <button className="px-6 py-4 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition">
            📤 Share
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-xl text-sm text-gray-600 dark:text-gray-400">
          <p>⚠️ <strong>Disclaimer:</strong> Ye AI analysis sirf informational purpose ke liye hai. Final diagnosis aur treatment ke liye qualified doctor se consult karein.</p>
        </div>
      </main>
    </div>
  );
}
