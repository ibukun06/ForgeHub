import { Bot, FileText, Users, ScrollText, Folder, Globe } from "lucide-react";

const FEATURES = [
  { icon: FileText, title: "Guided documentation", description: "Start with prompts for the problem, requirements, design, testing, and the decisions that connect them." },
  { icon: Bot, title: "AI-assisted drafting", description: "Turn your own notes into a useful first draft. Every AI output stays visibly draft until a human accepts it." },
  { icon: Users, title: "Roles that make sense", description: "Give contributors editing access and advisors review access without turning permissions into guesswork." },
  { icon: ScrollText, title: "A living decisions log", description: "Capture what the team chose, what it considered, and why the choice made sense at the time." },
  { icon: Folder, title: "Evidence beside the record", description: "Attach sketches, research, images, and supporting files where the team will actually find them." },
  { icon: Globe, title: "A considered public snapshot", description: "Publish the sections you choose when the work is ready. Private project content never becomes public by accident." },
];

export function FeatureGrid() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-secondary">The core loop</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Make the record while the work is still fresh.</h2>
          <p className="mt-4 leading-relaxed text-text-muted">ForgeHub is opinionated about what a technical project should leave behind, without pretending every team builds the same way.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="bg-surface p-6 transition-colors hover:bg-input-bg">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-secondary" aria-hidden />
                <span className="font-mono text-xs text-text-muted">0{index + 1}</span>
              </div>
              <h3 className="mt-8 font-heading text-lg font-semibold text-text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
