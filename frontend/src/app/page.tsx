export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-heading text-5xl font-extrabold text-deep-blue">
        myAdmin
      </h1>
      <p className="mt-4 max-w-xl text-center text-lg text-gray-600">
        Manage your rentals. Optimize your pricing. Handle your taxes. All in
        one platform.
      </p>
      <div className="mt-8 flex gap-4">
        <span className="rounded-lg bg-brand-blue px-5 py-2.5 font-semibold text-white">
          Brand Blue
        </span>
        <span className="rounded-lg bg-brand-teal px-5 py-2.5 font-semibold text-white">
          Brand Teal
        </span>
        <span className="rounded-lg bg-deep-blue px-5 py-2.5 font-semibold text-white">
          Deep Blue
        </span>
      </div>
    </main>
  );
}
