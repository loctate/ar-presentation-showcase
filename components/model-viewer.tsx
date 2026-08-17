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
    orbit: "0deg 70deg 38%",
  },
  core: {
    number: "02",
    title: "Control Core",
    description:
      "Central processing and adaptive control system coordinating NOVA X1 operations in real time.",
    orbit: "0deg 75deg 42%",
  },
  arm: {
    number: "03",
    title: "Arm Actuator",
    description:
      "Precision motion system designed for controlled manipulation and repeatable movement.",
    orbit: "-28deg 76deg 43%",
  },
  mobility: {
    number: "04",
    title: "Mobility System",
    description:
      "Dynamic movement architecture designed to support stable and responsive operation.",
    orbit: "8deg 82deg 42%",
  },
} as const;

type HotspotKey = keyof typeof hotspots;

const defaultCamera = {
  target: "auto auto auto",
  orbit: "0deg 75deg 105%",
  fieldOfView: "45deg",
};

export default function ModelViewer() {
  const viewerRef = useRef<ModelViewerApi | null>(null);

  const focusTargetsRef = useRef<Record<HotspotKey, string>>({
    vision: "auto auto auto",
    core: "auto auto auto",
    arm: "auto auto auto",
    mobility: "auto auto auto",
  });

  const [activeAnimation, setActiveAnimation] = useState("Idle");
  const [inspectionMode, setInspectionMode] = useState(false);
  const [selectedHotspot, setSelectedHotspot] =
    useState<HotspotKey>("vision");
  const [modelLoaded, setModelLoaded] = useState(false);

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

        const visionPosition = position(
          center.x,
          center.y + size.y * 0.34,
          center.z + size.z * 0.42,
        );

        const corePosition = position(
          center.x,
          center.y + size.y * 0.04,
          center.z + size.z * 0.46,
        );

        const armPosition = position(
          center.x + size.x * 0.39,
          center.y - size.y * 0.03,
          center.z + size.z * 0.25,
        );

        const mobilityPosition = position(
          center.x - size.x * 0.18,
          center.y - size.y * 0.35,
          center.z + size.z * 0.24,
        );

        focusTargetsRef.current = {
          vision: visionPosition,
          core: corePosition,
          arm: armPosition,
          mobility: mobilityPosition,
        };

        viewer.updateHotspot({
          name: "hotspot-vision",
          position: visionPosition,
          normal: "0 0 1",
        });

        viewer.updateHotspot({
          name: "hotspot-core",
          position: corePosition,
          normal: "0 0 1",
        });

        viewer.updateHotspot({
          name: "hotspot-arm",
          position: armPosition,
          normal: "0 0 1",
        });

        viewer.updateHotspot({
          name: "hotspot-mobility",
          position: mobilityPosition,
          normal: "0 0 1",
        });

        setModelLoaded(true);
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

  function setIdleMode() {
    const viewer = viewerRef.current;

    if (viewer) {
      viewer.setAttribute("animation-name", "Idle");
      viewer.setAttribute("autoplay", "");
    }

    setActiveAnimation("Idle");
  }

  function resetCamera() {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    viewer.setAttribute(
      "camera-target",
      defaultCamera.target,
    );

    viewer.setAttribute(
      "camera-orbit",
      defaultCamera.orbit,
    );

    viewer.setAttribute(
      "field-of-view",
      defaultCamera.fieldOfView,
    );
  }

  function focusComponent(key: HotspotKey) {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    const component = hotspots[key];

    viewer.setAttribute(
      "camera-target",
      focusTargetsRef.current[key],
    );

    viewer.setAttribute(
      "camera-orbit",
      component.orbit,
    );

    viewer.setAttribute(
      "field-of-view",
      "32deg",
    );
  }

  function playAnimation(animation: string) {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    resetCamera();

    viewer.setAttribute("animation-name", animation);
    viewer.setAttribute("autoplay", "");

    setActiveAnimation(animation);
    setInspectionMode(false);
  }

  function exitInspectionMode() {
    setInspectionMode(false);
    setIdleMode();
    resetCamera();
  }

  function enterInspectionMode() {
    setIdleMode();
    setInspectionMode(true);

    requestAnimationFrame(() => {
      focusComponent(selectedHotspot);
    });
  }

  function selectHotspot(key: HotspotKey) {
    setIdleMode();
    setInspectionMode(true);
    setSelectedHotspot(key);

    requestAnimationFrame(() => {
      focusComponent(key);
    });
  }

  const selected = hotspots[selectedHotspot];

  function hotspotClass(key: HotspotKey) {
    if (!inspectionMode) {
      return "pointer-events-none flex h-9 w-9 items-center justify-center rounded-full opacity-0";
    }

    if (selectedHotspot === key) {
      return "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-[11px] font-bold text-black opacity-0 shadow-[0_0_0_6px_rgba(251,191,36,0.10)] transition duration-300 data-[visible]:opacity-100";
    }

    return "flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/80 text-[11px] font-semibold text-white opacity-0 backdrop-blur-md transition duration-300 hover:scale-110 hover:border-amber-400 hover:bg-amber-400 hover:text-black data-[visible]:opacity-100";
  }

  return (
    <div className="flex h-full min-h-[430px] flex-col sm:min-h-[520px]">
      <div className="relative flex-1 overflow-hidden">
        {!modelLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#101216]">
            <div className="text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-amber-400" />

              <p className="mt-4 text-[10px] font-semibold tracking-[0.24em] text-zinc-500">
                LOADING NOVA X1
              </p>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[9px] font-medium tracking-[0.18em] text-zinc-500 backdrop-blur-md">
          {inspectionMode ? "COMPONENT VIEW" : "LIVE 3D"}
        </div>

        {inspectionMode && (
          <button
            type="button"
            onClick={resetCamera}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] font-medium tracking-[0.14em] text-zinc-400 backdrop-blur-md transition hover:border-white/25 hover:text-white"
          >
            RESET VIEW
          </button>
        )}

        <ModelViewerElement
          ref={viewerRef}
          src="/models/nova-x1.glb"
          alt="NOVA X1 interactive robotics demonstration model"
          camera-controls
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-placement="floor"
          ar-scale="auto"
          camera-target={defaultCamera.target}
          camera-orbit={defaultCamera.orbit}
          field-of-view={defaultCamera.fieldOfView}
          min-camera-orbit="auto auto 20%"
          max-camera-orbit="auto auto 300%"
          min-field-of-view="15deg"
          max-field-of-view="60deg"
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
              "radial-gradient(circle at center, #20242b 0%, #0b0d10 68%)",
          }}
        >
          <button
            type="button"
            slot="ar-button"
            className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400 px-5 py-3 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[0_10px_35px_rgba(251,191,36,0.20)] transition hover:scale-[1.02] hover:bg-amber-300"
            aria-label="View NOVA X1 in augmented reality"
          >
            VIEW IN YOUR SPACE
          </button>

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

      <div className="border-t border-white/10 bg-[#121419] px-3 py-4 sm:px-4">
        <div className="mb-4 flex justify-center gap-2">
          <button
            type="button"
            aria-pressed={!inspectionMode}
            onClick={exitInspectionMode}
            className={
              !inspectionMode
                ? "rounded-full bg-white px-4 py-2 text-[11px] font-medium text-black"
                : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium text-zinc-400 transition hover:border-white/20 hover:text-white"
            }
          >
            Motion
          </button>

          <button
            type="button"
            aria-pressed={inspectionMode}
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
            <p className="mb-3 text-center text-[10px] font-semibold tracking-[0.22em] text-zinc-500">
              MOTION DEMO
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {animations.map((animation) => {
                const active = animation === activeAnimation;

                return (
                  <button
                    key={animation}
                    type="button"
                    aria-pressed={active}
                    onClick={() => playAnimation(animation)}
                    className={
                      active
                        ? "rounded-full bg-white px-4 py-2 text-xs font-medium text-zinc-950"
                        : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-400 transition duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    }
                  >
                    {animation}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div
            key={selectedHotspot}
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black">
                {selected.number}
              </span>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-amber-400">
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
                    aria-pressed={active}
                    onClick={() => selectHotspot(key)}
                    className={
                      active
                        ? "rounded-xl border border-amber-400/50 bg-amber-400/10 px-3 py-2 text-left text-[11px] text-amber-300"
                        : "rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-left text-[11px] text-zinc-500 transition hover:border-white/20 hover:bg-white/[0.03] hover:text-zinc-300"
                    }
                  >
                    <span className="mr-2 font-semibold text-amber-400">
                      {item.number}
                    </span>
                    {item.title}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-center text-[9px] tracking-[0.13em] text-zinc-600">
              SELECT A COMPONENT TO FOCUS THE 3D CAMERA
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
