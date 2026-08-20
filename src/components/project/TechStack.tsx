export function TechStack({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-border bg-input-bg px-3 py-1 font-mono text-xs text-text-primary"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
