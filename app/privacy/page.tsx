import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#005081]">
            AAU Startup Center
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#005081]">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            This page explains how the AAU Startup Portal collects, uses, and
            protects information provided by students, mentors, investors, and
            administrators using the platform.
          </p>
        </div>

        <div className="space-y-8 rounded-3xl border border-[#CAD6DE] bg-slate-50 p-8 shadow-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Information We Collect
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              We may collect account details such as your username, email
              address, department, role, application responses, uploaded
              documents, and activity related to your use of the portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              How We Use Information
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              Information is used to create accounts, review applications,
              match founders with mentors and investors, manage bookings and
              events, improve the platform, and support communication related to
              startup programs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Data Protection
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              We aim to protect your data through reasonable technical and
              organizational safeguards. Access should be limited to authorized
              staff and approved platform processes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Data Sharing
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              Personal information should only be shared when necessary for
              program administration, mentoring, investment review, legal
              compliance, or system operations under appropriate controls.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Your Rights</h2>
            <p className="text-sm leading-7 text-slate-700">
              You may request correction of inaccurate information or contact
              the portal administrators if you have concerns about how your data
              is handled.
            </p>
          </section>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Questions about privacy can be directed through the portal support
          channels or the startup center administration.
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
