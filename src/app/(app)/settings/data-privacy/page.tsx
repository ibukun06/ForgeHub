"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, PowerOff, Download } from "lucide-react";

export default function DataPrivacySettingsPage() {
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleDeactivate = async () => {
    alert("Account deactivation requested. (Stub: Waiting on backend RPC)");
    setShowDeactivate(false);
  };

  const handleDelete = async () => {
    alert("Account deletion requested. (Stub: Waiting on backend RPC)");
    setShowDelete(false);
  };

  const handleExport = async () => {
    setExporting(true);
    setTimeout(() => {
      alert("Data export ready. (Stub: Would trigger download here)");
      setExporting(false);
    }, 2000);
  };

  return (
    <div>
      <div className="border-b border-border pb-5 mb-6">
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Data & Privacy</h2>
        <p className="text-sm text-text-muted">Manage your data exports and account lifecycle.</p>
      </div>

      <div className="space-y-8 max-w-3xl">
        
        {/* Export Data */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Export Data</h3>
          
          <div className="p-5 rounded-xl border border-border bg-surface-muted flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-text-primary flex items-center gap-2">
                Download your information
              </h3>
              <p className="text-sm text-text-muted mt-1 max-w-xl">
                Get a copy of your ForgeHub data including profile, project metadata, comments, and settings. Large files (like CAD or documents) may be excluded from the basic export.
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="shrink-0 px-4 py-2 bg-surface-elevated border border-border text-text-primary hover:bg-surface-elevated/80 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {exporting ? "Preparing..." : "Export Data"}
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-5 pt-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-error border-b border-error/20 pb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Danger Zone
          </h3>
          
          <div className="space-y-4">
            {/* Deactivate Account */}
            <div className="p-5 rounded-xl border border-error/20 bg-error/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-medium text-text-primary">
                  Deactivate Account
                </h3>
                <p className="text-sm text-text-muted mt-1 max-w-xl">
                  Temporarily hide your profile, projects, and comments. You can reactivate your account at any time by logging back in.
                </p>
              </div>
              <button
                onClick={() => setShowDeactivate(true)}
                className="shrink-0 px-4 py-2 bg-surface border border-error/30 text-error hover:bg-error hover:text-white text-sm font-medium rounded-lg transition-colors"
              >
                Deactivate Account
              </button>
            </div>

            {/* Delete Account */}
            <div className="p-5 rounded-xl border border-error/30 bg-error/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-medium text-text-primary">
                  Delete Account
                </h3>
                <p className="text-sm text-text-muted mt-1 max-w-xl">
                  Permanently remove your account, projects, and all associated data. This action is irreversible and cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setShowDelete(true)}
                className="shrink-0 px-4 py-2 bg-error text-white hover:bg-error/90 text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Delete Account
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Confirmation Modals */}
      {showDeactivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
              <PowerOff className="h-5 w-5 text-error" />
              Deactivate Account
            </h3>
            <p className="text-sm text-text-muted mb-6">
              Are you sure you want to deactivate your account? Your profile and public projects will be hidden.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeactivate(false)} className="px-4 py-2 text-sm text-text-muted hover:text-text-primary">
                Cancel
              </button>
              <button onClick={handleDeactivate} className="px-4 py-2 bg-error text-white rounded-lg text-sm font-medium">
                Yes, Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-error mb-2 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete Account
            </h3>
            <p className="text-sm text-text-muted mb-4">
              This will permanently delete your account and all associated data. You cannot undo this action.
            </p>
            <div className="bg-error/10 border border-error/20 p-3 rounded-lg mb-6 text-sm text-error font-mono">
              Please type &quot;DELETE&quot; to confirm. (Stubbed)
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDelete(false)} className="px-4 py-2 text-sm text-text-muted hover:text-text-primary">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-error text-white rounded-lg text-sm font-medium">
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
