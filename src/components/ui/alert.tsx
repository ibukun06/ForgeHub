import { type ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type AlertProps = {
  variant: "error" | "success";
  children: ReactNode;
};

const styles = {
  error: "bg-error-bg border-error-border text-error",
  success: "bg-success-bg border-success-border text-success",
};

const icons = {
  error: AlertCircle,
  success: CheckCircle2,
};

export function Alert({ variant, children }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${styles[variant]}`}>
      <Icon className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
