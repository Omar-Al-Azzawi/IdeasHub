import React from "react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const Main = ({ children }: Props) => {
    return (
        <main className="mx-auto lg:w-[600px] p-8">
            {children}
        </main>
    );
};