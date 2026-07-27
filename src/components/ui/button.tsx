import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive";
  loading?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary hover:bg-primary-hover active:bg-primary-active text-white",
  secondary:
    "bg-transparent border border-border text-text-primary hover:bg-surface",
  destructive: "bg-error/10 border border-error/20 text-error hover:bg-error/20",
};

/** For styling a non-button element (e.g. a Next.js `<Link>`) as a button. */
export function buttonVariants(variant: NonNullable<ButtonProps["variant"]> = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

/**
 * Per Part 2 (Design System) §5. Always shows a loading state rather than
 * letting a click feel unresponsive — Doc 3's cross-cutting rule that
 * loading is always visible and specific applies to buttons too.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", loading, disabled, className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  )
);
Button.displayName = "Button";
