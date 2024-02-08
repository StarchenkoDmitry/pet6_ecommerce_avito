'use client'
import { 
    ChangeEvent, 
    useEffect, 
    useRef, 
    useState 
} from 'react';
import clsx from 'clsx';

import { User } from '@prisma/client';

import { changeAvatar, changeName } from '@/actions/user';

import ProfileInput from '../ui/input/ProfileInput';
import Avatar from '../ui/Avatar';


interface Props {
    user:User;
}

function Profile({user}: Props) {
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

        const formData = new FormData();
        formData.append("file",files[0]);
        changeAvatar(formData);
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
                <Avatar
                    id={user.imageId}
                    className='m-2 w-24 h-24 object-cover rounded-xl hover:scale-[1.2] transition-all'
                    width={256}
                    height={256}
                    sizes='256px'
                />
            </div>
        </div>
    )
}

export default Profile;
