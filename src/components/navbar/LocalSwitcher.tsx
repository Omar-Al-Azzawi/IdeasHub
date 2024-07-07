"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LocalSwitcher(lang: any) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathName = usePathname()

    const onSelectChange = (value: string) => {
        startTransition(() => {
            if (pathName) {
                const newPath = pathName.replace(/^\/[^\/]+/, `/${value}`);
                router.replace(newPath);
            } else {
                console.error('Pathname is null');
            }
        });
    };

    return (
        <label>
            <p className="sr-only">Change language</p>
            <Select
                defaultValue={lang}
                onValueChange={onSelectChange}
                disabled={isPending}
            >
                <SelectTrigger className="bg-transparent py-2">
                    <SelectValue />
                    <Globe
                        className="mx-1 hover:text-teal-500 duration-500"
                        size={20}
                        strokeWidth={1}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">En</SelectItem>
                    <SelectItem value="fi">Fi</SelectItem>
                </SelectContent>
            </Select>
        </label>
    );
}
