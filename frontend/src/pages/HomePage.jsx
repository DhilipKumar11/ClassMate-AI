import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FEATURE_SPOTLIGHTS } from "../utils/constants";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HomePage() {
  return (
    <div className="space-y-24">
      <section className="section-shell pt-10 sm:pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative overflow-hidden rounded-[36px] border border-[var(--border)] bg-hero-grid px-6 py-16 shadow-glow sm:px-10 lg:px-14 lg:py-24"
        >
          <div className="max-w-4xl">
            <p className="eyebrow">Voice-Enabled Classroom Assistant</p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl tracking-tight sm:text-6xl lg:text-8xl">
              AI teaching support built for live government school classrooms.
            </h1>
            <p className="muted mt-6 max-w-2xl text-base leading-8 sm:text-lg">
              ClassMate AI helps teachers simplify concepts, translate educational content, and keep lessons moving without breaking flow.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button as={NavLink} to="/concept">
                Launch Concept Simplifier
              </Button>
              <Button as={NavLink} to="/translation" variant="secondary">
                Open Translation Mode
              </Button>
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {FEATURE_SPOTLIGHTS.map((feature, index) => (
              <motion.div key={feature.title} custom={index + 1} variants={fadeUp} initial="hidden" animate="visible">
                <Card className="h-full rounded-[26px] bg-white/60">
                  <p className="text-sm font-semibold text-[var(--accent)]">0{index + 1}</p>
                  <h2 className="mt-4 text-xl font-semibold">{feature.title}</h2>
                  <p className="muted mt-4 leading-7">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell">
        <PageHeader
          eyebrow="Core Workflows"
          title="Two focused AI tools, one calm classroom interface."
          description="The product is intentionally narrow: one workflow to simplify difficult topics and one workflow to translate classroom dictation into student-friendly Hindi."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Card className="relative overflow-hidden">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--accent)]/16 blur-3xl" />
            <p className="eyebrow">01</p>
            <h3 className="mt-4 font-display text-3xl">Live Concept Simplification</h3>
            <p className="muted mt-4 leading-7">
              Teachers can speak a prompt like "Explain photosynthesis for Class 8 students" and get a simpler explanation, a real-life example, a diagram, and optional audio playback.
            </p>
            <Button as={NavLink} to="/concept" variant="secondary" className="mt-8">
              Try this workflow
            </Button>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-[var(--accent-soft)]/18 blur-3xl" />
            <p className="eyebrow">02</p>
            <h3 className="mt-4 font-display text-3xl">Bilingual Dictation & Translation</h3>
            <p className="muted mt-4 leading-7">
              Teachers can dictate content in English, view an accurate Hindi translation beside it, and read the Hindi output aloud for students.
            </p>
            <Button as={NavLink} to="/translation" variant="secondary" className="mt-8">
              Try this workflow
            </Button>
          </Card>
        </div>
      </section>

      <section className="section-shell">
        <Card className="grid gap-6 rounded-[36px] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Offline Resilience</p>
            <h2 className="mt-4 font-display text-4xl">The UI stays usable even when the network does not.</h2>
            <p className="muted mt-5 max-w-2xl leading-7">
              New AI requests require internet. Cached explanations and previous translations do not. The app detects network loss automatically, surfaces the state clearly, and lets teachers reopen recent results without a crash.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Auto network detection", "LocalStorage cache", "Safe offline messaging", "Cached result replay"].map((item) => (
              <div key={item} className="rounded-[24px] border border-[var(--border)] bg-white/64 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Included</p>
                <p className="mt-3 text-lg">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
