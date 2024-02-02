import db from '@/lib/db';

import Item from '@/components/item/Item';
import { UserOwner } from '@/lib/types/user';


export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;

  const user = await db.user.currentUser();

  if(user){
    const item = await db.item.findFirst({
      where:{ id:id },
      include:{
        user:{
          select:{
            id:true,
            imageId:true,
            name:true,
            surname:true,
          }
        },
        favorites:{
          where:{
            userId:user.id
          }
        }
      }
    });
    
    if(item){
      const owner = item.user ? item.user.id === user.id : false;
      const favorite = item.favorites.length >= 1;

      const itemOwner: UserOwner | undefined = item.user ?  {
        ...item.user
      } : undefined;

      return (<Item item={item} favorite={favorite} isOwner={owner} userOwner={itemOwner}/>) 
    }
  }else{
    const item = await db.item.findFirst({
      where:{ id:id },
      include:{
        user:{
          select:{
            id:true,
            imageId:true,
            name:true,
            surname:true,
          }
        }
      }
    });
    if(item){
      const itemOwner: UserOwner | undefined = item.user ?  {
        ...item.user
      } : undefined;
      return (<Item item={item} favorite={true} isOwner={true} userOwner={itemOwner}/>) 
    }
  }
  
  return(<ItemNotExist id={id}/>)
}


function ItemNotExist({id}:{id:string}){
  return (
    <div className="m-2 p-2">
      <h2 className='p-1'>Item with id({id}) is not exist</h2>
    </div>
  )
}
