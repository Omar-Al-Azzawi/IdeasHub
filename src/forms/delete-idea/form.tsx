"use client";

import { deleteIdeaAction } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import { useToastMessage } from "@/hooks/useToastMsg";

type Props = {
    id: number
}

const initialState = {
    success: true,
    message: '',
}

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
            {pending ? "deleting..." : "Delete"}
        </button>
    );
}

const DeleteIdeaForm = ({ id }: Props) => {
    const deleteIdea = deleteIdeaAction.bind(null, id)
    const [state, formAction] = useFormState(deleteIdea, initialState);

    useToastMessage(state)

    return (
        <form action={formAction}>
            <DeleteButton />
        </form>
    );
};

export default DeleteIdeaForm;
