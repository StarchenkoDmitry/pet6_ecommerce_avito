import Image from "next/image";
import clsx from "clsx";
import { 
    PICTURE_SCALE_HEIGHT_0, 
    PICTURE_SCALE_HEIGHT_1, 
    PICTURE_SCALE_HEIGHT_2, 
    PICTURE_SCALE_HEIGHT_3, 
    PICTURE_SCALE_HEIGHT_MAX 
} from "@/lib/const";


interface Props {
    id:string | null;
    className?:string;

    sizes?:string;
    width?:number;
    height?:number;
}

function ItemImage({id,className,height,width,sizes}: Props) {
    if(id){
        const imageUrl = `/api/imagesize/${id}`;
        const srcSeet = createSet(id);
        return (
            <img 
                className={clsx("border-2",className)}
                src={imageUrl}                
                srcSet={srcSeet}                
                width={width}
                height={height}
                sizes={sizes? sizes : "250px"}
                alt="item image"
            />
        )
    }else{
        return(
            <Image 
                className={clsx("border-2",className)}
                src={"/images/noimage.jpg"}
                width={width ? width : 256}
                height={height ? height : 256}
                quality={90}
                sizes={sizes? sizes : "250px"}
                alt="without an image"
            />
        )
    }
}

export default ItemImage;


function createSet(id:string){
    const bs = `/api/imagesize/${id}`;
    const sets = 
    bs+`?h=${PICTURE_SCALE_HEIGHT_3} ${PICTURE_SCALE_HEIGHT_3}w, `+
    bs+`?h=${PICTURE_SCALE_HEIGHT_2} ${PICTURE_SCALE_HEIGHT_2}w, `+
    bs+`?h=${PICTURE_SCALE_HEIGHT_1} ${PICTURE_SCALE_HEIGHT_1}w, `+
    bs+`?h=${PICTURE_SCALE_HEIGHT_0} ${PICTURE_SCALE_HEIGHT_0}w, `+
    bs+` ${PICTURE_SCALE_HEIGHT_MAX}w`;    
    return sets;
}
