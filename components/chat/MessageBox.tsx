import { Message } from "@prisma/client";
import { convertToStringDate } from "@/utils/Date";
import clsx from "clsx";


export interface MessageProps{
    message: Message;
    mine?:boolean;
}

const MessageBox = ({ message, mine }:MessageProps)=>{
    const { ceatedAt,text } = message;
    
    const createAt = convertToStringDate(ceatedAt);

    return (
        <div 
            className={clsx("my-1 p-1 pb-2 max-w-[250px] relative rounded-lg",
            mine? "ml-auto bg-blue-100" : "bg-white")}
        >
            <p className="break-words">
                {text}
                <span className="block text-xs leading-3 text-gray-400 absolute right-1 bottom-0">{createAt}</span>
            </p>
        </div>
    )
}

export default MessageBox;
