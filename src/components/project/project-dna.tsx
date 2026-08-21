import React from "react";
import { Database, Fingerprint, Layers, Zap, Activity } from "lucide-react";

export function ProjectDNA() {
  return (
    <div className="border border-border bg-surface p-6 font-mono text-sm shadow-xl">
      <div className="flex justify-between items-start mb-8 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Fingerprint className="text-primary h-5 w-5" />
            <h2 className="text-lg font-bold text-text-primary tracking-widest uppercase">Project DNA</h2>
          </div>
          <p className="text-xs text-text-muted">Technical Identity & Specs</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-text-muted uppercase">Hash</div>
          <div className="text-xs text-primary font-bold">#FH-892A-4B</div>
        </div>
      </div>

      <div className="space-y-6">
        <DnaSection icon={Database} title="Domain" value="Mechanical / Agricultural Engineering" />
        
        <DnaSection icon={Activity} title="Problem Statement" value="Manual maize shelling is inefficient, causing high post-harvest losses and severe fatigue for rural farmers." />
        
        <div className="grid grid-cols-2 gap-4">
          <DnaSection icon={Layers} title="Input Material" value="Dried Maize Cobs (10-15% moisture)" />
          <DnaSection icon={Zap} title="Output Requirement" value="Shelled kernels (< 2% grain damage)" />
        </div>
        
        <div className="pt-4 border-t border-border">
          <h3 className="text-[10px] uppercase tracking-widest text-text-muted mb-3">Core Parameters</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <Parameter label="Throughput" value="~500 kg/hr" />
            <Parameter label="Power Source" value="2HP Electric Motor" />
            <Parameter label="Mechanism" value="Spiked Drum & Concave" />
            <Parameter label="Material" value="Mild Steel (Frame)" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DnaSection({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted mb-1">
        <Icon className="h-3 w-3" /> {title}
      </div>
      <div className="text-text-primary leading-tight font-medium">
        {value}
      </div>
    </div>
  );
}

function Parameter({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-border/50 py-1">
      <span className="text-text-muted text-xs">{label}</span>
      <span className="text-text-primary font-bold text-xs text-right">{value}</span>
    </div>
  );
}
