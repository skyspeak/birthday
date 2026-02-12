import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🧜‍♀️</div>
        <h1 className="font-serif text-4xl text-charcoal mb-4">
          Lost at Sea!
        </h1>
        <p className="text-charcoal/60 mb-8 leading-relaxed">
          This invitation link doesn&apos;t seem to exist. If you received an
          invite, please check the link and try again.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-lavender to-seafoam text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          Visit the Party Page
        </Link>
      </div>
    </main>
  );
}
