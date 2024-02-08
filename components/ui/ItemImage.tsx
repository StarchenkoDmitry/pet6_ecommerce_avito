import Image from "next/image";
import { 
    PICTURE_SCALE_WIDTH_0, 
    PICTURE_SCALE_WIDTH_1, 
    PICTURE_SCALE_WIDTH_2, 
    PICTURE_SCALE_WIDTH_3, 
    PICTURE_SCALE_WIDTH_MAX 
} from "@/constants";


interface Props {
    id:string | null;
    className?:string;

    sizes?:string;
    width?:number;
    height?:number;

    alt?:string;
}

function ItemImage({id,className,height,width,sizes,alt}: Props) {
    if(id){
        const imageUrl = `/api/image/${id}`;
        const srcSeet = createSet(id);
        return (
            <img 
                className={className}
                src={imageUrl}                
                srcSet={srcSeet}                
                width={width}
                height={height}
                sizes={sizes? sizes : "250px"}
                alt={alt ? alt : "an item image"}
            />
        )
    }else{
        return(
            <Image 
                className={className}
                src={"/images/noimage.jpg"}
                width={width ? width : 256}
                height={height ? height : 256}
                quality={90}
                sizes={sizes? sizes : "250px"}
                alt={alt ? alt : "without image"}
            />
        )
    }
}

export default ItemImage;


function createSet(id:string){
    const bs = `/api/image/${id}`;
    const sets = 
    bs+`?w=${PICTURE_SCALE_WIDTH_3} ${PICTURE_SCALE_WIDTH_3}w, `+
    bs+`?w=${PICTURE_SCALE_WIDTH_2} ${PICTURE_SCALE_WIDTH_2}w, `+
    bs+`?w=${PICTURE_SCALE_WIDTH_1} ${PICTURE_SCALE_WIDTH_1}w, `+
    bs+`?w=${PICTURE_SCALE_WIDTH_0} ${PICTURE_SCALE_WIDTH_0}w, `+
    bs+` ${PICTURE_SCALE_WIDTH_MAX}w`;    
    return sets;
}
