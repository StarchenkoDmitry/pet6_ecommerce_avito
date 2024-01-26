
export async function convertFileToDataURL(file:File):Promise<string>{
    return new Promise((res,rej)=>{
        try {
            const reader = new FileReader();
            reader.onload = (event) => {
                const target = event.target;
                if(!target)return;
                const fileString = target.result;
                res(fileString as string);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            rej(error);
        }        
    });
}
