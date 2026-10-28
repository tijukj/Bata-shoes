import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { Toast } from "@/components/Toast";
import { ProductDetailsModal } from "@/components/ProductDetailsModal";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { BRAND_CONFIG } from "@/data/productData";

export const metadata: Metadata = {
  metadataBase: new URL("https://bata.in"),
  title: `${BRAND_CONFIG.name} | Modern Formal Footwear & Craftsmanship`,
  description:
    "Explore Bata formal footwear. Masterfully crafted men's formal lace-up derbies, cap-toe oxfords, and executive slip-on shoes engineered with Boss-Grip traction.",
  keywords: [
    "bata",
    "bata formal shoes",
    "bata boss grip",
    "mens formal shoes",
    "derby shoes",
    "oxford shoes",
    "leather shoes",
  ],
  authors: [{ name: "Bata Formal Footwear" }],
  openGraph: {
    title: `${BRAND_CONFIG.name} — Crafted For Every Step`,
    description:
      "Modern formal footwear for ambitious professionals. 360° interactive view and four curated style expressions.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/products/classic-black.png",
        width: 1200,
        height: 675,
        alt: "Bata Classic Boss-Grip Derby",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-forme-bg text-forme-dark font-sans selection:bg-forme-dark selection:text-white">
        <ShopProvider>
          {children}
          {/* Global Interactive Overlays */}
          <ProductDetailsModal />
          <SizeGuideModal />
          <CartDrawer />
          <WishlistDrawer />
          <Toast />
        </ShopProvider>
      </body>
    </html>
  );
}
