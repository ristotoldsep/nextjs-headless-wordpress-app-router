// context/HeaderContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextProps {
    headerClass: string;
    setHeaderClass: (newClass: string) => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [headerClass, setHeaderClass] = useState("");

    return (
        <HeaderContext.Provider value={{ headerClass, setHeaderClass }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeaderContext must be used within a HeaderProvider");
    }
    return context;
};
