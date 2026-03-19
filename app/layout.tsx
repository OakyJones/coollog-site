import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoolLog — Digital udstyrsjournal til køleanlæg",
  description:
    "Erstat papirjournalen med en digital udstyrsjournal i jeres eget brand. QR-baseret, lovpligtig dokumentation der følger anlægget.",
  keywords: [
    "udstyrsjournal",
    "køleanlæg",
    "digital journal",
    "QR kode",
    "kølefirma",
    "PED",
    "white label",
    "compliance",
  ],
  openGraph: {
    title: "CoolLog — Digital udstyrsjournal til køleanlæg",
    description:
      "White label platform til kølefirmaer. QR-baseret dokumentation der følger anlægget.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body className="font-sans">{children}</body>
    </html>
  );
}
