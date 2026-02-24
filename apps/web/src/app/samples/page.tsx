import Link from 'next/link';
import { sampleReports } from '@/data/sampleReports';

export default function SamplesPage() {
    const urgencyColors: Record<string, string> = {
        low: 'border-green-400 bg-green-50 dark:bg-green-900/10',
        medium: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10',
        high: 'border-orange-400 bg-orange-50 dark:bg-orange-900/10',
        critical: 'border-red-400 bg-red-50 dark:bg-red-900/10',
    };

    const urgencyLabels: Record<string, string> = {
        low: '🟢 Low',
        medium: '🟡 Medium',
        high: '🟠 High',
        critical: '🔴 Critical',
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur dark:bg-black/80">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600">🏥 Sehat</Link>
                    <div className="flex gap-6">
                        <Link href="/upload" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Upload</Link>
                        <Link href="/labs" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Labs</Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">🧪 Sample Blood Reports</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Ye 5 realistic blood test samples hain — different medical conditions ke saath.
                        Doctor verify kar sakta hai ki AI analysis accurate hai ya nahi.
                    </p>
                </div>

                {/* Legend */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-8 shadow-sm">
                    <p className="font-semibold mb-2">Urgency Legend:</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <span>🟢 Low = Sab Normal</span>
                        <span>🟡 Medium = Lifestyle Change</span>
                        <span>🟠 High = Doctor Zaroor</span>
                        <span>🔴 Critical = Turant Hospital</span>
                    </div>
                </div>

                {/* Sample Cards */}
                <div className="space-y-6">
                    {sampleReports.map((report) => {
                        const abnormalCount = report.values.filter(v => v.status !== 'normal').length;
                        const normalCount = report.values.filter(v => v.status === 'normal').length;
                        const criticalCount = report.values.filter(v => v.severity === 'critical').length;

                        return (
                            <Link
                                key={report.id}
                                href={`/report/${report.id}`}
                                className={`block border-l-4 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 ${urgencyColors[report.urgency]}`}
                            >
                                <div className="flex flex-wrap justify-between items-start gap-4">
                                    <div className="flex-1 min-w-[250px]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-lg font-bold">{report.conditionTag}</span>
                                            <span className="text-sm px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                {urgencyLabels[report.urgency]}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">{report.patientName}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {report.age} yrs • {report.gender} • {report.labName}
                                        </p>
                                        <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
                                            {report.condition}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">{report.testType}</p>
                                    </div>
                                    <div className="text-right text-sm space-y-1">
                                        <p className="text-green-600 font-semibold">✅ {normalCount} Normal</p>
                                        {abnormalCount > 0 && (
                                            <p className="text-orange-600 font-semibold">⚠️ {abnormalCount} Abnormal</p>
                                        )}
                                        {criticalCount > 0 && (
                                            <p className="text-red-600 font-semibold">🔴 {criticalCount} Critical</p>
                                        )}
                                        <p className="text-gray-400 mt-2">{report.reportDate}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-blue-600 mt-4 font-semibold">
                                    View Full Analysis →
                                </p>
                            </Link>
                        );
                    })}
                </div>

                {/* Info Section */}
                <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-3">🩺 Doctor Ke Liye Note</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Har report mein <strong>Doctor Verification Note</strong> hai — clinical summary ke saath.</li>
                        <li>• Values clinically accurate hain, based on standard Indian lab references.</li>
                        <li>• AI summary Hindi/Hinglish mein hai — patient-friendly language mein.</li>
                        <li>• Recommendations evidence-based hain aur Indian healthcare context ke hisaab se.</li>
                        <li>• Please verify karo ki AI ka analysis aur recommendations sahi hain.</li>
                    </ul>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                    <p>⚠️ <strong>Disclaimer:</strong> Ye sample reports testing aur demo ke liye hain. Real patients ka data nahi hai. AI analysis ki accuracy verify karne ke liye doctor se consult karein.</p>
                </div>
            </main>
        </div>
    );
}
