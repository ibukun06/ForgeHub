"use client";

import { useState } from "react";
import { setProjectVisibility } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Globe, Lock, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

export default function VisibilitySettingsPage({
  projectId,
  initialVisibility,
  projectSlug
}: {
  projectId: string;
  initialVisibility: "private" | "published";
  projectSlug: string;
}) {
  const [visibility, setVisibility] = useState(initialVisibility);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const handleToggle = async (newVisibility: "private" | "published") => {
    setIsUpdating(true);
    const result = await setProjectVisibility(projectId, newVisibility);
    
    if (result.success) {
      setVisibility(newVisibility);
      addToast({
        title: "Visibility Updated",
        description: `Project is now ${newVisibility}.`,
        type: "success"
      });
      router.refresh();
    } else {
      addToast({
        title: "Error",
        description: result.error || "Failed to update visibility.",
        type: "error"
      });
    }
    setIsUpdating(false);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Project Visibility</h2>
        <p className="text-text-muted text-sm">
          Control who can view this project. Publishing the project generates a public vanity URL.
        </p>
      </div>

      <div className="space-y-4">
        {/* Private Option */}
        <div 
          className={`border rounded-lg p-6 flex items-start gap-4 cursor-pointer transition-colors ${
            visibility === "private" ? "border-primary bg-primary/5" : "border-border bg-surface hover:bg-surface-muted"
          }`}
          onClick={() => visibility !== "private" && handleToggle("private")}
        >
          <div className="mt-1">
            <Lock className={`h-5 w-5 ${visibility === "private" ? "text-primary" : "text-text-muted"}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">Private</h3>
            <p className="text-sm text-text-muted mt-1">
              Only workspace members can view and collaborate on this project.
            </p>
          </div>
          <div className="flex items-center h-full mt-2">
            <div className={`h-4 w-4 rounded-full border ${visibility === "private" ? "border-4 border-primary" : "border-border"}`} />
          </div>
        </div>

        {/* Published Option */}
        <div 
          className={`border rounded-lg p-6 flex items-start gap-4 cursor-pointer transition-colors ${
            visibility === "published" ? "border-primary bg-primary/5" : "border-border bg-surface hover:bg-surface-muted"
          }`}
          onClick={() => visibility !== "published" && handleToggle("published")}
        >
          <div className="mt-1">
            <Globe className={`h-5 w-5 ${visibility === "published" ? "text-primary" : "text-text-muted"}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">Published</h3>
            <p className="text-sm text-text-muted mt-1">
              Anyone with the link can view the project documentation and decisions.
            </p>
            {visibility === "published" && (
              <div className="mt-4 p-3 bg-surface border border-border rounded text-sm flex items-center justify-between">
                <span className="text-text-muted font-mono truncate mr-4">
                  {typeof window !== "undefined" ? window.location.origin : ""}/projects/{projectSlug}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/projects/${projectSlug}`, "_blank");
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" /> Open
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center h-full mt-2">
            <div className={`h-4 w-4 rounded-full border ${visibility === "published" ? "border-4 border-primary" : "border-border"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
