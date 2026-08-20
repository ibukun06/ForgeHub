/**
 * Placeholder quotes for the pre-launch site — attributed to roles, not
 * invented named people, so nothing here reads as a fabricated
 * endorsement. Swap for real ones as soon as there are real users to ask.
 */
const TESTIMONIALS = [
  {
    quote: "My advisor could finally see the whole project, not just the final report.",
    role: "Final-year Mechanical Engineering student",
  },
  {
    quote: "We stopped losing decisions in old WhatsApp threads nobody could search.",
    role: "Robotics team lead",
  },
  {
    quote: "The AI mentor is actually useful because it's read my project, not just my prompt.",
    role: "Independent hardware maker",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-text-primary sm:text-3xl">From early builders</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.role} className="rounded-lg border border-border bg-surface p-6">
              <p className="text-text-primary">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-text-muted">— {t.role}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
