import Profile from '@/components/profile/Profile';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { auth } from '@/config/authConfig';
import db from '@/lib/db';


export default async function Home() {
  console.log("Render Profile page");

  const user = await db.user.currentUser();

  if(user){
    return (
      <>
        <h2>Profile page</h2>
        <Breadcrumbs breadcrumbs={[
          {
            href:"/profile",
            label:"Profile"
          },
          {
            href:"/user",
            label:"User"
          }
        ]}/>
        <div className="p-2 bg-gray-50 rounded-lg">
          <Profile user={user}/>
        </div>
      </>
    )
  }
  return (
    <div className="p-2 bg-gray-50 rounded-lg">
      <span className='mx-1 text-xl'>Зарегистрируйтесь</span>
    </div>
  )
}











// export default async function Home() {
//   console.log("Render Main page");

//   const session = await auth();


//   if(session){
//     const user = await db.user.findFirst({ where:{ id:session.user.userId }});
//     if(user){
//       return (
//         <div className="p-2 bg-gray-50 rounded-lg">
//           <span>Profile page</span>
//           <Profile user={user}/>
//         </div>
//       )
//     }
//   }
//   return (
//     <div className="p-2 bg-gray-50 rounded-lg">
//       <span className='mx-1 text-xl'>Зарегистрируйтесь</span>
//     </div>
//   )
// }
