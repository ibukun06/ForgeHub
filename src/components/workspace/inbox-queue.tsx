"use client";

import React, { startTransition, useOptimistic } from "react";
import { SwipeableInboxItem, type InboxItemData } from "./swipeable-inbox-item";
import { EmptyState } from "@/components/ui/empty-state";
import { clearNotification } from "@/lib/actions/work";

export function InboxQueue({ initialItems }: { initialItems: Omit<InboxItemData, "isFirst">[] }) {
  // We only show items that are NOT cleared.
  const activeItems = initialItems.filter(item => item.state !== "Read").map((item, i) => ({
    ...item,
    isFirst: i === 0
  }));

  const [optimisticItems, removeOptimisticItem] = useOptimistic(
    activeItems,
    (state: InboxItemData[], idToRemove: string) => {
      const next = state.filter((item) => item.id !== idToRemove);
      if (next.length > 0) {
        next[0].isFirst = true; // Elevate the next item
      }
      return next;
    }
  );

  const handleClear = async (id: string) => {
    startTransition(() => {
      removeOptimisticItem(id);
    });
    // Fire the server action in the background
    await clearNotification(id);
  };

  if (optimisticItems.length === 0) {
    return <EmptyState title="Inbox is clear" description="No approvals, mentions, or updates need attention right now." />;
  }

  return (
    <div className="space-y-3">
      {optimisticItems.map((item) => (
        <SwipeableInboxItem key={item.id} item={item} onClear={handleClear} />
      ))}
    </div>
  );
}
