import Link from "next/link";
import BlurIn from "./Blur"
import Particles from "./Particles";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./ui/button";

export default async function Landing() {
    const session = false
    const localActive = useLocale();
    const t = useTranslations()

    return (
        <main className="flex-1 relative">
            <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                refresh
            />
            <section className="w-full pt-20 relative z-10">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <BlurIn word={t('pages.home.title')} />
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                                {t('pages.home.sub_title')}
                            </p>
                        </div>
                        <div className="space-x-4">
                            {!session ? (
                                <Link
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-teal-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-teal-500/90 dark:focus-visible:ring-gray-300"
                                    href={`${localActive}/signup`}
                                >
                                    {t('action.signup')}
                                </Link>
                            ) : (
                                <Button>New idea</Button>
                            )}
                            <Link
                                className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                href={`${localActive}/learn-more`}
                            >
                                {t('pages.home.learn_more')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
