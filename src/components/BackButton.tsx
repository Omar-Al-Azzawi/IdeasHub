import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    path: string;
};

async function BackButton({ path }: Props) {
    const t = useTranslations()

    return (
        <div className="w-24 hover:text-teal-500/90">
            <Link href={path} className="mb-4 flex">
                <ChevronLeft size={20} className="pt-1" />
                <span className="">{t('action.back')}</span>
            </Link>
        </div>
    );
}

export default BackButton;
