import React from 'react';
import { FileText, Download, Code } from 'lucide-react';

interface FileViewerProps {
  name: string;
  url: string;
  fileType: string;
}

export function FileViewer({ name, url, fileType }: FileViewerProps) {
  const isImage = fileType.startsWith('image/');
  const isPdf = fileType === 'application/pdf';
  const isText = fileType.startsWith('text/') || fileType === 'application/json';

  if (isImage) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-surface border border-border h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={name} className="max-w-full max-h-[70vh] object-contain border border-border shadow-sm" />
      </div>
    );
  }

  if (isPdf) {
    return (
      <div className="w-full h-[80vh] border border-border">
        <iframe src={url} className="w-full h-full" title={name} />
      </div>
    );
  }

  if (isText) {
    // Note: To properly render text, we'd need to fetch the content or pass it in. 
    // For now, we'll provide a direct link to view it.
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-surface border border-border text-center">
        <Code className="h-12 w-12 text-text-muted mb-4" />
        <h3 className="text-lg font-bold font-heading text-text-primary mb-2">{name}</h3>
        <p className="text-sm text-text-muted mb-6">Text and code files can be viewed directly in the browser.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-wide transition-colors"
        >
          Open File
        </a>
      </div>
    );
  }

  // Fallback for unknown file types
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-surface border border-border text-center">
      <FileText className="h-12 w-12 text-text-muted mb-4" />
      <h3 className="text-lg font-bold font-heading text-text-primary mb-2">{name}</h3>
      <p className="text-sm text-text-muted mb-6">Preview is not available for this file type ({fileType}).</p>
      <a
        href={url}
        download={name}
        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-wide transition-colors"
      >
        <Download className="h-4 w-4" /> Download File
      </a>
    </div>
  );
}
