import React from "react";
<<<<<<< HEAD
import { Upload, FilePlus2, Search, FolderKanban } from "lucide-react";
import { FileViewer } from "@/components/files/file-viewer";

export default async function ProjectFilesPage() {
=======
import { Upload, FilePlus2, Search, Filter, FolderKanban } from "lucide-react";
import { FileViewer } from "@/components/files/file-viewer";

export default async function ProjectFilesPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
>>>>>>> dfb45177077b186131dffe1e49d84d8e443f6418

  // Mocked files for Track C UI
  const files = [
    { id: "1", name: "architecture-diagram.png", type: "image/png", size: "2.4 MB", uploadedBy: "Test Audit", date: "2 hours ago", url: "https://placehold.co/800x600/png" },
    { id: "2", name: "API_Spec_v2.pdf", type: "application/pdf", size: "4.1 MB", uploadedBy: "System", date: "1 day ago", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "3", name: "auth-flow.ts", type: "text/typescript", size: "12 KB", uploadedBy: "Test Audit", date: "3 days ago", url: "#" },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border bg-surface p-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary">Project Files</h1>
          <p className="text-sm text-text-muted mt-1">Manage and view engineering assets, specs, and diagrams.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-md bg-surface border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors">
            <FilePlus2 className="h-4 w-4" />
            New Folder
          </button>
          <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-sm">
            <Upload className="h-4 w-4" />
            Upload File
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar / File List */}
        <div className="w-1/3 border-r border-border bg-surface/50 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search files..."
                className="w-full bg-surface border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {files.map((file) => (
              <div 
                key={file.id} 
                className="flex items-center justify-between p-3 rounded-md border border-transparent hover:border-border hover:bg-surface cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{file.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">{file.size} • {file.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Viewer Area */}
        <div className="flex-1 bg-background p-6 overflow-y-auto flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-heading font-semibold text-text-primary">Preview: architecture-diagram.png</h2>
            <p className="text-sm text-text-muted">Uploaded by Test Audit</p>
          </div>
          <div className="flex-1 rounded-lg border border-border bg-surface overflow-hidden">
             <FileViewer 
                name={files[0].name} 
                url={files[0].url} 
                fileType={files[0].type} 
              />
          </div>
        </div>
      </div>
    </div>
  );
}
