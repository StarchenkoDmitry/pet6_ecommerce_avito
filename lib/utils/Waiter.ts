export async function Wait(time:number = 1500) {
    return new Promise((res,_)=>{
        setTimeout(res,time);
    })
}
