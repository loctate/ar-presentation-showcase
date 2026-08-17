"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";

const ModelViewerElement = "model-viewer" as ElementType;

type Vector3Like = {
  x: number;
  y: number;
  z: number;
};

type ModelViewerApi = HTMLElement & {
  loaded: boolean;
  getDimensions: () => Vector3Like;
  getBoundingBoxCenter: () => Vector3Like;
  updateHotspot: (config: {
    name: string;
    position?: string;
    normal?: string;
  }) => void;
};

const animations = [
  "Idle",
  "Walking",
  "Running",
  "Dance",
  "Wave",
];

const hotspots = {
  vision: {
    number: "01",
    title: "Vision Array",
    description:
      "Multi-directional visual sensing concept for environmental awareness and intelligent observation.",
  },
  core: {
    number: "02",
    title: "Control Core",
    description:
      "Central processing and adaptive control system coordinating NOVA X1 operations in real time.",
  },
  arm: {
    number: "03",
    title: "Arm Actuator",
    description:
      "Precision motion system designed for controlled manipulation and repeatable movement.",
  },
  mobility: {
    number: "04",
    title: "Mobility System",
    description:
      "Dynamic movement architecture designed to support stable and responsive operation.",
  },
} as const;

type HotspotKey = keyof typeof hotspots;

