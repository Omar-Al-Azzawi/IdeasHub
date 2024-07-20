import { getUser } from "@/lib/lucia";
import { ActionItems } from "./ActionItems";
import { Logo } from "./Logo";
import { NavItems } from "./NavItems";
import { MobileMenu } from "./MobileMenu";
import Notification from "./Notifications";

const Navbar = async () => {
    const user = await getUser()

    return (
        <nav className="flex mt-4 w-11/12 z-[5000] top-10 inset-x-0 mx-auto px-4 py-5 md:px-10 md:py-5 items-center justify-between space-x-4">
            <Logo />
            <NavItems />
            <div className="flex">
                <Notification user={user} />
                <ActionItems user={user} />
            </div>
            <MobileMenu user={user} />
        </nav>
    );
};

export default Navbar;
