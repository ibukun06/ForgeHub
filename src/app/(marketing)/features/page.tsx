import { Hammer, FolderGit2, Users, Briefcase, Search, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore the core capabilities of ForgeHub: Projects, Files, Collaboration, Workspaces, Discovery, and Communication.",
};

const FEATURES = [
  {
    icon: Hammer,
    title: "Projects",
    description: "Create and manage engineering projects. Document your build process, track milestones, and showcase your final results.",
  },
  {
    icon: FolderGit2,
    title: "Engineering Files",
    description: "Store, organize, version and collaborate around engineering files. From CAD models to code to documentation.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Work with engineers, students, teams and organizations seamlessly within a unified environment.",
  },
  {
    icon: Briefcase,
    title: "Workspaces",
    description: "Create dedicated environments for teams, labs, companies and communities to organize multiple projects and members.",
  },
  {
    icon: Search,
    title: "Discovery",
    description: "Explore public engineering projects and discover talented engineers. Find inspiration or your next collaborator.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description: "Discuss projects, review files, and communicate with collaborators through contextual threads and reviews.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-24 sm:py-32 bg-bg text-text-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary tracking-[0.2em] uppercase">Product Capabilities</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            Everything you need to build and document engineering projects
          </p>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            ForgeHub brings the engineering workflow together. Replace the fragmented mess of Drive, GitHub, Notion, and Slack with one connected workspace.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="relative pl-16 border border-border p-6 bg-surface hover:border-primary/50 transition-colors">
                <dt className="text-base font-semibold leading-7 text-text-primary">
                  <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-text-muted">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
