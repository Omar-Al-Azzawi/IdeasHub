import NewIdeaButton from "@/components/NewIdeaButton";

type Props = {
    user: any
}

const NoIdeas = ({ user }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center h-[90vh] px-4 md:px-6">
            <div className="max-w-2xl text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ideas
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No idea posts available yet.
                </p>
            </div>
            <div>
                {user ? (
                    <div className="mt-4">
                        <NewIdeaButton />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default NoIdeas;