export default function ModelViewer() {
  const viewerRef = useRef<ModelViewerApi | null>(null);

  const [activeAnimation, setActiveAnimation] = useState("Idle");
  const [inspectionMode, setInspectionMode] = useState(false);
  const [selectedHotspot, setSelectedHotspot] =
    useState<HotspotKey>("vision");

  useEffect(() => {
    let cancelled = false;
    let viewer: ModelViewerApi | null = null;
    let handleLoad: (() => void) | null = null;

    void import("@google/model-viewer").then(() => {
      if (cancelled) {
        return;
      }

      viewer = viewerRef.current;

      if (!viewer) {
        return;
      }

      const positionHotspots = () => {
        if (!viewer) {
          return;
        }

        const size = viewer.getDimensions();
        const center = viewer.getBoundingBoxCenter();

        const position = (
          x: number,
          y: number,
          z: number,
        ) => `${x}m ${y}m ${z}m`;

        viewer.updateHotspot({
          name: "hotspot-vision",
          position: position(
            center.x,
            center.y + size.y * 0.34,
            center.z + size.z * 0.42,
          ),
          normal: "0 0 1",
        });

        viewer.updateHotspot({
          name: "hotspot-core",
          position: position(
            center.x,
            center.y + size.y * 0.04,
            center.z + size.z * 0.46,
          ),
          normal: "0 0 1",
        });

        viewer.updateHotspot({
          name: "hotspot-arm",
          position: position(
            center.x + size.x * 0.39,
            center.y - size.y * 0.03,
            center.z + size.z * 0.25,
          ),
          normal: "0 0 1",
        });

        viewer.updateHotspot({
          name: "hotspot-mobility",
          position: position(
            center.x - size.x * 0.18,
            center.y - size.y * 0.35,
            center.z + size.z * 0.24,
          ),
          normal: "0 0 1",
        });
      };

      handleLoad = positionHotspots;

      viewer.addEventListener("load", handleLoad);

      if (viewer.loaded) {
        positionHotspots();
      }
    });

    return () => {
      cancelled = true;

      if (viewer && handleLoad) {
        viewer.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  function playAnimation(animation: string) {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    viewer.setAttribute("animation-name", animation);
    viewer.setAttribute("autoplay", "");

    setActiveAnimation(animation);
    setInspectionMode(false);
  }

  function enterInspectionMode() {
    const viewer = viewerRef.current;

    if (viewer) {
      viewer.setAttribute("animation-name", "Idle");
      viewer.setAttribute("autoplay", "");
    }

    setActiveAnimation("Idle");
    setInspectionMode(true);
  }

  function selectHotspot(key: HotspotKey) {
    const viewer = viewerRef.current;

    if (viewer) {
      viewer.setAttribute("animation-name", "Idle");
      viewer.setAttribute("autoplay", "");
    }

    setActiveAnimation("Idle");
    setInspectionMode(true);
    setSelectedHotspot(key);
  }

  const selected = hotspots[selectedHotspot];

  function hotspotClass(key: HotspotKey) {
    if (!inspectionMode) {
      return "pointer-events-none flex h-9 w-9 items-center justify-center rounded-full opacity-0";
    }

    if (selectedHotspot === key) {
      return "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-[11px] font-bold text-black opacity-0 shadow-lg shadow-amber-400/30 transition data-[visible]:opacity-100";
    }

    return "flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/75 text-[11px] font-semibold text-white opacity-0 backdrop-blur-md transition hover:border-amber-400 hover:bg-amber-400 hover:text-black data-[visible]:opacity-100";
  }

  return (
    <div className="flex h-full min-h-[430px] flex-col sm:min-h-[520px]">
      <div className="relative flex-1">
        <ModelViewerElement
          ref={viewerRef}
          src="/models/nova-x1.glb"
          alt="NOVA X1 interactive robotics demonstration model"
          camera-controls
          touch-action="pan-y"
          autoplay
          animation-name="Idle"
          shadow-intensity="1"
          exposure="1"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "360px",
            background:
              "radial-gradient(circle at center, #1f2937 0%, #09090b 65%)",
          }}
        >
          <button
            type="button"
            slot="hotspot-vision"
            data-position="0 0 0"
            data-normal="0 0 1"
            data-visibility-attribute="visible"
            className={hotspotClass("vision")}
            onClick={() => selectHotspot("vision")}
            aria-label="Inspect Vision Array"
          >
            01
          </button>

          <button
            type="button"
            slot="hotspot-core"
            data-position="0 0 0"
            data-normal="0 0 1"
            data-visibility-attribute="visible"
            className={hotspotClass("core")}
            onClick={() => selectHotspot("core")}
            aria-label="Inspect Control Core"
          >
            02
          </button>

          <button
            type="button"
            slot="hotspot-arm"
            data-position="0 0 0"
            data-normal="0 0 1"
            data-visibility-attribute="visible"
            className={hotspotClass("arm")}
            onClick={() => selectHotspot("arm")}
            aria-label="Inspect Arm Actuator"
          >
            03
          </button>

          <button
            type="button"
            slot="hotspot-mobility"
            data-position="0 0 0"
            data-normal="0 0 1"
            data-visibility-attribute="visible"
            className={hotspotClass("mobility")}
            onClick={() => selectHotspot("mobility")}
            aria-label="Inspect Mobility System"
          >
            04
          </button>
        </ModelViewerElement>
      </div>

      <div className="border-t border-white/10 px-3 py-4 sm:px-4">
        <div className="mb-4 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setInspectionMode(false)}
            className={
              !inspectionMode
                ? "rounded-full bg-white px-4 py-2 text-[11px] font-medium text-black"
                : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium text-zinc-400 transition hover:text-white"
            }
          >
            Motion
          </button>

          <button
            type="button"
            onClick={enterInspectionMode}
            className={
              inspectionMode
                ? "rounded-full bg-amber-400 px-4 py-2 text-[11px] font-medium text-black"
                : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium text-zinc-400 transition hover:border-amber-400/50 hover:text-amber-300"
            }
          >
            Inspect Components
          </button>
        </div>

        {!inspectionMode ? (
          <>
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
                    onClick={() => playAnimation(animation)}
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
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black">
                {selected.number}
              </span>

              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">
                  COMPONENT INSPECTION
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {selected.title}
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
                  {selected.description}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(Object.keys(hotspots) as HotspotKey[]).map((key) => {
                const item = hotspots[key];
                const active = selectedHotspot === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectHotspot(key)}
                    className={
                      active
                        ? "rounded-xl border border-amber-400/50 bg-amber-400/10 px-3 py-2 text-left text-[11px] text-amber-300"
                        : "rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-left text-[11px] text-zinc-500 transition hover:border-white/20 hover:text-zinc-300"
                    }
                  >
                    <span className="mr-2 text-amber-400">
                      {item.number}
                    </span>
                    {item.title}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-center text-[10px] tracking-[0.12em] text-zinc-600">
              SELECT A NUMBER ON THE MODEL OR COMPONENT LIST
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
