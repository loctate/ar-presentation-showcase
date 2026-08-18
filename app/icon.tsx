import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090b",
          borderRadius: "14px",
          border: "2px solid #fbbf24",
          color: "#fbbf24",
          fontSize: "25px",
          fontWeight: 800,
          letterSpacing: "-1px",
        }}
      >
        NX
      </div>
    ),
    size,
  );
}
