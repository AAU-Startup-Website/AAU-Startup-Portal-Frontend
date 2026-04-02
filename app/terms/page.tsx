import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#005081]">
            AAU Startup Center
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#005081]">
            Terms of Service
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            These terms describe the expected use of the AAU Startup Portal by
            founders, mentors, investors, administrators, and other authorized
            participants.
          </p>
        </div>

        <div className="space-y-8 rounded-3xl border border-[#CAD6DE] bg-slate-50 p-8 shadow-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Acceptable Use
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              Users are expected to provide accurate information, respect other
              participants, and use the portal only for legitimate startup,
              mentorship, learning, and administration activities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Account Responsibility
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              You are responsible for maintaining the confidentiality of your
              credentials and for activity performed through your account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Submitted Content
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              By submitting applications, documents, or messages, you confirm
              that the materials are lawful, accurate, and appropriate for the
              platform's educational and incubation purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Platform Availability
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              The portal may be updated, restricted, or temporarily unavailable
              during maintenance, operational issues, or administrative changes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Enforcement</h2>
            <p className="text-sm leading-7 text-slate-700">
              The university or portal administrators may suspend access when
              misuse, security concerns, or policy violations are identified.
            </p>
          </section>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Continued use of the portal indicates agreement with these terms and
          any future operational updates published by the program.
        </p>

        <div className="mt-8">
          <Link
            href="/register"
            className="inline-flex items-center rounded-full bg-[#005081] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b6093]"
          >
            Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
