import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

export function EmptyState({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  children?: ReactNode;
}) {
  return (
    <div className="surface-grid relative flex flex-col items-center justify-center p-8 text-center sm:p-12 border border-dashed border-border-strong rounded-lg bg-surface/50 shadow-sm">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-sm ring-1 ring-border">
          <Icon className="h-6 w-6 text-text-muted" aria-hidden />
        </div>
      )}
      <h3 className="font-heading text-lg font-medium text-text-primary">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-text-muted">{description}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
