'use client'

import { User } from '@prisma/client';
import { ChangeEvent, FormEvent, useState } from 'react'

interface Props {
    user:User;
}


function Profile({user}: Props) {

    const [changingImage,setchangingImage] = useState(false);

    const [image,setImage] = useState();

    const handleSubmitImage = (event: FormEvent<HTMLFormElement>)=>{

    }
    const onImageChange = (event: ChangeEvent<HTMLInputElement>)=>{
        console.log("FILE",event);
    }

    return (
        <div>
            <span>Name: {user.name}</span>
            <span>Surname: {user.surname}</span>

            <img
                className="w-24 h-24 object-cover rounded-full hover:scale-[1.2] transition-all"
                src={user.imageId ? `image/${user.imageId}` : "img/1.jpg" }
                alt="item"
                width={50}
                height={250}
            />
            <input 
                className='m-1 p-1'
                name="file"
                type="file"
                accept="image/*"
                onChange={onImageChange} 
            />
            <button className='block bg-gray-200 p-2'>Save</button>
        </div>
    )
}

export default Profile;












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
