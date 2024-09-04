import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "@/styles/globals.scss";
import { ViewTransitions } from 'next-view-transitions'


import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <ViewTransitions>
        <html lang="en">
        <body>
            <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
                <SiteHeader className="header-single-post relative" />
            </section>
            {children}
            <SiteFooter />
        </body>
        </html>
    </ViewTransitions>
  );
};

export default RootLayout;