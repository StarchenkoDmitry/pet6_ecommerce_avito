/* eslint-disable @next/next/no-img-element */
'use client'

import { User } from '@prisma/client';
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import ProfileInput from '../ui/input/ProfileInput';
import { changeAvatar, changeName } from '@/lib/actions/user';
import clsx from 'clsx';

interface Props {
    user:User;
}


function Profile({user}: Props) {

    const imageUrl = user.imageId ? `api/avatar/${user.imageId}` : "img/1.jpg";


    const [changingImage,setchangingImage] = useState(false);
    const [imageFile,setImageFile] = useState<any>();
    const [image,setImage] = useState<any>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef({
        newFile: undefined,
        updatedFile: undefined,
        doRequest: false,
    });
    const onImageChange = (event: ChangeEvent<HTMLInputElement>)=>{
        // console.log("FILE",event);
        const files = event.target.files;
        if(!files)return;

        // const fd = new FormData();
        // fd.append("file",files[0]);
        // changeAvatar(fd);
        setImageFile(files[0]);
    }
    const handleSelectFile = ()=>{
        inputRef.current?.click();
    }
    useEffect(() => {
        if (imageFile) {
            // const fileReader = new FileReader();
            // fileReader.onload = (e) => {
            //     const { result } = e.target;
            //     if (result && ) {
            //         setImage(result)
            //     }
            // }
            // fileReader.readAsDataURL(imageFile);
            setImage(URL.createObjectURL(imageFile));
        }    
      }, [imageFile]);


    const [changingName,setChangingName] = useState(false);
    const nameRef = useRef({
        newName: user.name,
        updatedName: user.name,
        doRequest: false,
    });
    const reqChangeName = async ()=>{
        const newName = nameRef.current.newName;
        const updatedName = nameRef.current.updatedName;

        if(!nameRef.current.doRequest && newName !== updatedName){
            nameRef.current.doRequest = true;
            setChangingName(true);

            changeName(newName)
            .then((changed)=>{
                if(changed){
                    nameRef.current.updatedName = newName;
                }
            })
            .finally(()=>{
                nameRef.current.doRequest = false;
                
                setChangingName(false);
            });
        }
    }
    const handleChangeName = (name:string)=>{
        nameRef.current.newName = name;
        reqChangeName();
    }

    return (
        <div>
            <span className='block '>Name</span>            
            <ProfileInput className={clsx('mb-2 transition-all',changingName && "bg-blue-300")} value={user.name} onChange={handleChangeName}/>
            <span className='block'>Surname</span>
            <ProfileInput className='mb-2' value={user.surname}/>

            <div className='p-1 _bg-gray-200 rounded-lg'>
                <img 
                    className="m-2 w-24 h-24 object-cover rounded-xl hover:scale-[1.2] transition-all"
                    src={image}
                    alt="image" 
                />
                <input
                    className='m-1 p-1 hidden'
                    name="file"
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={onImageChange}
                />
                <button 
                    onClick={handleSelectFile}
                    className='p-1 px-2 _block bg-green-300 hover:bg-green-400 transition-all rounded-lg'
                >Upload a image</button>
                <img
                    className="m-2 w-24 h-24 object-cover rounded-xl hover:scale-[1.2] transition-all"
                    src={imageUrl}
                    alt="item"
                    width={50}
                    height={250}
                />
            </div>
        </div>
    )
}

export default Profile;











    // const [v,setV] = useState(user.name);

    // useEffect(()=>{
    //     setV(prev=>prev+Math.round((Math.random()*10)));
    //     setInterval(()=>{
    //         setV(prev=>prev+Math.round((Math.random()*10)));
    //     },2000);
    // },[]);




// function Profile({user}: Props) {

//     const [changingImage,setchangingImage] = useState(false);

//     const handleSubmitImage = (event: FormEvent<HTMLFormElement>)=>{

//     }

//     return (
//         <div>
//             <span>Name: {user.name}</span>
//             <span>Surname: {user.surname}</span>

//             <img
//                 className="w-24 h-24 object-cover rounded-full hover:scale-[1.2] transition-all"
//                 src={user.imageId ? `image/${user.imageId}` : "img/1.jpg" }
//                 alt="item"
//                 width={50}
//                 height={250}
//             />
//             <form 
//                 className="p-1 max-w-80 flex flex-col bg-white rounded-lg"
//                 method="POST"
//                 onSubmit={handleSubmitImage}
//             >
//                 <input 
//                     className='m-1 p-1'
//                     name="file"
//                     type="file"
//                     accept="image/*"
//                 />
//             </form>
//         </div>
//     )
// }

// export default Profile;
