"use client";

import { use, useState } from "react";
import { AlertTriangle, Trash2, Archive } from "lucide-react";

export default function ProjectDangerZonePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { projectSlug } = use(params);
  const decodedProjectSlug = decodeURIComponent(projectSlug);
  
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h2 className="font-heading text-2xl text-error flex items-center gap-2">
          <AlertTriangle className="h-6 w-6" />
          Danger Zone
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Irreversible actions for the {decodedProjectSlug} project.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div className="p-5 rounded-xl border border-warning/30 bg-warning/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-text-primary">
              Archive Project
            </h3>
            <p className="text-sm text-text-muted mt-1 max-w-xl">
              Mark this project as read-only. It will be hidden from active lists but data is preserved.
            </p>
          </div>
          <button
            onClick={() => alert("Archive project stub")}
            className="shrink-0 px-4 py-2 bg-surface border border-warning/50 text-warning hover:bg-warning/10 text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            Archive Project
          </button>
        </div>

        <div className="p-5 rounded-xl border border-error/30 bg-error/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-text-primary">
              Delete Project
            </h3>
            <p className="text-sm text-text-muted mt-1 max-w-xl">
              Permanently delete this project and all associated files, discussions, and data. This action cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setShowDelete(true)}
            className="shrink-0 px-4 py-2 bg-error text-white hover:bg-error/90 text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            Delete Project
          </button>
        </div>
      </div>

      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-error mb-2 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete Project
            </h3>
            <p className="text-sm text-text-muted mb-4">
              This will permanently delete the <strong>{decodedProjectSlug}</strong> project and all of its data. You cannot undo this action.
            </p>
            <div className="bg-error/10 border border-error/20 p-3 rounded-lg mb-6 text-sm text-error font-mono">
              Please type &quot;{decodedProjectSlug}&quot; to confirm. (Stubbed)
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDelete(false)} className="px-4 py-2 text-sm text-text-muted hover:text-text-primary">
                Cancel
              </button>
              <button onClick={() => alert("Project deletion stub")} className="px-4 py-2 bg-error text-white rounded-lg text-sm font-medium">
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
