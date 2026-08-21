import React from "react";
import { ArchiveX, ArrowRight, GitCommit } from "lucide-react";

export function IterationLog() {
  return (
    <div className="border border-error/40 bg-surface p-6 font-mono text-sm shadow-xl relative overflow-hidden">
      {/* Warning stripe overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,var(--color-error),var(--color-error)_10px,transparent_10px,transparent_20px)] opacity-70"></div>
      
      <div className="flex items-center justify-between mb-6 border-b border-border pb-4 mt-2">
        <div className="flex items-center gap-2">
          <ArchiveX className="text-error h-5 w-5" />
          <h2 className="text-lg font-bold text-text-primary tracking-widest uppercase">Iteration Log</h2>
        </div>
        <span className="bg-error/10 text-error border border-error/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          Failure Logged
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Attempt 01</h3>
          <div className="text-text-primary font-bold text-base bg-error/5 p-3 border border-error/20">
            Excessive Frame Vibration
          </div>
        </div>
        
        <div className="grid gap-4">
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Observation</h3>
            <p className="text-xs text-text-muted">Frame resonance occurred at 1440 RPM operating speed, causing bolt loosening.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 border border-border p-3">
              <h3 className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Root Cause</h3>
              <p className="text-xs text-text-primary">L-angle steel gauge too thin (2mm) for motor mass.</p>
            </div>
            <ArrowRight className="text-text-muted h-4 w-4" />
            <div className="flex-1 border border-primary/40 bg-primary/5 p-3">
              <h3 className="text-[10px] uppercase tracking-widest text-primary mb-1">Change (V2)</h3>
              <p className="text-xs text-text-primary">Increase frame stiffness to 5mm gauge.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
          <GitCommit className="h-4 w-4 text-text-muted" />
          <span className="text-xs text-text-muted">Iterating to Version 2.0</span>
        </div>
      </div>
    </div>
  );
}
