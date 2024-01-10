'use client'
import { Box, Button, Divider, IconButton, InputBase, Modal, Paper } from "@mui/material";
import { useState } from "react";
import { Backdrop } from '@mui/material';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuIcon from '@mui/icons-material/Menu';

import { categorys } from "@/lib/Categorys";


export interface Props {}

function Navbar(props: Props) {

    const [currentCategory,setCurrentCategory]= useState(categorys[0]);

    const [open,setOpen]= useState(false);

    const handleOpen = ()=>{ setOpen(true); }

    const handleClose = ()=>{ setOpen(false); }


    return (
        <div className="p-2 flex bg-green-100">
            <Button 
                onClick={handleOpen}
                className="mx-2 bg-blue-500"
                variant="contained"
                startIcon={<MenuIcon/>}
            >
                
                Все категории
            </Button>
            
            <Paper
                component="form"
                sx={{ 
                    // p: '2px 4px',
                    display: 'flex', 
                    alignItems: 'center',
                    // width: "400"
                    flex: 1
                }}
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </Paper>

            <Modal
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
            </Modal>
        </div>
    )
}

export default Navbar







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
