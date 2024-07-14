import getIdeas from "@/queries/get-ideas";
import NoIdeas from "./_components/NoIdeas";
import SearchInput from "./_components/SearchInput";
import IdeasList from "./_components/IdeasList";
import PaginationIdeas from "./_components/Pagination";
import { getUser } from "@/lib/lucia";
import NewIdeaButton from "@/components/NewIdeaButton";
import { use } from "react";

type Props = {
    searchParams: { query?: string, page?: string };
};

export default function IdeasPage({ searchParams }: Props) {
    const { query, page = "1" } = searchParams;
    const pageNumber = parseInt(page, 10);
    const ideasPerPage = 9;
    const { ideas, total } = use(getIdeas(query || '', (pageNumber - 1) * ideasPerPage, ideasPerPage));
    const user = use(getUser())

    if (total === 0) {
        return <NoIdeas user={user} />;
    }

    return (
        <main className="flex min-h-screen flex-col p-2 lg:px-24">
            <div className="flex flex-col-reverse items-center justify-between mb-8 md:flex-row">
                <div className="mt-6 md:mt-4 md:ml-6">
                    <SearchInput />
                </div>
                <div>
                    {user ? (
                        <div className="mt-4 mr-0 md:mr-6">
                            <NewIdeaButton />
                        </div>
                    ) : null}
                </div>
            </div>
            <IdeasList
                user={user}
                ideas={ideas}
            />
            <PaginationIdeas total={0} currentPage={pageNumber} ideasPerPage={ideasPerPage} />
        </main>
    );
}
