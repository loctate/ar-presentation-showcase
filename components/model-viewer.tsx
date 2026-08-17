"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";

const ModelViewerElement = "model-viewer" as ElementType;

const animations = [
  "Idle",
  "Walking",
  "Running",
  "Dance",
  "Wave",
];

export default function ModelViewer() {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [activeAnimation, setActiveAnimation] = useState("Idle");

  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  function changeAnimation(animation: string) {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    viewer.setAttribute("animation-name", animation);
    viewer.setAttribute("autoplay", "");

    setActiveAnimation(animation);
  }

  return (
    <div className="flex h-full min-h-[520px] flex-col">
      <div className="relative flex-1">
        <ModelViewerElement
          ref={viewerRef}
          src="/models/nova-x1.glb"
          alt="NOVA X1 interactive robotics demonstration model"
          camera-controls
          autoplay
          animation-name="Idle"
          shadow-intensity="1"
          exposure="1"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "440px",
            background:
              "radial-gradient(circle at center, #1f2937 0%, #09090b 65%)",
          }}
        />
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <p className="mb-3 text-center text-xs font-semibold tracking-[0.2em] text-zinc-500">
          MOTION DEMO
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {animations.map((animation) => {
            const active = animation === activeAnimation;

            return (
              <button
                key={animation}
                type="button"
                onClick={() => changeAnimation(animation)}
                className={
                  active
                    ? "rounded-full bg-white px-4 py-2 text-xs font-medium text-zinc-950"
                    : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-400 transition hover:border-white/30 hover:text-white"
                }
              >
                {animation}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
