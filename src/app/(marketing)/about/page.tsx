import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind ForgeHub and our mission to unite the engineering workflow.",
};

export default function AboutPage() {
  return (
    <div className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">Our Story</h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            We noticed a persistent problem in the engineering world: the workflow is entirely fragmented. Engineers are building the physical future, yet their tools are stuck in the past.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-text-muted lg:max-w-none lg:grid-cols-2">
            <div>
              <p>
                CAD files live in Google Drive. Code lives on GitHub. Project planning happens in Notion or Trello. Communication is scattered across Slack, Discord, and WhatsApp. Reviews happen in lengthy email chains.
              </p>
              <p className="mt-8">
                This fragmentation makes it incredibly difficult to understand the full context of an engineering project. Important design decisions are lost in chat histories, file versions get mixed up, and new team members spend weeks just trying to find the right documentation.
              </p>
            </div>
            <div>
              <p>
                <strong>ForgeHub brings the engineering workflow together.</strong>
              </p>
              <p className="mt-8">
                We believe that engineering projects, files, people, collaboration, and knowledge should exist in one connected workspace. Our mission is to build the definitive operating system for engineering projects, allowing makers, students, researchers, and professional teams to build better, together.
              </p>
              <p className="mt-8">
                We envision a future where engineering collaboration is seamless, where the documentation writes itself alongside the build process, and where every engineer has a unified portfolio of their true capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
