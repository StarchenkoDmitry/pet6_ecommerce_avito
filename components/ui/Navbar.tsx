'use client'
import { ChangeEvent, useState } from "react";

import { categorys } from "@/lib/Categorys";
import { Search } from "./Search";
import { Button } from "./buttons/Button";

import Modal2 from "./Modal/Modal";

import { Bars4Icon, ChevronRightIcon } from "@heroicons/react/24/solid";


export interface Props {
    value?:string;
    onChangeText?:(text:string)=>void;
}

function Navbar({value,onChangeText}: Props) {

    const [currentCategory,setCurrentCategory]= useState(categorys[0]);

    const [open,setOpen]= useState(false);

    const handleOpen = ()=>{ setOpen(true); }
    const handleClose = ()=>{ setOpen(false); }

    return (
        <div className="p-2 flex">
            <Button
                className="mr-2 bg-blue-500"
                onClick={handleOpen}
            >
                <Bars4Icon className="w-6 h-6" />
                Все категории
            </Button>

            <Search
                value={value}
                onChangeText={onChangeText}
            />

            <Modal2
                className="bg-[rgba(0,0,0,0.50)]"
                open={open}
                onClose={handleClose}
            >
                <div className="m-4 p-2 flex rounded-2xl bg-white max-h-80 h-full">

                    <ul className="">
                    {
                        categorys.map(c=>(
                        <li key={c.url}>
                            <a
                                href={c.url} 
                                data-select={c === currentCategory}
                                className="my-1 p-2 flex justify-between items-center rounded-lg data-[select=true]:text-blue-500 hover:bg-slate-100 data-[select=true]:bg-slate-100"
                                onMouseEnter={()=>{ setCurrentCategory(c); }}
                            >
                                <span className="text-sm">{c.name}</span>
                                <ChevronRightIcon className="w-4 h-4"/>
                            </a>
                        </li>))
                    }
                    </ul>

                    <div className='mx-2 w-[1px] bg-slate-200'></div>

                    <div className="">
                        <a 
                            href=""
                            className="p-2 block text-lg rounded-lg hover:text-blue-500 hover:bg-slate-100"
                        >
                            <h2 className="flex items-center">
                                {currentCategory.name}
                                <ChevronRightIcon className="w-4 h-4"/>
                            </h2>
                        </a>
                        <ul className="px-2">
                        {
                            currentCategory.subCategorys.map(subc=>(
                            <li key={subc.url}>
                                <a 
                                    href={subc.url} 
                                    className="m-1 p-2 block rounded-2xl text-sm hover:text-blue-500 hover:bg-slate-100"
                                >
                                    {subc.name}
                                </a>
                            </li>))
                        }
                        </ul>
                    </div>

                    
                </div>
            </Modal2>
        </div>
    )
}

export default Navbar;
