'use client'

import { createItem } from "@/lib/actions/item";
import { FormEvent, useState } from "react";
import { Button } from "../ui/buttons/Button";

interface Props {}

function ItemBuilder(props: Props) {
    
    const [submiting,setSubmiting] = useState(false);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(submiting)return;
        setSubmiting(true);

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const file = formData.get("file");
        
        console.log({ name, email, password: file });

        createItem(formData).then(()=>{
            setSubmiting(false);
        })
        .catch((err)=>{
            console.log("err:",err);
        });
    }

    return (
        <form 
          className="p-1 max-w-80 flex flex-col  _items-start bg-white rounded-lg"
          method="POST"
          onSubmit={handleSubmit}
        >
            <label className='m-1 mx-2 mb-0 text-black' htmlFor="">Lable</label>
            <input
              className='m-1 p-1 rounded-md placeholder-gray-600 bg-gray-200'
              name='lable'
              type="text"
              placeholder='write a title'
            />
            <input 
              className='m-1 p-1'
              name="file"
              type="file"
              accept="image/*"
            />
            <label className='m-1 mx-2 mb-0 text-black' htmlFor="">Price</label>
            <input 
              className='m-1 p-1 rounded-md bg-gray-200'
              name="price"
              // defaultValue={"50.99"}
              defaultValue={0}
              type="number"
              max={1_000_000_000}
              min={0}
            />
            <button className="m-1 p-1 px-2 w-fit rounded-md bg-blue-400 hover:bg-blue-500" type="submit">SEND</button>
        </form>
    )
}

export default ItemBuilder




/* <img className="" width={100} height={100} src="/api/image/a01bb91c-8e8b-4bac-a9ac-7684c1f90ccd" alt="" /> */

// <img className="" width={100} height={100} src="/api/image" alt="" />

// <img className="" width={100} height={100} src="/api/image/36d4bd51-c870-49bd-bf83-a5223585c40c" alt="" />






// const handleSubmit = async (formData: FormData) => {
//     if(submiting)return;
//     setSubmiting(true);

//     const name = formData.get("name");
//     const email = formData.get("email");
//     const file = formData.get("file");
    
//     console.log({ name, email, password: file });

//     createItem(formData).then(()=>{
//         setSubmiting(false);
//     })
// }
