import Image from "next/image";
import { 
    AVATAR_SCALE_WIDTH_0,
    AVATAR_SCALE_WIDTH_1,
    AVATAR_SCALE_WIDTH_MAX,
} from "@/constants";


interface Props {
    id:string | null;
    className?:string;

    sizes?:string;
    width?:number;
    height?:number;

    alt?:string;
}

function Avatar({id,className,height,width,sizes,alt}: Props) {
    if(id){
        const imageUrl = `/api/avatar/${id}`;
        const srcSeet = createAvatarSrcSet(id);
        return (
            <img 
                className={className}
                src={imageUrl}
                srcSet={srcSeet}
                width={width}
                height={height}
                sizes={sizes? sizes : "250px"}
                alt={alt ? alt : "avatar"}
            />
        )
    }else{
        return(
            <Image 
                className={className}
                src={"/images/user.png"}
                width={width ? width : 256}
                height={height ? height : 256}
                quality={90}
                sizes={sizes? sizes : "250px"}
                alt={alt ? alt : "without avatar"}
            />
        )
    }
}

export default Avatar;


function createAvatarSrcSet(id:string){
    const bs = `/api/avatar/${id}`;
    const sets = 
    bs+`?w=${AVATAR_SCALE_WIDTH_1} ${AVATAR_SCALE_WIDTH_1}w, `+
    bs+`?w=${AVATAR_SCALE_WIDTH_0} ${AVATAR_SCALE_WIDTH_0}w, `+
    bs+` ${AVATAR_SCALE_WIDTH_MAX}w`;
    return sets;
}
