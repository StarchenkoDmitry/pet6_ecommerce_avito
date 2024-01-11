import Image from 'next/image';

import Navbar from '../components/ui/Navbar';
import ItemView from '@/components/ItemView';

const list = [
  {
    title:"67867867967956789567956795679567969",
    url:"/img/1.jpg",
  },
  {
    title:"67867867967956789567956795679567969 67867867967956789567956795679567969 6786786796795678956795679567956796967867867967956789567956795679567969",
    url:"/img/1.jpg",
  },
  {
    title:"Новый клетчатый пиджак Club of Gents",
    url:"/img/2.jpg",
  },
  {
    title:"Новый клетчатый пиджак Club of Gents Новый клетчатый пиджак Club of Gents Новый клетчатый пиджак Club of Gents",
    url:"/img/3.jpg",
  },
  {
    title:"rand text text text text text text text text text text text text text",
    url:"/img/4.jpg",
  },
  {
    title:"randtextghfgh randtextghfghrandtextghfghrandtextghfgh   randtextghfgh randtextghfgh randtextghfgh randtextghfgh ",
    url:"/img/5.jpg",
  },
  // {
  //   title:"rand text",
  //   url:"/img/6.jpg",
  // },
];

export default function Home() {

  console.log("Render Main page");

  return (
    <div className="border-2 border-blue-200 bg-green-100">
      <Navbar/>

      <span>Main page</span>

      <h2>Рекомендации для вас</h2>

      <div className='flex flex-wrap justify-around bg-lime-200'>
      {
        list.map(i=>(<ItemView key={i.url} title={i.title} url={i.url}/>))
      }
      </div>

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