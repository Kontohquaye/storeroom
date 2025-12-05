import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 sm:p-10 font-sans text-black dark:text-white">
      <section className="backdrop-blur-sm rounded-2xl shadow-lg ">
        <header className="flex items-start gap-4 mb-6">
          <div className="flex-none w-14 h-14 rounded-lg  text-white grid place-items-center text-2xl font-bold">
            <Link href={"/"}>
              <Image
                alt="Storeroom logo"
                src={"/Logo.png"}
                width={400}
                height={400}
              />
            </Link>
          </div>
          <div>
            <h1 className="text-2xl  font-extrabold">
              About <span>Storeroom</span>
            </h1>
            <p className="mt-1 text-sm dark:text-slate-400">
              Create and manage your digital storage — products, supplies, and
              everything in between.
            </p>
          </div>
        </header>

        <p className="leading-relaxed dark:text-white">
          Storeroom is a user-friendly app that helps you recreate your physical
          storage as a neat online space: create storage rooms, add products and
          suppliers, categorize items, and track quantities in real time. Built
          for homeowners, small businesses, and project teams, Storeroom removes
          the guesswork😁. You’ll always know what you have, where it is, and
          when you need to restock.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div className="p-4 rounded-lg bg-amber-50">
            <h3 className="font-semibold text-blue-950">Core features</h3>
            <ul className="mt-3 text-sm text-slate-700 space-y-2 list-disc list-inside">
              <li>Create unlimited storage rooms with locations</li>
              <li>Add products and supplies </li>
              <li>Track quantities</li>
              <li>Search, filter, your inventory</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg">
            <h3 className="font-semibold text-emerald-700">Why Storeroom?</h3>
            <p className="mt-3 text-sm text-slate-700">
              Because organization should be simple: intuitive UI, focused tools
              (no bloated features), and reliable syncing across devices.
              Storeroom saves time, reduces waste, and helps you plan purchases
              smarter.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-block bg-blue-950 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 text-center"
          >
            To Storeroom!
          </Link>
          <Link
            href="/dashboard"
            className="inline-block border border-indigo-200 dark:text-white hover:bg-blue-950 px-5 py-2 rounded-lg text-center"
          >
            Explore features
          </Link>
        </div>

        <footer className="mt-8 text-sm flex justify-center">
          <p>&copy; KT {new Date().getFullYear()}</p>
        </footer>
      </section>
    </main>
  );
};

export default About;
