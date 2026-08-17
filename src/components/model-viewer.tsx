"use client";

import { useEffect } from "react";
import type { ElementType } from "react";

const ModelViewerElement = "model-viewer" as ElementType;

export default function ModelViewer() {
  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  return (
    <ModelViewerElement
      src="/models/astronaut.glb"
      alt="Interactive 3D demonstration model"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      exposure="1"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "520px",
        background:
          "radial-gradient(circle at center, #1f2937 0%, #09090b 65%)",
      }}
    />
  );
}
