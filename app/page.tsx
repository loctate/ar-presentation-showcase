import ModelViewer from "../components/model-viewer";

const features = [
  {
    number: "01",
    title: "Adaptive Intelligence",
    description:
      "Real-time responsive behaviour designed to adapt to changing operational conditions.",
  },
  {
    number: "02",
    title: "Precision Mobility",
    description:
      "Advanced motion control enables stable, repeatable and highly controlled movement.",
  },
  {
    number: "03",
    title: "Connected Operation",
    description:
      "Built for connected environments with continuous monitoring and remote system interaction.",
  },
  {
    number: "04",
    title: "Modular Architecture",
    description:
      "A flexible platform concept designed to support different modules and future expansion.",
  },
];

const applications = [
  "Product Launch",
  "Sales Presentation",
  "Exhibition & Event",
  "Technical Training",
  "Interactive Catalogue",
  "Digital Company Profile",
];

const specs = [
  ["Platform", "NOVA X1"],
  ["System Type", "Interactive Robotics Platform"],
  ["Control", "Adaptive Smart Control"],
  ["Connectivity", "Wi-Fi / Ethernet"],
  ["Monitoring", "Real-time"],
  ["Architecture", "Modular"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090b]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="#top"
            className="text-xs font-semibold tracking-[0.28em] text-zinc-200"
          >
            NOVA INDUSTRIES
          </a>

          <nav className="hidden items-center gap-7 text-xs text-zinc-500 sm:flex">
            <a
              className="transition hover:text-white"
              href="#overview"
            >
              Overview
            </a>

            <a
              className="transition hover:text-white"
              href="#features"
            >
              Features
            </a>

            <a
              className="transition hover:text-white"
              href="#applications"
            >
              Applications
            </a>

            <a
              className="transition hover:text-white"
              href="#specifications"
            >
              Specifications
            </a>
          </nav>
        </div>
      </header>

      <div
        id="top"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-10 lg:py-20"
      >
        {/*
          MOBILE:
          "contents" membuat semua section di bawah ini menjadi
          direct grid items sehingga urutannya bisa:
          Hero -> 3D Viewer -> Overview -> Features -> ...
          
          DESKTOP:
          lg:block mengembalikan seluruh content ke kolom kiri,
          sementara ModelViewer tetap sticky di kolom kanan.
        */}
        <div className="contents lg:block">
          {/* ==================================================
              HERO
          ================================================== */}
          <section className="order-1 flex min-h-[68vh] flex-col justify-center pb-16 lg:order-none lg:min-h-[72vh] lg:pb-24">
            <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-amber-400">
              INTERACTIVE PRODUCT PRESENTATION
            </p>

            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              NOVA X1
            </h1>

            <p className="mt-5 text-lg text-zinc-400 sm:text-xl">
              Interactive Robotics Platform
            </p>

            <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 sm:mt-8 sm:text-base sm:leading-8 sm:text-zinc-500">
              A conceptual robotics platform created to demonstrate how
              interactive 3D experiences can transform product presentations,
              technical demonstrations and modern sales communication.
            </p>

            <div className="mt-9 flex flex-wrap gap-3 sm:mt-10">
              <a
                href="#overview"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Explore NOVA X1
              </a>

              <span className="rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-400">
                3D Interactive Demo
              </span>
            </div>

            <p className="mt-14 text-xs tracking-[0.2em] text-zinc-600 sm:mt-16">
              SCROLL TO EXPLORE ↓
            </p>
          </section>

          {/* ==================================================
              OVERVIEW
          ================================================== */}
          <section
            id="overview"
            className="order-3 scroll-mt-24 border-t border-white/10 py-20 lg:order-none lg:py-24"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-zinc-500">
              01 / OVERVIEW
            </p>

            <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              Technology that can be explored, not just explained.
            </h2>

            <p className="mt-7 max-w-xl leading-8 text-zinc-400 sm:text-zinc-500">
              Traditional presentations rely on static photographs, diagrams
              and slides. NOVA X1 demonstrates a different approach: the
              audience can directly rotate, zoom and interact with a digital
              representation of the product.
            </p>

            <p className="mt-5 max-w-xl leading-8 text-zinc-400 sm:text-zinc-500">
              The concept can be adapted for product launches, exhibitions,
              technical training, industrial sales and interactive company
              presentations.
            </p>
          </section>

          {/* ==================================================
              FEATURES
          ================================================== */}
          <section
            id="features"
            className="order-4 scroll-mt-24 border-t border-white/10 py-20 lg:order-none lg:py-24"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-zinc-500">
              02 / KEY FEATURES
            </p>

            <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              Designed around intelligent interaction.
            </h2>

            <div className="mt-10 sm:mt-12">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="grid gap-4 border-t border-white/10 py-7 sm:grid-cols-[60px_1fr]"
                >
                  <span className="text-sm font-medium text-amber-400">
                    {feature.number}
                  </span>

                  <div>
                    <h3 className="text-lg font-medium text-zinc-100">
                      {feature.title}
                    </h3>

                    <p className="mt-3 max-w-lg leading-7 text-zinc-400 sm:text-zinc-500">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ==================================================
              APPLICATIONS
          ================================================== */}
          <section
            id="applications"
            className="order-5 scroll-mt-24 border-t border-white/10 py-20 lg:order-none lg:py-24"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-zinc-500">
              03 / APPLICATIONS
            </p>

            <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              One interactive model. Multiple presentation scenarios.
            </h2>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {applications.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* ==================================================
              SPECIFICATIONS
          ================================================== */}
          <section
            id="specifications"
            className="order-6 scroll-mt-24 border-t border-white/10 py-20 lg:order-none lg:py-24"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-zinc-500">
              04 / SPECIFICATIONS
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              NOVA X1 System
            </h2>

            <div className="mt-10">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-t border-white/10 py-5 text-sm"
                >
                  <span className="text-zinc-500">
                    {label}
                  </span>

                  <span className="text-right text-zinc-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs leading-6 text-zinc-600">
              NOVA X1 and its specifications are fictional assets created
              solely for this interactive presentation demonstration.
            </p>
          </section>

          {/* ==================================================
              CLOSING
          ================================================== */}
          <section className="order-7 border-t border-white/10 py-24 lg:order-none lg:py-28">
            <p className="text-xs font-medium tracking-[0.25em] text-amber-400">
              INTERACTIVE PRESENTATION
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Don&apos;t just show the product.
              <br />
              Let people experience it.
            </h2>

            <p className="mt-7 max-w-xl leading-8 text-zinc-400 sm:text-zinc-500">
              This proof of concept demonstrates how interactive 3D technology
              can be used as a modern communication tool for sales, marketing
              and product presentation.
            </p>

            <button
              type="button"
              className="mt-10 rounded-full border border-white/15 px-6 py-3 text-sm text-zinc-300 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              Request Product Demo
            </button>
          </section>
        </div>

        {/* ====================================================
            3D VIEWER

            Mobile  : order-2, langsung setelah Hero.
            Desktop : sticky di kolom kanan.
        ==================================================== */}
        <aside className="order-2 lg:order-none lg:relative">
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101216] shadow-2xl shadow-black/20">
              <ModelViewer />
            </div>

            <div className="mt-4 flex flex-col gap-2 px-2 text-[10px] tracking-[0.12em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
              <span>NOVA X1 / LIVE 3D MODEL</span>
              <span>DRAG · ZOOM · ANIMATE</span>
            </div>
          </div>
        </aside>
      </div>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-zinc-600 sm:flex-row sm:justify-between lg:px-10">
          <span>NOVA INDUSTRIES — CONCEPT DEMONSTRATION</span>
          <span>INTERACTIVE 3D PRESENTATION</span>
        </div>
      </footer>
    </main>
  );
}
