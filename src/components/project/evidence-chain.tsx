import React from "react";
import { Link2, Calculator, CheckSquare, Hexagon } from "lucide-react";

export function EvidenceChain() {
  return (
    <div className="border border-border bg-surface p-6 font-mono text-sm shadow-xl">
      <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
        <Link2 className="text-primary h-5 w-5" />
        <h2 className="text-lg font-bold text-text-primary tracking-widest uppercase">Evidence Chain</h2>
      </div>

      <div className="relative border-l-2 border-border ml-3 space-y-8 pb-4">
        
        <EvidenceNode 
          icon={CheckSquare}
          title="Decision Log #12"
          description="Selected 2HP motor over 1HP to ensure sufficient torque under max load."
          date="Oct 12"
          type="decision"
        />
        
        <EvidenceNode 
          icon={Calculator}
          title="Calculation Sheet"
          description="Torque = (P × 60) / (2 × π × N). Requires 14.9 Nm."
          date="Oct 14"
          type="math"
        />
        
        <EvidenceNode 
          icon={Hexagon}
          title="CAD Assembly v3"
          description="Motor mount thickened by 5mm to handle calculated torque."
          date="Oct 18"
          type="design"
          link="View Model"
        />
        
      </div>
    </div>
  );
}

function EvidenceNode({ icon: Icon, title, description, date, link }: { icon: React.ElementType, title: string, description: string, date: string, type?: string, link?: string }) {
  return (
    <div className="relative pl-6">
      <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-none border border-border bg-bg flex items-center justify-center shadow-md">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="font-bold text-text-primary">{title}</span>
          <span className="text-[10px] text-text-muted">{date}</span>
        </div>
        <p className="text-xs text-text-muted mb-2">{description}</p>
        {link && (
          <a href="#" className="inline-flex items-center text-[10px] text-primary uppercase hover:underline">
            {link} <Link2 className="ml-1 h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
