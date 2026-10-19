import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import PixelTracker from "@/components/PixelTracker";
import QuickOrderModal from "@/components/QuickOrderModal";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";

export const metadata: Metadata = {
  title: "دار الأصالة للحلويات المغربية الفاخرة | Dar Al Asala Pâtisserie Royale",
  description:
    "أرقى تشكيلات الحلويات المغربية التقليدية: شباكية ملكية بالعسل الحر، كعب غزال باللوز البلدي، بريوات مقرمشة، غريبة بهلة، ومحنشة. شحن سريع ومضمون لكافة المدن المغربية والدولية.",
  keywords: "حلويات مغربية, شباكية, كعب غزال, بريوات, غريبة, محنشة, فاس, الدار البيضاء, pâtisserie marocaine",
  icons: {
    icon: "/images/logo-dar-alasala.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@300;400;500;600;700;800&family=Cinzel:wght@600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF7F2] text-[#26211C] antialiased selection:bg-[#EEDCA2] selection:text-[#5E4108] min-h-screen flex flex-col">
        <StoreProvider>
          <PixelTracker />
          {children}
          <CartDrawer />
          <QuickOrderModal />
          <CheckoutModal />
        </StoreProvider>
      </body>
    </html>
  );
}
