'use client'

import { createMessage, deleteMessage } from "@/lib/actions/message";


export interface Props {
    chatId:string;
}

function CreateMessageChat({chatId}: Props) {
    return (
        <div>
            <button
                className="bg-blue-200 p-1 rounded-lg"
            onClick={async ()=>{
                const bTime = Date.now();
                const cre = 3;
                const reqs = [];
                for (let p = 0; p < cre; p++) {
                    const req = createMessage(chatId,`RAND-${Math.random()}`);
                    reqs.push(req);
                }
                await Promise.all(reqs);
                const aTime = Date.now();
                console.log(`Created message(${cre}) for time:`,aTime - bTime,`, created:${cre}`);
            }}>SEND</button>
            <button 
                className="bg-blue-400 p-1 rounded-lg"            
            onClick={async()=>{
                const resdelete = await deleteMessage(chatId,"051f7865-e4fc-4571-aefe-8d435c701277");
                console.log('resdelete',resdelete);

            }}>Delete</button>
        </div>
    );
}

export default CreateMessageChat;
