"use client";
import { useState } from "react";
import ResumeTimeline from "@/components/resume/ResumeTimeline";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import PdfService from "@/services/PdfService";
import { FileDownIcon, LoaderCircleIcon } from "lucide-react";

const RESUME_PDF_FILE_NAME = "Lukas_A_Sorensen_Resume.pdf";

export default function Resume() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  async function handleDownloadResume() {
    if (isGeneratingPdf) {
      return;
    }

    setIsGeneratingPdf(true);

    try {
      const pdfService = new PdfService();
      const pdfBlob = await pdfService.generateResumePdf();
      const downloadUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = RESUME_PDF_FILE_NAME;
      link.click();

      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-around ${tw.BG_PRIMARY} px-8 py-8 md:px-24`}>
      <div className="flex max-w-screen-lg flex-col items-center">
        <div className="flex flex-col items-center gap-5">
          <h1 className={`mt-6 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}>My Resume</h1>
          <button
            type="button"
            onClick={handleDownloadResume}
            disabled={isGeneratingPdf}
            className={`mb-2 mt-2 rounded-md bg-cyan-600 px-4 py-2 text-xs font-semibold dark:bg-violet-600 ${tw.TEXT_PRIMARY} hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {isGeneratingPdf ? (
              <span className="flex items-center gap-2">
                <LoaderCircleIcon className="animate-spin" />
                {"Generating PDF..."}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FileDownIcon />
                {"Download Resume"}
              </span>
            )}
          </button>
          <div className="max-w-screen-md text-left">
            <p className="mt-2">
              Lukas Sorensen is a Lead Engineer / Systems Architect with 10+ years of experience delivering production
              software with deep strengths in AI systems and full-stack engineering.
            </p>
          </div>
          <ResumeTimeline />
        </div>
      </div>
    </main>
  );
}
