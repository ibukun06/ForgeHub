import { type ReactNode, useId } from "react";

export type FieldRenderProps = {
  id: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

type FieldProps = {
  label: string;
  children: (props: FieldRenderProps) => ReactNode;
  errors?: string[];
  hint?: string;
  required?: boolean;
};

/**
 * Renders a label, the input (via render prop), and any hints or errors.
 */
export function Field({ label, children, errors, hint, required }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasError = errors && errors.length > 0;

  const describedBy = [
    hasError ? errorId : undefined,
    hint && !hasError ? hintId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error" aria-hidden="true"> *</span>}
      </label>
      
      {children({
        id,
        "aria-invalid": hasError ? true : undefined,
        "aria-describedby": describedBy || undefined,
      })}
      
      {hint && !hasError && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      
      {hasError && (
        <div id={errorId}>
          {errors.map((err) => (
            <p key={err} className="text-xs text-error font-medium mt-1">
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
