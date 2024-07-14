import { Main } from "@/components/Main";
import EditIdeaForm from "@/forms/edit-idea/form";
import getIdea from "@/queries/get-idea";

type Props = {
    params: {
        id: string
    };
};

export default async function EditIdeaPage({ params }: Props) {
    const idea = await getIdea(Number(params?.id));

    return (
        <Main>
            <EditIdeaForm idea={idea} />
        </Main>
    );
}
