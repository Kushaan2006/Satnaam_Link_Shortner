import LogoutButton from "../components/LogoutButton";

import LinkShortner from "../components/LinkShortner";

export default function Home() {
  return (
    <>
      <main className="min-h-[calc(100svh-5rem)] bg-base-200 px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-2xl">
          {/* PAGE INTRO */}
          <div className="text-center">
            <h1 className="m-0! text-4xl! leading-[1.12] font-bold! tracking-tight text-base-content! sm:text-5xl!">Shorten your links</h1>

            <p className="mt-5 max-w-lg mx-auto text-base leading-relaxed text-base-content/75 sm:text-lg">
              Create short links and track their performance.
            </p>
          </div>

          {/* MAIN SHORTENER CARD */}
          <div className="card mt-9 border border-base-300 bg-base-100 shadow-xl shadow-neutral/5 sm:mt-12 rounded-3xl">
            <div className="card-body gap-0 p-6 sm:p-9">
              <LinkShortner />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
