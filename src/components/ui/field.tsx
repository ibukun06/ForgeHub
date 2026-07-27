import { type ReactNode, useId } from "react";

type FieldProps = {
  label: string;
  children: (id: string) => ReactNode;
  errors?: string[];
  hint?: string;
  required?: boolean;
};

/**
 * Errors render directly below the field, in red, specific — never a
 * generic "invalid input" (App Flow §2's stated pattern for /login,
 * generalized to every form in the app).
 */
export function Field({ label, children, errors, hint, required }: FieldProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      {children(id)}
      {hint && !errors?.length && <p className="text-xs text-text-muted">{hint}</p>}
      {errors?.map((err) => (
        <p key={err} className="text-xs text-error">
          {err}
        </p>
      ))}
    </div>
  );
}
