import Landing from "@/components/Landing";
import { useTranslations } from "next-intl";

export default function Index() {
    const t = useTranslations();
    return (
        <main className="flex min-h-screen flex-col mt-20">
            <Landing />
        </main>
    );
}
