"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, PowerOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AccountSettingsPage() {
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const supabase = createClient();

  // Stub function for Deactivation
  const handleDeactivate = async () => {
    alert("Account deactivation requested. (Stub: Waiting on backend RPC)");
    setShowDeactivate(false);
  };

  // Stub function for Deletion
  const handleDelete = async () => {
    alert("Account deletion requested. (Stub: Waiting on backend RPC)");
    setShowDelete(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold font-heading text-text-primary mb-1 text-error flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        Danger Zone
      </h2>
      <p className="text-sm text-text-muted mb-6">Irreversible and destructive actions for your account.</p>

      <div className="space-y-6">
        
        {/* Deactivate Account */}
        <div className="p-5 rounded-xl border border-error/20 bg-error/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-text-primary flex items-center gap-2">
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
            <h3 className="font-medium text-text-primary flex items-center gap-2">
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

      {/* Confirmation Modals (Simple inline implementation for UX flow) */}
      
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
              Please type "DELETE" to confirm. (Stubbed)
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
