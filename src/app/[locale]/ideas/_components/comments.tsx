import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import formatDate from "@/lib/formatDate";

type Comment = {
    content: string;
    createdAt: Date;
    author: {
        name: string | null;
        imagePath?: string | null | undefined;
    };
};

type Props = {
    comments: Comment[];
};

const Comments = ({ comments }: Props) => {
    const sortedComments = comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="px-4 lg:px-32">
            <div>
                <h2 className="sr-only">Users comments</h2>
                <div>
                    {sortedComments.map((comment) => (
                        <div
                            key={comment.createdAt.toString()}
                            className="flex space-x-4 text-sm text-gray-500 dark:border-gray-700 pb-4 px-4"
                        >
                            <div className="pt-2">
                                <Avatar>
                                    <AvatarImage src={comment.author.imagePath || ''} />
                                    <AvatarFallback>
                                        {comment.author.name ? `${comment.author.name[0]}${comment.author.name[1]}` : "AN"}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="border w-full p-4 rounded-lg">
                                <h3 className="font-medium">{comment.author.name}</h3>
                                <p>
                                    <time>{formatDate(String(comment.createdAt))}</time>
                                </p>
                                <div className="prose prose-sm mt-4 max-w-none text-gray-500 dark:text-white/90">
                                    {comment.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Comments;
