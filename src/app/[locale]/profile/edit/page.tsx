import EditProfileForm from "@/forms/edit-user/form";
import { Main } from "@/components/Main";
import { getUser } from "@/lib/lucia";

export default async function EditProfilePage() {
    const user = await getUser()

    return (
        <Main>
            <EditProfileForm user={user} />
        </Main>
    );
}
