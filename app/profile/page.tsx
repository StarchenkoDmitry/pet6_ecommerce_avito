import Profile from '@/components/profile/Profile';
import { auth } from '@/config/authConfig';
import db from '@/lib/db';
// import { useState } from 'react';



export default async function Home() {
  console.log("Render Main page");

  const session = await auth();


  if(session){
    const user = await db.user.findFirst({ where:{ id:session.user.userId }});
    if(user){
      return (
        <div className="p-2 bg-gray-50 rounded-lg">
          <span>Profile page</span>
          <Profile user={user}/>
        </div>
      )
    }
  }
  return (
    <div className="p-2 bg-gray-50 rounded-lg">
      <span className='mx-1 text-xl'>Зарегистрируйтесь</span>
    </div>
  )
}
