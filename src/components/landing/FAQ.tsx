const FAQS = [
  {
    question: "Is ForgeHub free?",
    answer: "Yes — free for individuals, no card required.",
  },
  {
    question: "Do I need a team to use it?",
    answer: "No. Solo builders, research pairs, and full project teams all work the same way.",
  },
  {
    question: "What if my project isn't finished?",
    answer:
      "Most aren't. ForgeHub is built around projects in progress, not just finished ones — publish whenever, or never.",
  },
  {
    question: "Can my advisor or mentor join?",
    answer: "Yes — invite them with the Advisor role. They can comment and review without editing your work.",
  },
  {
    question: "Is my project private by default?",
    answer: "Yes. Nothing is visible outside your team until you explicitly publish it, section by section.",
  },
  {
    question: "What kinds of projects work on ForgeHub?",
    answer: "Hardware, software, and research projects — anything with a real build and documentation process.",
  },
];

export function FAQ() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-text-primary sm:text-3xl">Questions</h2>
        <div className="mt-10 divide-y divide-border">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-base font-medium text-text-primary">
                {faq.question}
                <span className="ml-4 text-text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
