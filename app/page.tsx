"use client";

import { useEffect, useState } from "react";
import ModelViewer from "../components/model-viewer";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "applications", label: "Applications" },
  { id: "specifications", label: "Specifications" },
];

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
  const [activeSection, setActiveSection] = useState("overview");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (pageHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      setScrollProgress(
        Math.min(100, Math.max(0, (window.scrollY / pageHeight) * 100)),
      );
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          );

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090b]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="#top"
            className="flex items-center gap-3"
          >
            <span className="text-xs font-semibold tracking-[0.28em] text-zinc-100">
              NOVA INDUSTRIES
            </span>

            <span className="hidden rounded-full border border-amber-400/20 bg-amber-400/5 px-2 py-1 text-[8px] font-semibold tracking-[0.16em] text-amber-400 sm:inline">
              CONCEPT DEMO
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-xs sm:flex">
            {navItems.map((item) => {
              const active = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={
                    active
                      ? "relative py-2 text-zinc-100 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-amber-400"
                      : "relative py-2 text-zinc-500 transition hover:text-zinc-200"
                  }
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-2 py-1 text-[8px] font-semibold tracking-[0.14em] text-amber-400 sm:hidden">
            DEMO
          </span>
        </div>
      </header>

      <div
        className="fixed left-0 top-16 z-[60] h-[2px] bg-amber-400 transition-[width] duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div
        id="top"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-10 lg:py-20"
      >
        <div className="contents lg:block">
          <section className="order-1 flex min-h-[68vh] flex-col justify-center pb-16 lg:order-none lg:min-h-[72vh] lg:pb-24">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-400" />

              <p className="text-[10px] font-semibold tracking-[0.3em] text-amber-400 sm:text-xs">
                INTERACTIVE PRODUCT PRESENTATION
              </p>
            </div>

            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              NOVA X1
            </h1>

            <p className="mt-5 text-lg text-zinc-300 sm:text-xl">
              Interactive Robotics Platform
            </p>

            <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 sm:mt-8 sm:text-base sm:leading-8 sm:text-zinc-500">
              A conceptual robotics platform created to demonstrate how
              interactive 3D experiences can transform product presentations,
              technical demonstrations and modern sales communication.
            </p>

            <div className="mt-9 flex flex-wrap gap-3 sm:mt-10">
              <a
                href="#experience"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition duration-200 hover:scale-[1.02] hover:bg-zinc-200"
              >
                Experience Interactive 3D
              </a>

              <a
                href="#overview"
                className="rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-400 transition hover:border-white/25 hover:text-white"
              >
                Explore Presentation
              </a>
            </div>

            <div className="mt-14 flex items-center gap-4 sm:mt-16">
              <span className="text-[9px] font-medium tracking-[0.2em] text-zinc-600">
                SCROLL TO EXPLORE
              </span>

              <span className="text-sm text-amber-400">
                ↓
              </span>
            </div>
          </section>

          <section
            id="overview"
            className="order-3 scroll-mt-24 border-t border-white/10 py-20 lg:order-none lg:py-24"
          >
            <p className="text-[10px] font-medium tracking-[0.25em] text-zinc-500 sm:text-xs">
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

          <section
            id="features"
            className="order-4 scroll-mt-24 border-t border-white/10 py-20 lg:order-none lg:py-24"
          >
            <p className="text-[10px] font-medium tracking-[0.25em] text-zinc-500 sm:text-xs">
              02 / KEY FEATURES
            </p>

            <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              Designed around intelligent interaction.
            </h2>

            <div className="mt-10 sm:mt-12">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="group grid gap-4 border-t border-white/10 py-7 transition sm:grid-cols-[60px_1fr]"
                >
                  <span className="text-sm font-medium text-amber-400 transition group-hover:translate-x-1">
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

          <section
            id="applications"
            className="order-5 scroll-mt-24 border-t border-white/10 py-20 lg:order-none lg:py-24"
          >
            <p className="text-[10px] font-medium tracking-[0.25em] text-zinc-500 sm:text-xs">
              03 / APPLICATIONS
            </p>

            <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              One interactive model. Multiple presentation scenarios.
            </h2>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {applications.map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-zinc-400 transition duration-200 hover:-translate-y-0.5 hover:border-amber-400/20 hover:bg-white/[0.04] hover:text-zinc-100"
                >
                  <span>{item}</span>

                  <span className="text-[10px] text-zinc-700 transition group-hover:text-amber-400">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section
            id="specifications"
            className="order-6 scroll-mt-24 border-t border-white/10 py-20 lg:order-none lg:py-24"
          >
            <p className="text-[10px] font-medium tracking-[0.25em] text-zinc-500 sm:text-xs">
              04 / SPECIFICATIONS
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              NOVA X1 System
            </h2>

            <div className="mt-10">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-t border-white/10 py-5 text-sm transition hover:bg-white/[0.015]"
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

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-amber-400">
                CONCEPT PROJECT
              </p>

              <p className="mt-2 text-xs leading-6 text-zinc-500">
                NOVA Industries, NOVA X1 and all specifications shown in this
                presentation are fictional assets created solely to demonstrate
                interactive 3D product presentation technology.
              </p>
            </div>
          </section>

          <section className="order-7 border-t border-white/10 py-24 lg:order-none lg:py-28">
            <p className="text-[10px] font-medium tracking-[0.25em] text-amber-400 sm:text-xs">
              INTERACTIVE PRESENTATION
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Don&apos;t just show the product.
              <br />
              Let people experience it.
            </h2>

            <p className="mt-7 max-w-xl leading-8 text-zinc-400 sm:text-zinc-500">
              This proof of concept demonstrates how interactive 3D technology
              can become a modern communication tool for sales, marketing,
              exhibitions and technical product presentations.
            </p>

            <a
              href="#experience"
              className="mt-10 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm text-zinc-300 transition duration-200 hover:border-amber-400/40 hover:bg-amber-400/5 hover:text-amber-300"
            >
              Return to 3D Experience
            </a>
          </section>
        </div>

        <aside
          id="experience"
          className="order-2 scroll-mt-24 lg:order-none lg:relative"
        >
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101216] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <ModelViewer />
            </div>

            <div className="mt-4 flex flex-col gap-2 px-2 text-[9px] tracking-[0.12em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
              <span>NOVA X1 / INTERACTIVE 3D MODEL</span>
              <span>DRAG · ZOOM · ANIMATE · INSPECT</span>
            </div>
          </div>
        </aside>
      </div>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-[10px] tracking-[0.08em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <span>NOVA INDUSTRIES — CONCEPT DEMONSTRATION</span>

            <p className="mt-1 text-[9px] normal-case tracking-normal text-zinc-700">
              Fictional brand created for portfolio demonstration purposes.
            </p>
          </div>

          <span>INTERACTIVE 3D PRODUCT PRESENTATION</span>
        </div>
      </footer>
    </main>
  );
}
