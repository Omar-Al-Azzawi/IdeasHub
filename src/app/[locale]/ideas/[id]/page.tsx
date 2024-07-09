import formatDate from "@/lib/formatDate";
import BackButton from "@/components/BackButton";
import NewCommentForm from "@/forms/add-comment/form";
import Comments from "../_components/comments";
import getIdea from "@/queries/get-idea";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import defaultImage from "@/assets/ideahub.png";
import { IdeaContent } from "../_components/IdeaContent";
import { JSONContent } from "@tiptap/react";
import { useLocale } from "next-intl";

type Props = {
    params: {
        id: string;
    };
};

export default async function IdeaPage({ params }: Props) {
    const { id } = params;
    const ideaId = Number(id);
    const idea = await getIdea(ideaId);
    // const activeLocale = useLocale()


    if (!idea) {
        return <div>Idea not found</div>;
    }

    const imagePath = idea.imagePath || defaultImage;

    return (
        <main className="flex min-h-screen flex-col p-4 lg:px-24">
            <Image
                src={imagePath}
                width={800}
                height={400}
                alt="Idea Image"
                className="w-full h-64 object-cover rounded-lg mb-2"
            />
            {/* <BackButton path={`/${activeLocale}/ideas`} /> */}
            <section className="lg:mx-40 tiptap">
                <div className="flex flex-col">
                    <span className="text-xs">{formatDate(String(idea.createdAt))}</span>
                    <span className="text-xs mb-4 font-bold">{idea.author.name}</span>
                </div>
                <h1 className="font-bold mb-4 text-3xl tracking-tight">{idea.title}</h1>
                <div className="mb-4 space-x-2">
                    {idea.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <IdeaContent content={idea.content as JSONContent} />
            </section>
            <NewCommentForm ideaId={String(ideaId)} />
            <Comments comments={idea.comments} />
        </main>
    );
}
