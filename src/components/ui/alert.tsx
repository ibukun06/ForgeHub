import { type ReactNode } from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export type AlertVariant = "error" | "success" | "warning" | "info";

type AlertProps = {
  variant: AlertVariant;
  children: ReactNode;
  className?: string;
};

const styles: Record<AlertVariant, string> = {
  error: "bg-error-bg border-error-border text-error",
  success: "bg-success-bg border-success-border text-success",
  warning: "bg-warning-bg border-warning-border text-warning",
  info: "bg-primary-soft border-primary/20 text-primary",
};

const icons: Record<AlertVariant, typeof AlertCircle> = {
  error: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
};

export function Alert({ variant, children, className = "" }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div className={`flex items-start gap-3 rounded-md border px-4 py-3 text-sm font-medium ${styles[variant]} ${className}`} role="alert">
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
