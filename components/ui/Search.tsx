"use client";
import { ChangeEvent } from "react";
import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


interface SearchProps {
    className?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ className, onChange }: SearchProps) {
    return (
        <div
            className={clsx(
                className,
                "flex flex-1 border-2 h-[40px] _shadow-md bg-white rounded-lg"
            )}
        >
            <button className="p-2 flex justify-center items-center rounded-full text-gray-500 hover:bg-blue-100">
                <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            <div className="mx-1 my-1 w-[1px] bg-slate-200"></div>

            <input
                className="px-2 p-1 w-[23px] flex-1 outline-none rounded-md"
                type="text"
                placeholder="search"
                onChange={onChange}
            />
        </div>
    );
}
