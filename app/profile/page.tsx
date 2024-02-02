import Profile from '@/components/profile/Profile';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import db from '@/lib/db';


export default async function Home() {
  const user = await db.user.currentUser();

  if(user){
    return (
      <div className='p-2'>
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
      </div>
    )
  }
  return (
    <div className="p-2 bg-gray-50 rounded-lg">
      <span className='mx-1 text-xl'>Зарегистрируйтесь</span>
    </div>
  )
}
