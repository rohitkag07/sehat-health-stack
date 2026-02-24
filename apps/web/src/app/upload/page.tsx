'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AnalysisResult {
  patientName?: string;
  patientAge?: number;
  patientGender?: string;
  labName?: string;
  reportDate?: string;
  testType?: string;
  urgency: string;
  overallStatus: string;
  summary: string;
  values: Array<{
    name: string;
    value: string;
    unit: string;
    normalRange: string;
    status: string;
    severity: string;
    explanation?: string;
  }>;
  recommendations: string[];
  conditionTag: string;
  doctorNote: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Sirf PDF ya Image (JPG/PNG) upload karein.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('File 15MB se badi nahi honi chahiye.');
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setError('');
    setProgress('📤 File upload ho rahi hai...');

    try {
      // Upload to API for analysis
      const formData = new FormData();
      formData.append('file', file);

      setProgress('🤖 AI report analyze kar raha hai... (30-60 seconds)');

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setProgress('✅ Analysis complete!');
      setAnalysis(data.analysis);

      // Store in localStorage for the report page
      const reportId = 'live-' + Date.now();
      localStorage.setItem(`report-${reportId}`, JSON.stringify({
        id: reportId,
        ...data.analysis,
        fileName: file.name,
        analyzedAt: new Date().toISOString(),
      }));

      // Redirect to report page after a brief pause
      setTimeout(() => {
        router.push(`/report/${reportId}`);
      }, 1500);

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Kuch galat ho gaya. Dobara try karein.';
      setError(message);
      setUploading(false);
      setProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur dark:bg-black/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">🏥 Sehat</Link>
          <div className="flex gap-6">
            <Link href="/samples" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">🧪 Samples</Link>
            <Link href="/labs" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Labs</Link>
          </div>
        </div>
      </nav>

      {/* Upload Section */}
      <main className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">📄 Upload Blood Report</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Apna blood test PDF ya photo upload karein. AI analyze karke Hindi mein result batayega.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 rounded-xl p-4 mb-6 text-center">
            <p className="text-red-700 dark:text-red-300">❌ {error}</p>
            <button
              onClick={() => { setError(''); setUploading(false); setAnalysis(null); }}
              className="mt-2 text-blue-600 underline"
            >
              Dobara try karein
            </button>
          </div>
        )}

        {/* Analysis Complete */}
        {analysis ? (
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Analysis Complete!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              File: <strong>{fileName}</strong>
            </p>
            <p className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
              {analysis.conditionTag} — {analysis.overallStatus}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Redirecting to full analysis...
            </p>
            <div className="animate-pulse text-blue-600">⏳ Loading report...</div>
          </div>
        ) : !uploading ? (
          /* Upload Dropzone */
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl font-semibold mb-2">Drag & drop your PDF or Image here</p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">or</p>
            <label className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition cursor-pointer inline-block">
              Choose File
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept=".pdf,image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleChange}
              />
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Supported: PDF, JPG, PNG, WEBP (Max 15MB)
            </p>
          </div>
        ) : (
          /* Uploading / Analyzing State */
          <div className="bg-white dark:bg-gray-800 border-2 border-blue-300 rounded-2xl p-12 text-center">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            </div>
            <p className="text-xl font-semibold mb-2">{progress}</p>
            <p className="text-gray-500 dark:text-gray-400">
              File: {fileName}
            </p>
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400">
              <p>🔒 Aapka report private hai — kisi ke saath share nahi hoga.</p>
              <p className="mt-1">⏱️ Analysis mein 30-60 seconds lag sakte hain.</p>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold mb-1">100% Private</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Aapka report sirf aap dekh sakte hain. Files server pe store nahi hoti.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold mb-1">AI Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Google Gemini AI analyze karega aur Hindi mein samjhayega.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <div className="text-2xl mb-2">📸</div>
            <h3 className="font-semibold mb-1">PDF + Photo</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PDF report ya report ki photo — dono supported hain.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
