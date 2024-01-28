import { XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import React from 'react'


interface Props {
    isOpen:boolean;
    onClose?:()=>void;
}

function PanelHeader({isOpen,onClose}: Props) {
    
    return (
        <div className={clsx(
            "z-10 fixed inset-0 _w-screen _h-screen _max-w-[300px] bg-gray-400 transition-all duration-300",
            !isOpen && "left-full"
        )}
            onClick={onClose}
        >
            <button className="block m-4 ml-auto">    
                <XMarkIcon className="w-10 h-10"/>
            </button>
            <div>PanelHeader</div>
        </div>
    )
}

export default PanelHeader
