import clsx from 'clsx';
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react'


export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">{
    value?:string | null;
    onChange?:(text:string)=>void;
}

function ProfileInput({value: valueProp, onChange, className, ...rest}: Props) {
    
    const [value,setValue] = useState(valueProp === null ? "" : valueProp);

    useEffect(()=>{
        setValue(valueProp === null ? "" : valueProp);
    },[valueProp]);

    const hangleChange= (event: ChangeEvent<HTMLInputElement>)=>{
        const newText = event.target.value;
        setValue(newText);
        if(onChange){
            onChange(newText);
        }
    }
    
    return (
        <input 
            {...rest}
            className={clsx(//outline outline-2 outline-offset-2a
                "p-1 px-2 rounded-lg text-sm bg-gray-200 focus:outline-none focus:ring focus:border-blue-200",
                className,
            )}
            onChange={hangleChange}
            value={value}
        />
    )
}

export default ProfileInput
