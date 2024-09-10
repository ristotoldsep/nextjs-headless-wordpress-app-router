// app/layout.tsx

import SiteFooter from "@/components/SiteFooter";
import "@/styles/globals.scss";
import { ViewTransitions } from 'next-view-transitions';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactNode } from 'react';
import { HeaderProvider } from '@/context/HeaderContext'; // Only provider is imported here
import ClientLayout from '@/components/ClientLayout'; // Import client-side component

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <HeaderProvider>
            {/* Only the parts that need client-side logic are moved to ClientLayout */}
            <ClientLayout>
              {children}
            </ClientLayout>
          </HeaderProvider>
          <SpeedInsights />
          <SiteFooter />
        </body>
      </html>
    </ViewTransitions>
  );
};

export default RootLayout;
