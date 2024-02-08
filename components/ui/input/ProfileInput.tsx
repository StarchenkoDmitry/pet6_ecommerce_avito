'use client'
import { 
    ChangeEvent, 
    InputHTMLAttributes, 
    useLayoutEffect, 
    useState 
} from 'react';
import clsx from 'clsx';


export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">{
    value?:string | null;
    onChange?:(text:string)=>void;
}

function ProfileInput({
    value: valueProp, 
    onChange, 
    className, 
    ...rest
}: Props) {
    
    const [value,setValue] = useState(valueProp === null ? "" : valueProp);

    useLayoutEffect(()=>{
        setValue(valueProp === null ? "" : valueProp);
    },[valueProp]);

    const hangleChange= (event: ChangeEvent<HTMLInputElement>)=>{
        const newText = event.target.value;
        setValue(newText);
        if(onChange){
            onChange(newText);
        }
    };
    
    return (
        <input 
            className={clsx(
                "p-1 px-2 rounded-lg text-sm bg-gray-200 focus:outline-none focus:ring focus:border-blue-200",
                className,
            )}
            onChange={hangleChange}
            value={value}
            {...rest}
        />
    );
}

export default ProfileInput;
