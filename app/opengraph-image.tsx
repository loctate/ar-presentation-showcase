import { ImageResponse } from "next/og";

export const alt =
  "NOVA X1 Interactive 3D and Augmented Reality Product Presentation";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#08090b",
          color: "#ffffff",
          padding: "72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: "#fbbf24",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: "22px",
              letterSpacing: "6px",
              fontWeight: 700,
              color: "#fbbf24",
            }}
          >
            NOVA INDUSTRIES
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "102px",
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: "-5px",
              }}
            >
              NOVA X1
            </div>

            <div
              style={{
                marginTop: "24px",
                fontSize: "38px",
                color: "#d4d4d8",
              }}
            >
              Interactive 3D & AR Product Presentation
            </div>

            <div
              style={{
                marginTop: "28px",
                display: "flex",
                gap: "14px",
                fontSize: "21px",
                color: "#a1a1aa",
              }}
            >
              <span>3D</span>
              <span>•</span>
              <span>Motion</span>
              <span>•</span>
              <span>Component Inspection</span>
              <span>•</span>
              <span>Web AR</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
              color: "#71717a",
            }}
          >
            <span>PORTFOLIO CONCEPT DEMONSTRATION</span>
            <span>ar-presentation-showcase.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
