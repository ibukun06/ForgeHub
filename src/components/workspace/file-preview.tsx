"use client";

import { FileText, Box, Image as ImageIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  fileName: string;
  fileType: string;
  fileUrl: string;
}

export function FilePreview({ fileName, fileType, fileUrl }: FilePreviewProps) {
  const isImage = fileType.startsWith("image/");
  const isPdf = fileType === "application/pdf";
  const isCad = fileType.includes("cad") || fileType.includes("step") || fileType.includes("stl") || fileName.endsWith(".step") || fileName.endsWith(".stl");

  if (isImage) {
    return (
      <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-surface/50 border border-border rounded-md overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fileUrl} alt={fileName} className="max-w-full max-h-full object-contain" />
      </div>
    );
  }

  if (isPdf) {
    return (
      <div className="relative w-full h-full min-h-[500px] bg-surface/50 border border-border rounded-md overflow-hidden">
        <iframe src={`${fileUrl}#view=FitH`} className="w-full h-full border-none" title={fileName} />
      </div>
    );
  }

  if (isCad) {
    return (
      <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-surface border border-border rounded-md p-8 text-center">
        <Box className="h-16 w-16 text-secondary mb-4 opacity-80" />
        <h3 className="font-heading text-xl text-text-primary mb-2">3D Model Viewer</h3>
        <p className="text-text-muted max-w-sm mb-6">
          {fileName}
        </p>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <a href={fileUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download Model
            </a>
          </Button>
          <Button disabled title="WebGL viewer loading...">
            Initialize Viewer
          </Button>
        </div>
      </div>
    );
  }

  // Fallback for unknown/other file types
  return (
    <div className="relative w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-surface/50 border border-border rounded-md p-8 text-center">
      <FileText className="h-12 w-12 text-text-muted mb-4" />
      <p className="text-text-primary font-medium mb-1">{fileName}</p>
      <p className="text-sm text-text-muted mb-6">Preview not available for this file type.</p>
      <Button variant="outline" asChild>
        <a href={fileUrl} download>
          <Download className="mr-2 h-4 w-4" />
          Download File
        </a>
      </Button>
    </div>
  );
}
