import { convertToStringDate } from "@/lib/utils/Date";
import { Message } from "@prisma/client"


export interface MessageProps{
    message: Message;
}

const MessageBox = ({ message }:MessageProps)=>{
    const { ceatedAt,text } = message;
    
    const createAt = convertToStringDate(ceatedAt);

    return (
        <div 
            className="m-1 p-1 pb-2 bg-white max-w-[250px] relative rounded-lg"
        >
            <p className="break-words">
                {text}
                <span className="block text-xs leading-3 text-gray-400 absolute right-1 bottom-0">{createAt}</span>
            </p>
        </div>
    )
}

export default MessageBox;
