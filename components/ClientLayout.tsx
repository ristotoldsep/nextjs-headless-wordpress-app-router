// components/ClientLayout.tsx
"use client"; // This marks it as a client component

import { ReactNode } from 'react';
import { useHeaderContext } from '@/context/HeaderContext';
import SiteHeader from "@/components/SiteHeader";

interface ClientLayoutProps {
    children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
    const { headerClass } = useHeaderContext(); // Client-side logic

    return (
        <>
            <section className="bg-opacity-70 absolute w-full z-20">
                <SiteHeader className={headerClass} /> {/* Client logic */}
            </section>
            {children}
        </>
    );
};

export default ClientLayout;
