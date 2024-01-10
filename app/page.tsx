import Image from 'next/image';
import Navbar from '../components/ui/Navbar';
import { Button } from '@mui/material';


export default function Home() {

  console.log("Render Main page");

  return (
    <div className="border-4 border-blue-200">
      <Navbar/>
      <span>Main page</span>
    </div>
  )
}


{/* <div className='p-2 flex'>
<input 
  className='bg-slate-300'
  type="text" 
  name="" 
  id=""
/>
</div> */}

{/* <Image
className=""
src="/next.svg"
alt="Next.js Logo"
width={180}
height={37}
priority
/> */}