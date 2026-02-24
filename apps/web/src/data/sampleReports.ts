// Realistic Blood Test Sample Reports for Doctor Verification
// Each sample represents a different medical condition with clinically accurate values

export interface BloodTestValue {
    name: string;
    value: string;
    unit: string;
    normalRange: string;
    status: 'normal' | 'low' | 'high' | 'critical';
    severity: 'none' | 'low' | 'medium' | 'high' | 'critical';
    explanation?: string;
}

export interface SampleReport {
    id: string;
    patientName: string;
    age: number;
    gender: 'Male' | 'Female';
    labName: string;
    reportDate: string;
    testType: string;
    condition: string;
    conditionTag: string;
    urgency: 'low' | 'medium' | 'high' | 'critical';
    overallStatus: string;
    aiSummary: string;
    values: BloodTestValue[];
    recommendations: string[];
    doctorNote: string;
}

export const sampleReports: SampleReport[] = [
    // ─────────────────────────────────────────────────
    // SAMPLE 1: Healthy Adult Male — All Normal
    // ─────────────────────────────────────────────────
    {
        id: 'sample-1-healthy',
        patientName: 'Rajesh Kumar',
        age: 32,
        gender: 'Male',
        labName: 'Dr. Lal PathLabs, Indore',
        reportDate: '2026-02-20',
        testType: 'Complete Blood Count (CBC) + Metabolic Panel',
        condition: 'Healthy Adult - All Normal',
        conditionTag: '✅ Healthy',
        urgency: 'low',
        overallStatus: 'Sab Normal Hai',
        aiSummary: 'Rajesh ji, aapka blood test report bilkul normal hai! 🎉 Hemoglobin, WBC, platelets, sugar, cholesterol, kidney aur liver — sab theek hain. Koi chinta ki baat nahi hai. Aap apni sehat ka dhyan ache se rakh rahe ho. Bas regular checkup karate rahein, saal mein ek baar.',
        values: [
            { name: 'Hemoglobin (Hb)', value: '14.8', unit: 'g/dL', normalRange: '13.0–17.0', status: 'normal', severity: 'none' },
            { name: 'RBC Count', value: '5.2', unit: 'million/μL', normalRange: '4.5–5.5', status: 'normal', severity: 'none' },
            { name: 'WBC Count', value: '7,200', unit: '/μL', normalRange: '4,000–11,000', status: 'normal', severity: 'none' },
            { name: 'Platelet Count', value: '2.5', unit: 'lakh/μL', normalRange: '1.5–4.5', status: 'normal', severity: 'none' },
            { name: 'PCV / Hematocrit', value: '44', unit: '%', normalRange: '40–50', status: 'normal', severity: 'none' },
            { name: 'MCV', value: '86', unit: 'fL', normalRange: '80–100', status: 'normal', severity: 'none' },
            { name: 'MCH', value: '29', unit: 'pg', normalRange: '27–33', status: 'normal', severity: 'none' },
            { name: 'MCHC', value: '34', unit: 'g/dL', normalRange: '32–36', status: 'normal', severity: 'none' },
            { name: 'Fasting Blood Sugar', value: '92', unit: 'mg/dL', normalRange: '70–100', status: 'normal', severity: 'none' },
            { name: 'HbA1c', value: '5.2', unit: '%', normalRange: '<5.7', status: 'normal', severity: 'none' },
            { name: 'Total Cholesterol', value: '178', unit: 'mg/dL', normalRange: '<200', status: 'normal', severity: 'none' },
            { name: 'HDL Cholesterol', value: '52', unit: 'mg/dL', normalRange: '>40', status: 'normal', severity: 'none' },
            { name: 'LDL Cholesterol', value: '105', unit: 'mg/dL', normalRange: '<130', status: 'normal', severity: 'none' },
            { name: 'Triglycerides', value: '120', unit: 'mg/dL', normalRange: '<150', status: 'normal', severity: 'none' },
            { name: 'Creatinine', value: '0.9', unit: 'mg/dL', normalRange: '0.7–1.3', status: 'normal', severity: 'none' },
            { name: 'Blood Urea', value: '28', unit: 'mg/dL', normalRange: '15–40', status: 'normal', severity: 'none' },
            { name: 'SGPT (ALT)', value: '25', unit: 'U/L', normalRange: '7–56', status: 'normal', severity: 'none' },
            { name: 'SGOT (AST)', value: '22', unit: 'U/L', normalRange: '10–40', status: 'normal', severity: 'none' },
            { name: 'TSH', value: '2.8', unit: 'mIU/L', normalRange: '0.4–4.0', status: 'normal', severity: 'none' },
            { name: 'Vitamin D3', value: '38', unit: 'ng/mL', normalRange: '30–100', status: 'normal', severity: 'none' },
            { name: 'Vitamin B12', value: '450', unit: 'pg/mL', normalRange: '200–900', status: 'normal', severity: 'none' },
        ],
        recommendations: [
            'Bahut badhiya! Aapka report bilkul normal hai.',
            'Rozana 30 minute exercise (walk, yoga, gym) karein.',
            'Balanced diet khayein — sabzi, dal, roti, fruits.',
            'Saal mein ek baar blood test karwayein (routine checkup).',
            'Paani din mein 8-10 glass peeyein.',
        ],
        doctorNote: '✅ DR VERIFICATION: Sab values normal range mein hain. Koi clinical concern nahi hai. Routine annual checkup sufficient hai.',
    },

    // ─────────────────────────────────────────────────
    // SAMPLE 2: Severe Anemia + Vitamin Deficiency (Female)
    // ─────────────────────────────────────────────────
    {
        id: 'sample-2-anemia',
        patientName: 'Sunita Devi',
        age: 28,
        gender: 'Female',
        labName: 'Redcliffe Labs, Indore',
        reportDate: '2026-02-18',
        testType: 'CBC + Iron Profile + Vitamins',
        condition: 'Severe Iron Deficiency Anemia + Vitamin D/B12 Deficiency',
        conditionTag: '🔴 Anemia',
        urgency: 'high',
        overallStatus: 'Khoon Ki Kami — Turant Doctor Se Milein',
        aiSummary: 'Sunita ji, aapke report mein kuch important problems hain jinpe turant dhyan dena zaroori hai. ⚠️ Aapka Hemoglobin sirf 7.8 hai jo bahut kam hai — iska matlab hai ki aapke shareer mein khoon ki kami hai (anemia). Iron bhi bahut kam hai (18 μg/dL). Saath mein Vitamin D3 aur Vitamin B12 dono ki bhi kami hai. Aapko jaldi se jaldi doctor se milna chahiye. Ye common hai Indian women mein lekin ilaaj zaroor karwayein.',
        values: [
            { name: 'Hemoglobin (Hb)', value: '7.8', unit: 'g/dL', normalRange: '12.0–15.5', status: 'critical', severity: 'critical', explanation: 'Bahut kam hai — severe anemia. Normal se lagbhag aadha hai.' },
            { name: 'RBC Count', value: '3.2', unit: 'million/μL', normalRange: '3.8–4.8', status: 'low', severity: 'high', explanation: 'Red blood cells ki sankhya kam hai.' },
            { name: 'PCV / Hematocrit', value: '26', unit: '%', normalRange: '36–44', status: 'low', severity: 'high', explanation: 'Blood mein RBC ka proportion bahut kam hai.' },
            { name: 'MCV', value: '68', unit: 'fL', normalRange: '80–100', status: 'low', severity: 'medium', explanation: 'RBC ka size chhota hai — microcytic anemia ka sign.' },
            { name: 'MCH', value: '22', unit: 'pg', normalRange: '27–33', status: 'low', severity: 'medium', explanation: 'Har RBC mein hemoglobin kam hai.' },
            { name: 'MCHC', value: '28', unit: 'g/dL', normalRange: '32–36', status: 'low', severity: 'medium', explanation: 'Hypochromic — RBC ka rang halka hai.' },
            { name: 'RDW', value: '18.5', unit: '%', normalRange: '11.5–14.5', status: 'high', severity: 'medium', explanation: 'RBC size mein variation zyada hai — iron deficiency ka sign.' },
            { name: 'WBC Count', value: '6,800', unit: '/μL', normalRange: '4,000–11,000', status: 'normal', severity: 'none' },
            { name: 'Platelet Count', value: '3.2', unit: 'lakh/μL', normalRange: '1.5–4.5', status: 'normal', severity: 'none' },
            { name: 'Serum Iron', value: '18', unit: 'μg/dL', normalRange: '60–170', status: 'critical', severity: 'critical', explanation: 'Iron bahut kam hai — yahi anemia ki wajah hai.' },
            { name: 'TIBC', value: '480', unit: 'μg/dL', normalRange: '250–370', status: 'high', severity: 'medium', explanation: 'Body iron ki kami ko compensate karne ki koshish kar rahi hai.' },
            { name: 'Serum Ferritin', value: '8', unit: 'ng/mL', normalRange: '12–150', status: 'low', severity: 'high', explanation: 'Iron ka storage bahut kam hai — iska matlab iron lamba samay se kam tha.' },
            { name: 'Transferrin Saturation', value: '6', unit: '%', normalRange: '20–50', status: 'critical', severity: 'critical', explanation: 'Sirf 6% iron transfer ho raha hai — bahut kam.' },
            { name: 'Vitamin D3', value: '8', unit: 'ng/mL', normalRange: '30–100', status: 'critical', severity: 'high', explanation: 'Bahut severe deficiency — haddiyaan kamzor ho sakti hain.' },
            { name: 'Vitamin B12', value: '125', unit: 'pg/mL', normalRange: '200–900', status: 'low', severity: 'medium', explanation: 'B12 ki kami hai — thakan aur weakness ka ek karan ye bhi hai.' },
            { name: 'Fasting Blood Sugar', value: '88', unit: 'mg/dL', normalRange: '70–100', status: 'normal', severity: 'none' },
            { name: 'TSH', value: '3.5', unit: 'mIU/L', normalRange: '0.4–4.0', status: 'normal', severity: 'none' },
        ],
        recommendations: [
            '🚨 TURANT doctor se milein — Hemoglobin 7.8 bahut kam hai.',
            'Doctor iron injection ya IV iron therapy recommend kar sakte hain.',
            'Iron-rich khana khayein: palak, chana, gur (jaggery), kali kishmish, anar.',
            'Vitamin C wale fruits (amla, nimbu, santre) iron absorption badhate hain.',
            'Chai/coffee khana khane ke saath mat peeyein — iron absorption rokti hai.',
            'Vitamin D3 supplement zaroor lein (doctor ki salah se 60,000 IU weekly).',
            'Vitamin B12 supplement bhi lein (methylcobalamin form best hai).',
            '6 hafte baad dobara blood test karwayein — progress check karne ke liye.',
        ],
        doctorNote: '🔴 DR VERIFICATION: Severe iron deficiency anemia (IDA). Hb 7.8, Ferritin 8, TSAT 6% — consistent with severe IDA. Microcytic hypochromic picture (MCV 68, MCH 22). Concurrent Vit D3 (8) aur B12 (125) deficiency. Patient ko urgently iron infusion + supplementation chahiye. Underlying cause (menorrhagia/dietary) investigate karna chahiye. Follow-up CBC + iron profile 6 weeks mein.',
    },

    // ─────────────────────────────────────────────────
    // SAMPLE 3: Diabetic with Kidney Stress (Male, 55)
    // ─────────────────────────────────────────────────
    {
        id: 'sample-3-diabetic',
        patientName: 'Mohammad Iqbal',
        age: 55,
        gender: 'Male',
        labName: 'Metropolis Healthcare, Indore',
        reportDate: '2026-02-15',
        testType: 'Diabetic Panel + KFT + Lipid Profile',
        condition: 'Uncontrolled Diabetes + Early Kidney Damage + Dyslipidemia',
        conditionTag: '🟠 Diabetes',
        urgency: 'high',
        overallStatus: 'Sugar Control Nahi Hai — Kidney Pe Asar Shuru',
        aiSummary: 'Iqbal sahab, aapke report mein kuch major concerns hain. ⚠️ Aapka HbA1c 9.2% hai — iska matlab hai ki pichle 3 mahine mein sugar bahut zyada rahi hai (controlled nahi hai). Fasting sugar bhi 186 hai jo bahut high hai. Aapke kidney ke tests mein bhi thoda asar dikh raha hai — creatinine 1.6 hai aur urine mein protein aa raha hai (microalbuminuria). Cholesterol bhi high hai. Ye sab diabetes ke complications hain. Doctor se turant milein aur dawai adjust karwayein.',
        values: [
            { name: 'Fasting Blood Sugar', value: '186', unit: 'mg/dL', normalRange: '70–100', status: 'critical', severity: 'high', explanation: 'Sugar bahut zyada hai — diabetes uncontrolled hai.' },
            { name: 'Post Prandial Sugar (PP)', value: '312', unit: 'mg/dL', normalRange: '<140', status: 'critical', severity: 'critical', explanation: 'Khana khane ke baad sugar 312 hai — bahut khatarnak level hai.' },
            { name: 'HbA1c', value: '9.2', unit: '%', normalRange: '<5.7 (Normal), <7.0 (Diabetic Target)', status: 'critical', severity: 'critical', explanation: '3 mahine ki average sugar bahut high hai. Target 7% se neeche rakhna chahiye.' },
            { name: 'Fasting Insulin', value: '18.5', unit: 'μIU/mL', normalRange: '2.6–24.9', status: 'normal', severity: 'none' },
            { name: 'Creatinine', value: '1.6', unit: 'mg/dL', normalRange: '0.7–1.3', status: 'high', severity: 'high', explanation: 'Kidney function thodi kamzor hai — diabetes ka asar.' },
            { name: 'Blood Urea', value: '52', unit: 'mg/dL', normalRange: '15–40', status: 'high', severity: 'medium', explanation: 'Kidney waste properly filter nahi kar pa rahi.' },
            { name: 'eGFR', value: '58', unit: 'mL/min', normalRange: '>90', status: 'low', severity: 'high', explanation: 'Kidney function 58% hai — Stage 3A CKD ke range mein hai.' },
            { name: 'Urine Microalbumin', value: '85', unit: 'mg/L', normalRange: '<30', status: 'high', severity: 'high', explanation: 'Urine mein protein aa raha hai — early diabetic kidney damage ka sign.' },
            { name: 'Urine ACR', value: '68', unit: 'mg/g', normalRange: '<30', status: 'high', severity: 'high', explanation: 'Albumin-Creatinine ratio high hai — kidney damage confirm.' },
            { name: 'Total Cholesterol', value: '265', unit: 'mg/dL', normalRange: '<200', status: 'high', severity: 'medium', explanation: 'Cholesterol zyada hai — heart disease ka risk badhta hai.' },
            { name: 'LDL Cholesterol', value: '168', unit: 'mg/dL', normalRange: '<100 (Diabetic Target)', status: 'high', severity: 'high', explanation: 'Bad cholesterol bahut high hai — diabetic ke liye target 100 se neeche hona chahiye.' },
            { name: 'HDL Cholesterol', value: '34', unit: 'mg/dL', normalRange: '>40', status: 'low', severity: 'medium', explanation: 'Good cholesterol kam hai — exercise se badhta hai.' },
            { name: 'Triglycerides', value: '285', unit: 'mg/dL', normalRange: '<150', status: 'high', severity: 'high', explanation: 'Triglycerides bahut high — sugar control se improve hoga.' },
            { name: 'Hemoglobin', value: '12.8', unit: 'g/dL', normalRange: '13.0–17.0', status: 'low', severity: 'low', explanation: 'Thoda kam hai — kidney disease se anemia ho sakta hai.' },
            { name: 'Uric Acid', value: '8.2', unit: 'mg/dL', normalRange: '3.5–7.2', status: 'high', severity: 'low', explanation: 'Thoda zyada hai — gout aur kidney stone ka risk.' },
            { name: 'Sodium', value: '140', unit: 'mEq/L', normalRange: '136–145', status: 'normal', severity: 'none' },
            { name: 'Potassium', value: '5.3', unit: 'mEq/L', normalRange: '3.5–5.0', status: 'high', severity: 'medium', explanation: 'Thoda high hai — kidney function se related. Monitor karna zaroori.' },
        ],
        recommendations: [
            '🚨 Doctor se TURANT milein — diabetes uncontrolled hai aur kidney pe asar shuru ho gaya.',
            'Dawai adjust karwayein — current treatment sufficient nahi hai.',
            'Sugar monitoring daily karein — fasting aur PP dono check karein.',
            'Diet mein drastic changes zaroor karein: maida, meetha, rice kam karein.',
            'Namak bhi kam karein (kidney ke liye important).',
            'Cholesterol ki dawai (statin) shuru karni pad sakti hai — doctor se puchein.',
            'Daily 45 minute walk zaroor karein — sugar aur cholesterol dono control hoga.',
            'Kidney function har 3 mahine check karwayein.',
            'Aankh ka checkup bhi karwayein — diabetes se retinopathy hoti hai.',
            'Pair ke neeche ki feeling check karwayein — neuropathy screen.',
        ],
        doctorNote: '🟠 DR VERIFICATION: Uncontrolled T2DM (HbA1c 9.2%, FBS 186, PPBS 312). Early diabetic nephropathy — Cr 1.6, eGFR 58 (CKD Stage 3A), microalbuminuria present (ACR 68). Mixed dyslipidemia (TC 265, LDL 168, TG 285, HDL 34). Needs: treatment intensification (consider insulin/GLP-1 RA), ACEi/ARB for renal protection, statin therapy. Ophthalmology referral. 3-monthly monitoring essential.',
    },

    // ─────────────────────────────────────────────────
    // SAMPLE 4: Liver Dysfunction — Fatty Liver / Early Damage (Male, 42)
    // ─────────────────────────────────────────────────
    {
        id: 'sample-4-liver',
        patientName: 'Vikram Singh',
        age: 42,
        gender: 'Male',
        labName: 'Thyrocare, Indore (Home Collection)',
        reportDate: '2026-02-12',
        testType: 'LFT + Lipid Profile + CBC',
        condition: 'Fatty Liver Disease (NAFLD) + Dyslipidemia',
        conditionTag: '🟡 Liver',
        urgency: 'medium',
        overallStatus: 'Liver Pe Stress Hai — Lifestyle Change Zaroor Karein',
        aiSummary: 'Vikram ji, aapke liver function tests mein kuch values high hain. SGPT (ALT) 92 hai aur SGOT (AST) 68 hai — ye normal se zyada hain. GGT bhi 115 hai jo liver pe stress ka sign hai. Ye aam taur pe fatty liver (charbi jama hona) ki wajah se hota hai. Cholesterol aur triglycerides bhi high hain. Agar aap regularly sharaab peete ho toh band karna bahut zaroori hai. Weight kam karna sabse important ilaaj hai.',
        values: [
            { name: 'SGPT (ALT)', value: '92', unit: 'U/L', normalRange: '7–56', status: 'high', severity: 'medium', explanation: 'Liver enzyme zyada hai — liver cells damage ho rahe hain.' },
            { name: 'SGOT (AST)', value: '68', unit: 'U/L', normalRange: '10–40', status: 'high', severity: 'medium', explanation: 'Liver enzyme high — liver inflammation ka sign.' },
            { name: 'GGT', value: '115', unit: 'U/L', normalRange: '0–65', status: 'high', severity: 'medium', explanation: 'Bahut zyada — alcohol use ya fatty liver se badh jaata hai.' },
            { name: 'ALP (Alkaline Phosphatase)', value: '125', unit: 'U/L', normalRange: '44–147', status: 'normal', severity: 'none' },
            { name: 'Total Bilirubin', value: '1.4', unit: 'mg/dL', normalRange: '0.1–1.2', status: 'high', severity: 'low', explanation: 'Thoda high — liver ka processing slow hai.' },
            { name: 'Direct Bilirubin', value: '0.5', unit: 'mg/dL', normalRange: '0–0.3', status: 'high', severity: 'low' },
            { name: 'Total Protein', value: '7.2', unit: 'g/dL', normalRange: '6.0–8.3', status: 'normal', severity: 'none' },
            { name: 'Albumin', value: '3.8', unit: 'g/dL', normalRange: '3.5–5.5', status: 'normal', severity: 'none' },
            { name: 'Globulin', value: '3.4', unit: 'g/dL', normalRange: '2.0–3.5', status: 'normal', severity: 'none' },
            { name: 'A/G Ratio', value: '1.1', unit: '', normalRange: '1.0–2.2', status: 'normal', severity: 'none' },
            { name: 'Total Cholesterol', value: '248', unit: 'mg/dL', normalRange: '<200', status: 'high', severity: 'medium', explanation: 'High cholesterol — fatty liver ke saath aam hai.' },
            { name: 'LDL Cholesterol', value: '155', unit: 'mg/dL', normalRange: '<130', status: 'high', severity: 'medium' },
            { name: 'HDL Cholesterol', value: '36', unit: 'mg/dL', normalRange: '>40', status: 'low', severity: 'medium', explanation: 'Good cholesterol kam hai.' },
            { name: 'Triglycerides', value: '320', unit: 'mg/dL', normalRange: '<150', status: 'high', severity: 'high', explanation: 'Bahut zyada — fatty liver se directly related.' },
            { name: 'VLDL', value: '64', unit: 'mg/dL', normalRange: '<30', status: 'high', severity: 'medium' },
            { name: 'Hemoglobin', value: '15.2', unit: 'g/dL', normalRange: '13.0–17.0', status: 'normal', severity: 'none' },
            { name: 'Fasting Blood Sugar', value: '108', unit: 'mg/dL', normalRange: '70–100', status: 'high', severity: 'low', explanation: 'Borderline high — pre-diabetes ka sign ho sakta hai.' },
            { name: 'Platelet Count', value: '1.8', unit: 'lakh/μL', normalRange: '1.5–4.5', status: 'normal', severity: 'none' },
        ],
        recommendations: [
            '⚠️ Doctor se LFT discuss karein — liver enzymes elevated hain.',
            'Alcohol puri tarah se band karein (agar peete hain toh).',
            'Weight loss zaroor karein — 5-10% weight kam karne se fatty liver improve hota hai.',
            'Tla hua khana, junk food, maida, meetha — sab band.',
            'Daily 45 minute brisk walk ya cycling karein.',
            'Liver ke liye Ultrasound (USG Abdomen) karwayein — fatty liver grade check hoga.',
            'HbA1c test bhi karwayein — fasting sugar borderline high hai.',
            'Paani zyada peeyein — din mein 3-4 litre.',
            '3 mahine baad LFT repeat karwayein.',
        ],
        doctorNote: '🟡 DR VERIFICATION: Elevated transaminases (ALT 92, AST 68) with raised GGT (115) — suggestive of NAFLD/NASH or alcoholic liver disease. AST:ALT ratio <1 favors NAFLD. Dyslipidemia present (TG 320, LDL 155, HDL 36). Mild hyperbilirubinemia. Impaired fasting glucose (108). Recommend: USG abdomen, FibroScan if available, HbA1c, Hepatitis B/C screening. Lifestyle modification is first-line treatment.',
    },

    // ─────────────────────────────────────────────────
    // SAMPLE 5: Thyroid Disorder + Anemia (Female, 35)
    // ─────────────────────────────────────────────────
    {
        id: 'sample-5-thyroid',
        patientName: 'Priya Sharma',
        age: 35,
        gender: 'Female',
        labName: 'SRL Diagnostics, Indore',
        reportDate: '2026-02-22',
        testType: 'Thyroid Profile + CBC + Vitamins',
        condition: 'Hypothyroidism + Mild Anemia + Vitamin Deficiency',
        conditionTag: '🟣 Thyroid',
        urgency: 'medium',
        overallStatus: 'Thyroid Slow Hai — Dawai Ki Zaroorat Hai',
        aiSummary: 'Priya ji, aapke thyroid tests mein important finding hai. ⚠️ Aapka TSH 12.8 hai jo normal (0.4-4.0) se bahut zyada hai — iska matlab hai ki aapki thyroid gland slow kaam kar rahi hai (hypothyroidism). T4 bhi kam hai. Yahi wajah hai ki aapko thakan, weight badhna, ya thand zyada lagti hogi. Saath mein thodi khoon ki kami (anemia) aur Vitamin D ki bhi kami hai. Hypothyroidism ka ilaaj asan hai — ek chhoti si daily tablet (Thyroxine) se sab theek ho jaata hai.',
        values: [
            { name: 'TSH', value: '12.8', unit: 'mIU/L', normalRange: '0.4–4.0', status: 'critical', severity: 'high', explanation: 'Bahut high — thyroid gland slow kaam kar rahi hai (hypothyroid).' },
            { name: 'Free T4', value: '0.6', unit: 'ng/dL', normalRange: '0.8–1.8', status: 'low', severity: 'high', explanation: 'Thyroid hormone kam ban raha hai — hypothyroidism confirm.' },
            { name: 'Free T3', value: '1.8', unit: 'pg/mL', normalRange: '2.3–4.2', status: 'low', severity: 'medium', explanation: 'Active thyroid hormone bhi kam hai.' },
            { name: 'Anti-TPO Antibodies', value: '285', unit: 'IU/mL', normalRange: '<34', status: 'high', severity: 'high', explanation: 'Bahut high — Hashimoto thyroiditis hai (autoimmune).' },
            { name: 'Hemoglobin (Hb)', value: '10.2', unit: 'g/dL', normalRange: '12.0–15.5', status: 'low', severity: 'medium', explanation: 'Thodi khoon ki kami hai — hypothyroidism se hoti hai.' },
            { name: 'RBC Count', value: '3.6', unit: 'million/μL', normalRange: '3.8–4.8', status: 'low', severity: 'low' },
            { name: 'MCV', value: '88', unit: 'fL', normalRange: '80–100', status: 'normal', severity: 'none' },
            { name: 'WBC Count', value: '5,800', unit: '/μL', normalRange: '4,000–11,000', status: 'normal', severity: 'none' },
            { name: 'Platelet Count', value: '2.8', unit: 'lakh/μL', normalRange: '1.5–4.5', status: 'normal', severity: 'none' },
            { name: 'ESR', value: '32', unit: 'mm/hr', normalRange: '0–20', status: 'high', severity: 'low', explanation: 'Thoda inflammation hai — thyroid autoimmunity se ho sakta hai.' },
            { name: 'Vitamin D3', value: '14', unit: 'ng/mL', normalRange: '30–100', status: 'low', severity: 'medium', explanation: 'Vitamin D ki kami — hypothyroidism ke saath aam hai.' },
            { name: 'Vitamin B12', value: '190', unit: 'pg/mL', normalRange: '200–900', status: 'low', severity: 'low', explanation: 'Borderline low — supplement lena chahiye.' },
            { name: 'Calcium', value: '8.4', unit: 'mg/dL', normalRange: '8.5–10.5', status: 'low', severity: 'low', explanation: 'Thoda kam — Vitamin D ki kami se related.' },
            { name: 'Fasting Blood Sugar', value: '94', unit: 'mg/dL', normalRange: '70–100', status: 'normal', severity: 'none' },
            { name: 'Total Cholesterol', value: '225', unit: 'mg/dL', normalRange: '<200', status: 'high', severity: 'low', explanation: 'Hypothyroidism se cholesterol badhta hai — thyroid control hone pe theek hoga.' },
            { name: 'LDL Cholesterol', value: '142', unit: 'mg/dL', normalRange: '<130', status: 'high', severity: 'low' },
        ],
        recommendations: [
            '⚠️ Doctor se milein — Hypothyroidism confirmed hai, dawai shuru karni padegi.',
            'Levothyroxine (Thyronorm/Eltroxin) — doctor dose decide karenge (usually 50-75 mcg se shuru).',
            'Thyroid ki dawai subah khali pet lein — khana 30 minute baad khayein.',
            'Calcium ki dawai thyroid dawai ke 4 ghante baad lein (saath mein mat lein).',
            'Vitamin D3 supplement lein — 60,000 IU weekly (8-12 weeks).',
            'Vitamin B12 supplement bhi lein — methylcobalamin 1500 mcg daily.',
            'Iron-rich khana khayein — palak, chana, gur, dates.',
            '6-8 hafte baad TSH repeat karwayein — dose adjust karna padega.',
            'Soyabean aur goitrogens (patta gobhi) thyroid dawai ke saath kam khayein.',
        ],
        doctorNote: '🟣 DR VERIFICATION: Overt hypothyroidism (TSH 12.8, FT4 0.6, FT3 1.8) with positive Anti-TPO (285) confirming Hashimoto thyroiditis. Secondary mild normocytic anemia (Hb 10.2). Concurrent Vitamin D deficiency (14) and borderline B12 (190). Mild hypercalcemia correctable with Vit D. Elevated cholesterol likely secondary to hypothyroidism. Start Levothyroxine 50-75 mcg, recheck TSH at 6-8 weeks. Supplement Vit D3, B12, and iron.',
    },
];

export function getReportById(id: string): SampleReport | undefined {
    return sampleReports.find(r => r.id === id);
}
