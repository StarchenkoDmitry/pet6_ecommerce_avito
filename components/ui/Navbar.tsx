'use client'
import { useState } from "react";

import { categorys } from "@/lib/Categorys";
import { Search } from "./Search";
import { Button } from "./buttons/Button";

import Modal2 from "./Modal/Modal";

import { Bars4Icon, ChevronRightIcon } from "@heroicons/react/24/solid";


export interface Props {}

function Navbar(props: Props) {

    const [currentCategory,setCurrentCategory]= useState(categorys[0]);

    const [open,setOpen]= useState(false);

    const handleOpen = ()=>{ setOpen(true); }
    const handleClose = ()=>{ setOpen(false); }

    return (
        <div className="p-2 flex bg-green-100">
            <Button
                className="mx-2 bg-blue-500" 
                onClick={handleOpen}
            >
                <Bars4Icon className="w-6 h-6" />
                Все категории
            </Button>

            <Search />

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

export default Navbar






            
            {/* <Modal
                // hideBackdrop
                // disableEnforceFocus
                open={open}
                onClose={handleClose}
            >
                <Box className="m-2 p-4 flex rounded-2xl bg-white max-h-80 h-full">
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
                                <ArrowForwardIosIcon className="ml-4 text-gray-500 text-sm" fontSize="small"/>
                            </a>
                        </li>))
                    }
                    </ul>

                    <Divider sx={{ mx:1 }} orientation="vertical" flexItem />

                    <div className="p-1">
                        <a 
                            href=""
                            className="p-2 block text-lg rounded-lg hover:text-blue-500 hover:bg-slate-100"
                        >
                            <h2 className="">
                                {currentCategory.name}
                                <ArrowForwardIosIcon className="ml-auto text-gray-500 text-sm" fontSize="small"/>
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
                </Box>
            </Modal> */}











{/* <Typography variant="h2" fontSize={"2rem"}>{currentCategory.name}</Typography> */}
                        
// <Button className="ml-auto">
// Search
// </Button>




{/* <Box>
                <Paper
                    elevation={4} >
                    <span>TEXYT2</span>
                </Paper>
            </Box>
            <Paper
                elevation={11} >
                <span>TEXYT</span>
            </Paper> */}
