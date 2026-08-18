import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ar-presentation-showcase.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NOVA X1 — Interactive 3D & AR Product Presentation",
    template: "%s | NOVA X1",
  },

  description:
    "A portfolio concept demonstrating interactive 3D product presentation, animation, component inspection, camera focus, QR access, and augmented reality using Next.js and model-viewer.",

  applicationName: "NOVA X1 Interactive Presentation",

  keywords: [
    "Augmented Reality",
    "AR Presentation",
    "Interactive 3D",
    "3D Product Presentation",
    "WebAR",
    "model-viewer",
    "Next.js",
    "Product Visualization",
    "Interactive Presentation",
    "Portfolio Demo",
  ],

  authors: [
    {
      name: "Bonar Sulaiman",
    },
  ],

  creator: "Bonar Sulaiman",
  publisher: "Bonar Sulaiman",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "NOVA X1 Interactive Presentation",
    title: "NOVA X1 — Interactive 3D & AR Product Presentation",
    description:
      "Explore a portfolio concept combining interactive 3D, animation, component inspection, QR access, and augmented reality.",
  },

  twitter: {
    card: "summary_large_image",
    title: "NOVA X1 — Interactive 3D & AR Product Presentation",
    description:
      "Interactive 3D and augmented reality product presentation concept built for portfolio demonstration.",
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
