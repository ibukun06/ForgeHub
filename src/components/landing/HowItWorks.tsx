import { Search, FolderPlus, Hammer, Share2 } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Explore",
    description: "See what other builders are documenting — real projects, real progress, real dead ends.",
  },
  {
    icon: FolderPlus,
    title: "Create a project",
    description: "Set it up in a minute — name, type, category. ForgeHub sets up your guided document set automatically.",
  },
  {
    icon: Hammer,
    title: "Build & document",
    description: "Work through each phase as you actually build, with your AI mentor and your team alongside you.",
  },
  {
    icon: Share2,
    title: "Publish",
    description: "Turn it into a shareable case study when it's ready — opt-in, section by section.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-text-primary sm:text-3xl">How ForgeHub works</h2>
        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" aria-hidden />
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-bg">
                <step.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-text-primary">
                <span className="font-mono text-sm text-text-muted">0{i + 1} </span>
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
