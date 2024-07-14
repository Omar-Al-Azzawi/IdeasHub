import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const NewIdeaButton = () => {
    const activeLocale = useLocale()
    const t = useTranslations()

    return (
        <Link
            href={`/${activeLocale}/ideas/new`}
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-teal-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-teal-500/90 dark:focus-visible:ring-gray-300"
        >
            {t('pages.home.new_idea')}
        </Link>
    );
}

export default NewIdeaButton;
