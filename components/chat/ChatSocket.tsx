'use client'
import { 
    ChangeEvent, 
    useEffect, 
    useRef, 
    useState 
} from 'react';
import io, { Socket } from 'socket.io-client';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { GetBaseAddressWS } from '@/constants/websocket';
import { 
    CHAT_ADDED_MESSAGE, 
    CHAT_ADD_MESSAGE, 
    CHAT_INIT, 
    ClientMessage, 
    EVENT_CLIENT_MESSAGE, 
    EVENT_SERVER_MESSAGE, 
    ServerMessage 
} from '@/interfaces/chat.socket';

import { Item, Message, User } from '@prisma/client';

import MessageBox from './MessageBox';
import Avatar from '../ui/Avatar';


interface Props{
    token:string;
    chatId:string;

    me:User;
    user?:Pick<User,"id" | "imageId" | "name" | 'surname'>;
    item:Item | null;
}

export default function ChatSocket({me,user,item,token,chatId}:Props) {

    const [messages,setMessages] = useState<Message[]>([]);
    const [text,setText] = useState<string>("");

    const socket = useRef<Socket | undefined>();

    useEffect(() => {
        socket.current = io(GetBaseAddressWS(),{
            query:{ chatId },
            auth:{ token }
        });

        socket.current.on("connect", () => {
            
        });

        socket.current.on("disconnect", (reason) => {
            
        });

        socket.current.on(EVENT_SERVER_MESSAGE, (message:ServerMessage) => {
            console.log(`Server data: ${JSON.stringify(message)}`);
            switch(message.type){
                case CHAT_INIT:{
                    setMessages(message.data.messages);
                    break;
                }
                case CHAT_ADDED_MESSAGE:{
                    setMessages(prev=>[message.data.message,...prev]);
                    break;
                }
                default:{
                    break;
                }
            }
        });
        
        return () => {
            socket.current?.disconnect();
            socket.current = undefined;
        };
    }, []);

    const handleInput = (event: ChangeEvent<HTMLInputElement>)=>{
        setText(event.target.value);
    }
    
    const sendMessage = ()=>{
        const mess:ClientMessage = {
            type:CHAT_ADD_MESSAGE,
            data:{text:text}
        }
        socket.current?.emit(EVENT_CLIENT_MESSAGE,mess);
    }

    return (
        <div className="flex flex-col flex-1 h-full">
            <div>
            {
                user ? 
                <div className="flex _bg-yellow-50 rounded-lg">
                    <Avatar
                        className='w-[48px] h-[48px] object-cover rounded-full'
                        id={user.imageId}
                        sizes='48px'
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
                </div> :
                <div>
                </div>
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
                            onChange={handleInput}
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
