'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setUploading(true);
    
    // Simulate upload (replace with actual Supabase upload)
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 2000);
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

      {/* Upload Section */}
      <main className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">📄 Upload Blood Report</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Apna blood test PDF upload karein. AI analyze karke Hindi mein result batayega.
          </p>
        </div>

        {!uploaded ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-6xl mb-4">📋</div>
            
            {uploading ? (
              <div>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-400">Uploading {fileName}...</p>
              </div>
            ) : (
              <>
                <p className="text-xl font-semibold mb-2">Drag & drop your PDF here</p>
                <p className="text-gray-500 dark:text-gray-400 mb-6">or</p>
                <label className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition cursor-pointer inline-block">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleChange}
                  />
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Supported format: PDF (Max 10MB)
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Upload Successful!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              File: <strong>{fileName}</strong>
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <p className="text-lg font-semibold mb-2">🔄 Analyzing your report...</p>
              <p className="text-gray-600 dark:text-gray-400">
                AI apne report ko analyze kar raha hai. Ye process 30-60 seconds le sakta hai.
              </p>
            </div>
            <Link
              href="/report/demo"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition inline-block"
            >
              View Analysis
            </Link>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold mb-1">100% Private</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Aapka report sirf aap dekh sakte hain. Encrypted storage.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold mb-1">AI Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced AI analyze karega aur Hindi mein samjhayega.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Instant Results</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              1-2 minute mein analysis complete. No waiting.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
