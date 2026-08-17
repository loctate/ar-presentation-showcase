import ModelViewer from "../components/model-viewer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 lg:flex-row lg:items-center lg:gap-12 lg:px-10">
        <div className="z-10 lg:w-2/5">
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-zinc-400">
            NOVA INDUSTRIES
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            NOVA X1
          </h1>

          <p className="mt-3 text-xl text-zinc-400">
            Interactive Robotics Platform
          </p>

          <p className="mt-6 max-w-lg leading-7 text-zinc-400">
            Interactive 3D product presentation proof of concept.
            Drag the model to rotate and scroll or pinch to zoom.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-500">
            <span>Drag · Rotate</span>
            <span>Scroll · Zoom</span>
          </div>
        </div>

        <div className="mt-10 min-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 lg:mt-0 lg:w-3/5">
          <ModelViewer />
        </div>
      </section>
    </main>
  );
}
