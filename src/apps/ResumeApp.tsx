import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ✅ Proper Vite worker setup (NO CDN, NO CORS)
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const ResumeApp = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);

  // Place resume.pdf inside public folder
  const resumeUrl = "/resume.pdf";

  function onDocumentLoadSuccess({
    numPages,
  }: {
    numPages: number;
  }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber((prev) =>
      Math.min(Math.max(1, prev + offset), numPages || 1)
    );
  };

  const zoomIn = () =>
    setScale((prev) => Math.min(prev + 0.2, 3));

  const zoomOut = () =>
    setScale((prev) => Math.max(prev - 0.2, 0.5));

  const rotate = () =>
    setRotation((prev) => (prev + 90) % 360);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Arjun-Mehta-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col bg-[var(--window-bg)]">
      {/* Header */}
      <div className="border-b-2 border-[var(--border)] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-[var(--accent)]" />
            <h2 className="text-lg font-bold">Resume</h2>
          </div>

          <button
            onClick={downloadResume}
            className="px-3 py-1 text-xs bg-[var(--accent)] text-white rounded hover:opacity-90 transition flex items-center gap-1"
          >
            <Download size={12} />
            Download
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="border-b border-[var(--border)] p-3 flex items-center justify-between bg-[var(--bg)]/50">
        {/* Zoom + Rotate */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-1 rounded hover:bg-[var(--accent)]/20 disabled:opacity-50"
          >
            <ZoomOut size={16} />
          </button>

          <span className="text-xs font-mono px-2">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 3}
            className="p-1 rounded hover:bg-[var(--accent)]/20 disabled:opacity-50"
          >
            <ZoomIn size={16} />
          </button>

          <button
            onClick={rotate}
            className="p-1 rounded hover:bg-[var(--accent)]/20 ml-2"
          >
            <RotateCw size={16} />
          </button>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="p-1 rounded hover:bg-[var(--accent)]/20 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-xs font-mono px-2">
            {pageNumber} / {numPages || "--"}
          </span>

          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 1)}
            className="p-1 rounded hover:bg-[var(--accent)]/20 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="shadow-2xl">
          <Document
            file={resumeUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]" />
              </div>
            }
            error={
              <div className="text-center p-8 border rounded">
                <FileText size={48} className="mx-auto mb-4 text-[var(--accent)]" />
                <p className="text-sm">Resume PDF not found</p>
                <p className="text-xs opacity-60">
                  Add resume.pdf to your public folder
                </p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-lg"
            />
          </Document>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border)] p-2 text-center">
        <p className="text-xs opacity-70">
          Click Download to save resume • Use controls to navigate and zoom
        </p>
      </div>
    </div>
  );
};

export default ResumeApp;