'use client'
import clsx from "clsx";
import { ChangeEvent } from "react";

interface SearchProps{
    className?:string;
    onChange?: (event: ChangeEvent<HTMLInputElement>)=>void;
}

export function Search({ 
    className, 
    onChange
}: SearchProps) {
  return (
    <div
        className={clsx(
            className,
            "flex flex-1 shadow-md bg-white rounded-md",
        )}
    >
        <button className='p-2 flex justify-center items-center rounded-full text-gray-500 hover:bg-blue-100'>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
        </button>

        <div className='mx-1 my-1 w-[1px] bg-slate-200'></div>
        
        <input
            className='px-2 p-1 w-[23px] flex-1 outline-none' 
            type="text"
            placeholder='search'
            onChange={onChange}
        />
    </div>
  );
}
