"use client";

import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

const SearchInput: React.FC = () => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams?.toString());

    const handleInputChange = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <form className="flex items-center w-full max-w-lg lg:max-w-md mt-4 md:mt-0">
            <Input
                className="w-80 lg:w-96 lg:mr-6"
                placeholder="Search..."
                onChange={handleInputChange}
                defaultValue={searchParams?.get('query')?.toString()}
            />
        </form>
    );
};

export default SearchInput;
