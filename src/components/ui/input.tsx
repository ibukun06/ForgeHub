import { type InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-md border border-border bg-input-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:outline-error disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";
