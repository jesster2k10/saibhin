import { MouseGlow } from "@/components/mouse-glow";
import { Provider } from "@/components/ui/provider";
import Head from "next/head";

export const metadata = {
  title: "Saibhinn — Official Artist Page",
  description:
    "Discover Saibhinn: independent Irish singer-songwriter blending soulful vocals, alternative pop, and global influences into immersive storytelling.",
  keywords: [
    "Saibhinn",
    "Irish Artist",
    "Singer-Songwriter",
    "Alternative Pop",
    "Indie Music",
    "Soulful Vocals",
    "New Irish Music",
    "Independent Artist",
    "Creative Mode",
    "ONEPLUSONE",
  ],
  openGraph: {
    title: "Saibhinn — Official Artist Page",
    description:
      "Experience the sound of Saibhinn: alternative pop meets soulful storytelling. Explore music, visuals, and live experiences.",
    url: "https://yourdomain.com/saibhinn",
    siteName: "ONEPLUSONE",
    images: [
      {
        url: "https://yourdomain.com/og-images/saibhinn.jpg", // <-- replace with real image URL
        width: 1200,
        height: 630,
        alt: "Saibhinn - Official Artist Page",
      },
    ],
    locale: "en_IE",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saibhinn — Official Artist Page",
    description:
      "Discover Saibhinn: independent Irish singer-songwriter blending soulful vocals, alternative pop, and global influences.",
    images: ["https://yourdomain.com/og-images/saibhinn.jpg"], // <-- same image here
  },
  authors: [{ name: "Saibhinn" }],
  creator: "ONEPLUSONE",
  publisher: "ONEPLUSONE",
  alternates: {
    canonical: "https://yourdomain.com/saibhinn",
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hwg1qye.css" />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
