"use client";

import React, { useState } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { Check } from "lucide-react";

export type InboxItemData = {
  id: string;
  title: string;
  source: string;
  state: string;
  isFirst: boolean;
};

export function SwipeableInboxItem({ item, onClear }: { item: InboxItemData; onClear: (id: string) => void }) {
  const [isCleared, setIsCleared] = useState(false);
  const controls = useAnimation();

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged right more than 100px, clear it
    if (info.offset.x > 100) {
      setIsCleared(true);
      await controls.start({ x: "100%", opacity: 0, transition: { duration: 0.2 } });
      onClear(item.id);
    } else {
      // Snap back
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
    }
  };

  if (isCleared) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-bg">
      {/* Background layer (revealed on swipe right) */}
      <div className="absolute inset-0 flex items-center bg-success/20 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-bg">
          <Check className="h-5 w-5" strokeWidth={3} />
        </div>
        <span className="ml-3 font-semibold text-success">Mark as Read</span>
      </div>

      {/* Foreground swipable layer */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.5 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ cursor: "grabbing" }}
        className={`relative cursor-grab bg-bg p-4 transition-colors hover:bg-surface-elevated active:cursor-grabbing ${
          item.isFirst ? "border border-primary/30 bg-primary-soft shadow-lg" : ""
        }`}
      >
        <p className={`eyebrow ${item.isFirst ? "text-primary" : "text-text-muted"}`}>{item.state}</p>
        <p className="mt-2 font-medium text-text-primary">{item.title}</p>
        <p className="mt-1 text-sm text-text-muted">{item.source}</p>
      </motion.div>
    </div>
  );
}
