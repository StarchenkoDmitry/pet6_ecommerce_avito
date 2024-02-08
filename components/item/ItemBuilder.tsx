"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { 
    DEFAULT_ITEM_PRICE, 
    MAX_COUNT_PICTURES, 
    MAX_ITEM_PRICE, 
    MAX_SIZE_ITEM_DESCRIPTION, 
    MIN_ITEM_PRICE 
} from "@/lib/constants";

import { createItem } from "@/lib/actions/item";
import { convertFileToDataURL } from "@/lib/utils/imager";


interface Props {}

function ItemBuilder(props: Props) {

    const [submiting, setSubmiting] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const [lable,setLable] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");

    const [files,setFiles] = useState<File[]>([]);
    const [images,setImages] = useState<string[]>([]);


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (submiting) return;
        setSubmiting(true);

        const formData = new FormData();
        formData.append("lable",lable);
        formData.append("price",price);
        formData.append("description",description);
        
        for (var x = 0; x < files.length; x++) {
            formData.append("files", files[x]);
        }

        createItem(formData)
        .then((res)=>{
            setLable("");
            setPrice("");
            setDescription("");
            setFiles([]);
            setImages([]);
        }).catch((error)=>{
            // console.log("error:", error);
        }).finally(()=>{
            setSubmiting(false);
        });
    };

    const handleAddFiles = async (event: ChangeEvent<HTMLInputElement>)=>{
        event.preventDefault();

        const files = event.target.files;
        if(!files || files.length === 0) return;

        const filesArray = Array.from(files);

        const cons = filesArray.map(async(e)=>convertFileToDataURL(e));
        const newImages = await Promise.all(cons);


        setFiles(prev=>{
            if(prev.length + filesArray.length > MAX_COUNT_PICTURES){
                return prev
            }else{
                return [...prev,...filesArray];
            }
        });

        setImages(prev=>{
            if(prev.length + newImages.length > MAX_COUNT_PICTURES){
                return prev
            }else{
                return [...prev,...newImages];
            }
        });
    }

    const handleOpenFiles = ()=>{
        inputFileRef.current?.click();
    }

    const changeLable = (event: ChangeEvent<HTMLInputElement>)=>{
        setLable(event.target.value);
    }

    const changeDescription = (event: ChangeEvent<HTMLTextAreaElement>)=>{
        setDescription(event.target.value);
    }
    
    const changePrice = (event: ChangeEvent<HTMLInputElement>)=>{
        // setPrice(parseFloat(event.target.value));
        setPrice(event.target.value);
        console.log(price)
    }

    return (
        <form
            className="p-2 max-w-80 flex flex-col bg-gray-50 rounded-lg"
            onSubmit={handleSubmit}
        >
            <label htmlFor="lable">
                Заголовок объявления
            </label>
            <input
                className="mb-4 p-1 rounded-md bg-gray-200"
                name="lable"
                type="text"
                value={lable}
                onChange={changeLable}
            />


            <label htmlFor="price">
                Цена
            </label>
            <input
                className="mb-4 p-1 rounded-md bg-gray-200"
                name="price"
                // defaultValue={DEFAULT_ITEM_PRICE}
                value={price}
                type="number"
                max={MAX_ITEM_PRICE}
                min={MIN_ITEM_PRICE}
                onChange={changePrice}
            />


            <label htmlFor="description">
                Описание
            </label>
            <textarea
                className="resize-none border-2 outline-none border-b-gray-400 rounded-lg"
                name="description"
                rows={4}
                maxLength={MAX_SIZE_ITEM_DESCRIPTION}
                value={description}
                onChange={changeDescription}
            />
            <span className="mb-4 m-1 text-xs text-gray-700">
                Максимально 2000 символов
            </span>


            <label htmlFor="files">
                Фотографии
            </label>
            <div className="flex p-2 h-[241px] border-2 rounded-lg overflow-x-auto overflow-hidden">
            {
                !!images && images.length > 0 ? images.map((e,i)=>(
                <div
                    key={i}
                    className="flex-none border-2 m-1 w-[204px] h-[204px] bg-gray-500 rounded-lg overflow-hidden"
                >
                    <img 
                        className="w-[200px] h-[200px] object-cover"
                        src={e} 
                        alt="picture" 
                    />
                </div>)):
                (<div
                    className="flex-none p-2 flex items-center border-2 w-[204px] h-[204px] rounded-lg"
                    onClick={handleOpenFiles}
                >
                    <span className="text-center">Перетащите фотографии сюда</span>
                </div>)
            }
            </div>
            <span className="m-1 text-xs text-gray-700">
                Вы можете добавить не более 12 фотографий в своем объявлении
            </span>
            <input
                className="hidden" 
                name="files" 
                type="file" 
                // accept="image/*"
                accept="image/png, image/jpg, image/jpeg"
                multiple
                ref={inputFileRef} 
                onChange={handleAddFiles}
            />
            <button 
                className="mb-4 p-2 text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
                onClick={handleOpenFiles}
                type="button"
            >
                Добавить картинки
            </button>


            <button
                className="p-1 px-2 w-fit text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
                type="submit"
            >
                Добавить 
            </button>
        </form>
    );
}

export default ItemBuilder;
