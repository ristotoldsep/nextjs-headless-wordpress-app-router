// components/UpdateHeaderClass.tsx
"use client"; // This marks it as a client component

import { useEffect } from "react";
import { useHeaderContext } from "@/context/HeaderContext";

interface UpdateHeaderClassProps {
    className: string;
}

const UpdateHeaderClass = ({ className }: UpdateHeaderClassProps) => {
    const { setHeaderClass } = useHeaderContext();

    useEffect(() => {
        setHeaderClass(className); // Update the header class when the component mounts

        return () => {
            setHeaderClass(""); // Reset the header class when the component unmounts
        };
    }, [className, setHeaderClass]);

    return null; // No UI rendering needed
};

export default UpdateHeaderClass;
