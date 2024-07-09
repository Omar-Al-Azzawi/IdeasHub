import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const CardContainer: React.FC<Props> = ({ children }) => {
    return (
        <section className="w-full md:pb-24 lg:pb-32">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default CardContainer;
