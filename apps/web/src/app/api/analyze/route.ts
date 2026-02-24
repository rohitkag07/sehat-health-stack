import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const MODEL_FALLBACKS = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-2.0-flash'];

async function tryGenerateContent(prompt: string | (string | { inlineData: { data: string; mimeType: string } })[]) {
    let lastError: Error | null = null;
    for (const modelName of MODEL_FALLBACKS) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = Array.isArray(prompt)
                ? await model.generateContent(prompt)
                : await model.generateContent(prompt);
            return result;
        } catch (err) {
            lastError = err as Error;
            console.log(`Model ${modelName} failed, trying next...`);
            continue;
        }
    }
    throw lastError || new Error('All models failed');
}

const ANALYSIS_PROMPT = `You are an expert medical lab report analyzer for Indian patients.
You MUST respond ONLY with valid JSON (no markdown, no backticks, no explanation outside JSON).

Analyze the blood test report text below and return a JSON object with this EXACT structure:
{
  "patientName": "string or null",
  "patientAge": number or null,
  "patientGender": "Male" or "Female" or null,
  "labName": "string or null",
  "reportDate": "YYYY-MM-DD or null",
  "testType": "string describing what tests were done",
  "urgency": "low" or "medium" or "high" or "critical",
  "overallStatus": "Short Hindi status like 'Sab Normal Hai' or 'Khoon Ki Kami Hai'",
  "summary": "3-5 line summary in simple Hindi/Hinglish explaining the report to the patient. Use friendly tone. Mention specific values that are abnormal.",
  "values": [
    {
      "name": "Test Name",
      "value": "numeric or string value",
      "unit": "unit",
      "normalRange": "range string",
      "status": "normal" or "low" or "high" or "critical",
      "severity": "none" or "low" or "medium" or "high" or "critical",
      "explanation": "1 line Hindi explanation for abnormal values, null for normal"
    }
  ],
  "recommendations": ["array of 5-8 actionable recommendations in Hindi/Hinglish"],
  "conditionTag": "emoji + condition like '✅ Healthy' or '🔴 Anemia' or '🟠 Diabetes'",
  "doctorNote": "Clinical summary in English for doctor verification. Include key findings, differential diagnosis hints, and suggested follow-up."
}

IMPORTANT RULES:
- For ALL values in the report, include them in the "values" array
- Compare each value against its normal range
- Flag abnormal values with status "low", "high", or "critical"
- severity should be: none (normal), low (borderline), medium (needs attention), high (needs treatment), critical (urgent)
- summary MUST be in simple Hindi/Hinglish (mix of Hindi + English medical terms)
- recommendations MUST be practical and in Hindi/Hinglish
- doctorNote should be clinical English for medical professionals
- If you can't parse something, make reasonable assumptions based on standard Indian lab formats

BLOOD TEST REPORT TEXT:
`;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Read file as text (for PDFs we'll extract text, for images we'll use vision)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let reportText = '';

        if (file.type === 'application/pdf') {
            // Dynamic import for pdf-parse (it has issues with static import in Next.js)
            try {
                const pdfParse = (await import('pdf-parse')).default;
                const pdfData = await pdfParse(buffer);
                reportText = pdfData.text;
            } catch {
                // If pdf-parse fails, send the raw buffer to Gemini as base64
                const base64 = buffer.toString('base64');
                reportText = `[PDF content - base64 encoded, please analyze]: ${base64.substring(0, 50000)}`;
            }
        } else if (file.type.startsWith('image/')) {
            // For images, we'll use Gemini Vision
            const imagePart = {
                inlineData: {
                    data: buffer.toString('base64'),
                    mimeType: file.type,
                },
            };

            const result = await tryGenerateContent([
                ANALYSIS_PROMPT,
                imagePart,
            ]);

            const response = result.response;
            const text = response.text();

            // Parse the JSON from Gemini's response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const analysis = JSON.parse(jsonMatch[0]);
                return NextResponse.json({
                    success: true,
                    analysis,
                    fileName: file.name,
                    fileType: file.type,
                });
            } else {
                return NextResponse.json({ error: 'Could not parse AI response' }, { status: 500 });
            }
        } else {
            // Try to read as text
            reportText = new TextDecoder().decode(buffer);
        }

        if (!reportText || reportText.trim().length < 20) {
            return NextResponse.json({
                error: 'Could not extract text from the file. Please try uploading a clear image or text-based PDF.'
            }, { status: 400 });
        }

        // Send to Gemini for analysis (with model fallback)
        const result = await tryGenerateContent(ANALYSIS_PROMPT + reportText);

        const response = result.response;
        const text = response.text();

        // Parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return NextResponse.json({ error: 'AI could not analyze this report. Please try again.' }, { status: 500 });
        }

        const analysis = JSON.parse(jsonMatch[0]);

        return NextResponse.json({
            success: true,
            analysis,
            fileName: file.name,
            fileType: file.type,
            extractedTextLength: reportText.length,
        });

    } catch (error: unknown) {
        console.error('Analysis error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            error: `Analysis failed: ${message}`
        }, { status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
