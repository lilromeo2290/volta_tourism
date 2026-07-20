import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { VTHProvider } from "@/components/vth-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://voltatourismhub.com"),
  title: "Volta Tourism Hub | Discover Ghana's Hidden Paradise",
  description:
    "Explore the Volta Region of Ghana — breathtaking waterfalls, pristine beaches, rich cultural heritage, adventure experiences, and community tourism. Plan your journey with Volta Tourism Hub (VTH), the official digital gateway to Volta Region.",
  keywords: [
    "Volta Region",
    "Ghana tourism",
    "Wli Falls",
    "Mount Afadja",
    "Keta Beach",
    "Tafi Atome",
    "Volta tourism",
    "Ghana travel",
    "West Africa travel",
    "ecotourism Ghana",
    "community tourism",
    "African culture",
    "Kente weaving",
    "Ghana festivals",
    "Volta Region hotels",
    "Volta Region tours",
    "adventure tourism Ghana",
    "Volta Tourism Hub",
    "VTH",
  ],
  authors: [{ name: "Volta Tourism Hub" }],
  creator: "Volta Tourism Hub",
  publisher: "Volta Tourism Hub",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Volta Tourism Hub | Discover Ghana's Hidden Paradise",
    description:
      "Culture. Nature. Adventure. One Extraordinary Region. Explore waterfalls, beaches, festivals, and communities in Ghana's Volta Region.",
    url: "https://voltatourismhub.com",
    siteName: "Volta Tourism Hub",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Volta Tourism Hub - Discover Ghana's Volta Region",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volta Tourism Hub | Discover Ghana's Hidden Paradise",
    description:
      "Culture. Nature. Adventure. One Extraordinary Region.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#054906" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              name: "Volta Region, Ghana",
              description:
                "The Volta Region is one of Ghana's most scenic areas, featuring waterfalls, mountains, lakes, beaches, and rich Ewe cultural heritage.",
              url: "https://voltatourismhub.com",
              touristType: ["Cultural tourism", "Ecotourism", "Adventure tourism", "Beach tourism"],
              includesAttraction: [
                { "@type": "TouristAttraction", name: "Wli Waterfalls" },
                { "@type": "TouristAttraction", name: "Mount Afadja" },
                { "@type": "TouristAttraction", name: "Keta Beach" },
                { "@type": "TouristAttraction", name: "Tafi Atome Monkey Sanctuary" },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white text-charcoal min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <VTHProvider>{children}</VTHProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}