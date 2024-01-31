/* eslint-disable @next/next/no-img-element */
'use client'

import { Chat, Item, Message, User } from "@prisma/client"
import MessageBox from "./MessageBox";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { createMessage } from "@/lib/actions/message";
import { ChangeEvent, useState } from "react";


interface Props {
    me:User;
    chat:Chat;
    item:Item | null;
    user?:Pick<User,"id" | "imageId" | "name" | 'surname'>;
    messages: Message[];
}

function Chat({me,user,chat,item,messages}: Props) {

    const [text,setText] = useState("");
    const [sending,setSending] = useState(false);

    const changeText = (event: ChangeEvent<HTMLInputElement>)=>{
        setText(event.target.value);
    }

    const sendMessage = ()=>{
        if(sending)return;
        setSending(true);

        createMessage(chat.id,text)
        .then((res)=>{
            setText("");
        })
        .finally(()=>{
            setSending(false);
        });
    }

    return (
        <div className="flex flex-col flex-1 h-full">
            <div>
            {
                !!user ? 
                (<div className="flex _bg-yellow-50 rounded-lg">
                    <img 
                        className="w-12 h-12 object-cover rounded-full"
                        src={user.imageId ? `/api/avatar/${user.imageId}` : "/img/1.jpg"}
                        alt="avatar"
                    />
                    <div className="ml-2">
                        <div>
                            <span>{user.name}</span>
                        </div>
                        {
                            !!item &&
                            <div className='flex w-fit text-xs bg-purple-300 rounded overflow-hidden'>
                                <div className='px-2 py-[2px] text-white'>{item.lable}</div>
                                <div className='px-1 py-[2px] text-white bg-blue-500'>${item.price}</div>
                            </div>
                        }
                    </div>
                </div>):null
            }            
            </div>
            <div className="my-2 p-2 flex-1 flex flex-col-reverse basis-0 overflow-hidden overflow-y-auto bg-sky-50 _bg-gray-100 rounded-lg">
            {
                messages.map(e=>(<MessageBox key={e.id} message={e}/>))
            }
            </div>
            <div className="m-1">
                <div className="flex">
                    <div className="flex flex-1 rounded-3xl">
                        <input
                            className="flex-1 px-2 bg-blue-50 _bg-gray-50 rounded-3xl"
                            type="text"
                            placeholder="message"
                            value={text}
                            onChange={changeText}
                        />
                    </div>
                    <button 
                        className="ml-2 p-1 text-blue-500 _bg-gray-200 hover:bg-blue-100 rounded-full shadow-sm hover:scale-110 transition-all" 
                        onClick={sendMessage}
                    >
                        <PaperAirplaneIcon className="w-10 h-10"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
