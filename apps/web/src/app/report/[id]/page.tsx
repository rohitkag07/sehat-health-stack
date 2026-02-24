'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getReportById, sampleReports, type BloodTestValue } from '@/data/sampleReports';

function StatusBadge({ status, severity }: { status: string; severity: string }) {
  const colors: Record<string, string> = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    none: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  };

  const labels: Record<string, string> = {
    critical: '↑ Critical',
    high: status === 'low' ? '↓ Low' : '↑ High',
    low: status === 'low' ? '↓ Low' : '↑ High',
    normal: '✓ Normal',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[severity] || colors.none}`}>
      {status === 'normal' ? '✓ Normal' : labels[status] || status}
    </span>
  );
}

function UrgencyBanner({ urgency, overallStatus }: { urgency: string; overallStatus: string }) {
  const config: Record<string, { bg: string; icon: string; label: string }> = {
    low: { bg: 'bg-green-50 dark:bg-green-900/20 border-green-500', icon: '✅', label: 'Sab Theek Hai' },
    medium: { bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500', icon: '⚠️', label: 'Dhyan Dein' },
    high: { bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-500', icon: '🚨', label: 'Doctor Se Milein' },
    critical: { bg: 'bg-red-50 dark:bg-red-900/20 border-red-500', icon: '🆘', label: 'TURANT Doctor' },
  };
  const c = config[urgency] || config.low;

  return (
    <div className={`${c.bg} border-2 rounded-2xl p-6 mb-8`}>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{c.icon}</div>
        <div>
          <h1 className="text-2xl font-bold">{overallStatus}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Urgency: <span className="font-semibold">{c.label}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const params = useParams();
  const reportId = params.id as string;
  const report = getReportById(reportId);

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
        <nav className="border-b bg-white/80 backdrop-blur dark:bg-black/80">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">🏥 Sehat</Link>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Report Not Found</h1>
          <p className="text-gray-600 mb-8">Is ID ka koi report nahi mila.</p>
          <Link href="/samples" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
            View Sample Reports →
          </Link>
        </main>
      </div>
    );
  }

  const abnormalValues = report.values.filter(v => v.status !== 'normal');
  const normalValues = report.values.filter(v => v.status === 'normal');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur dark:bg-black/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">🏥 Sehat</Link>
          <div className="flex gap-6">
            <Link href="/samples" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Samples</Link>
            <Link href="/labs" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Labs</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Patient Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h2 className="text-xl font-bold">{report.patientName}</h2>
              <p className="text-gray-500">{report.age} yrs • {report.gender} • {report.reportDate}</p>
              <p className="text-gray-500 text-sm">{report.labName}</p>
            </div>
            <div>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-bold">
                {report.conditionTag}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Test: {report.testType}</p>
        </div>

        {/* Urgency Banner */}
        <UrgencyBanner urgency={report.urgency} overallStatus={report.overallStatus} />

        {/* AI Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🤖 AI Summary (Hindi)
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {report.aiSummary}
          </p>
        </div>

        {/* Abnormal Values */}
        {abnormalValues.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">⚠️ Abnormal Values ({abnormalValues.length})</h2>
            <div className="space-y-4">
              {abnormalValues.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-l-4 ${item.severity === 'critical'
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                      : item.severity === 'high'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                        : item.severity === 'medium'
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
                          : 'border-blue-400 bg-blue-50 dark:bg-blue-900/10'
                    }`}
                >
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Value: <strong>{item.value} {item.unit}</strong> &nbsp;|&nbsp; Normal: {item.normalRange} {item.unit}
                      </p>
                      {item.explanation && (
                        <p className="text-sm mt-1 text-gray-700 dark:text-gray-300 italic">
                          💡 {item.explanation}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={item.status} severity={item.severity} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Normal Values */}
        {normalValues.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">✅ Normal Values ({normalValues.length})</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {normalValues.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <span className="font-medium text-sm">{item.name}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{item.value} {item.unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">💡 AI Recommendations</h2>
          <ul className="space-y-3">
            {report.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blue-600 text-xl mt-0.5">•</span>
                <span className="text-gray-700 dark:text-gray-300">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Doctor Verification Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            🩺 Doctor Verification Note
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-mono text-sm">
            {report.doctorNote}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/samples"
            className="flex-1 min-w-[150px] bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition text-center"
          >
            ← All Samples
          </Link>
          <Link
            href="/labs"
            className="flex-1 min-w-[150px] border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-xl font-semibold hover:bg-blue-50 transition text-center"
          >
            🔬 Book Follow-up
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-xl text-sm text-gray-600 dark:text-gray-400">
          <p>⚠️ <strong>Disclaimer:</strong> Ye AI analysis sirf informational purpose ke liye hai. Final diagnosis aur treatment ke liye qualified doctor se consult karein. Ye sample reports testing ke liye hain.</p>
        </div>
      </main>
    </div>
  );
}
