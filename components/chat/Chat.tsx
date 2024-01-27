'use client'

import { Chat, Message } from "@prisma/client"
import MessageBox from "./MessageBox";


interface Props {
    chat:Chat;
    messages: Message[];
}

function Chat({chat,messages}: Props) {

    return (
        <div className="flex flex-col flex-1    h-full _max-h-[300px]">
            {/* <div className="flex flex-col flex-1      _h-full     overflow-y-auto overflow-hidden"> */}
                <div className="my-2 p-2 flex-1 basis-0   overflow-hidden overflow-y-auto bg-gray-100 rounded-lg">
                {
                    messages.map(e=>(<MessageBox key={e.id} message={e}/>))
                }
                </div>
            {/* </div> */}
            <div>
                <input 
                    className="border-2 border-gray-600 p-1 "
                    type="text" 
                />
                <button
                    className="ml-2 p-1 bg-blue-400 rounded-lg"
                >
                    send
                </button>
            </div>
        </div>
    );
}

export default Chat;
