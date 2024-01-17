import Image from 'next/image';

import ItemView from '@/components/ItemView';
import { auth } from '@/config/authConfig';
import Navbar from '@/components/ui/Navbar';
// import { testSubmit } from '@/lib/actions/item';
import ItemBuilder from '@/components/item/ItemBuilder';


export default async function Home() {
  console.log("Render CreateItem page");

  // const createAccount = async (formData: FormData) => {
  //   "use server";

  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   // Validate the form data and save it to the database

  //   console.log({ name, email, password });
  // };

  return (
    <div className="border-2 border-blue-200 bg-green-100">
      <Navbar/>

      <div className='m-1 p-1 flex flex-col'>
        <h2 className='m-1'>Create an announcement</h2>

        {/* <form action={testSubmit}>

          <label className='m-1 text-black' htmlFor="">Lable</label>
          <input
            className='m-1 p-1 rounded-md placeholder-gray-600'
            name='lable'
            type="text"
            placeholder='write a title'/>
          <input 
            className='m-1 p-1'
            name="file"
            type="file" 
            // id="avatar"
            // accept="image/png, image/jpeg" 
          />
          <input 
            className='m-1 p-1'
            name="price"
            type="number"
          />
          <button type="submit">SEND</button>
        
        </form> */}

        <ItemBuilder/>
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



// const list = [
//   {
//     title:"67867867967956789567956795679567969",
//     url:"/img/1.jpg",
//   },
//   {
//     title:"67867867967956789567956795679567969 67867867967956789567956795679567969 6786786796795678956795679567956796967867867967956789567956795679567969",
//     url:"/img/1.jpg",
//   },
//   {
//     title:"Новый клетчатый пиджак Club of Gents",
//     url:"/img/2.jpg",
//   },
//   {
//     title:"Новый клетчатый пиджак Club of Gents Новый клетчатый пиджак Club of Gents Новый клетчатый пиджак Club of Gents",
//     url:"/img/3.jpg",
//   },
//   {
//     title:"rand text text text text text text text text text text text text text",
//     url:"/img/4.jpg",
//   },
//   {
//     title:"randtextghfgh randtextghfghrandtextghfghrandtextghfgh   randtextghfgh randtextghfgh randtextghfgh randtextghfgh ",
//     url:"/img/5.jpg",
//   },
//   // {
//   //   title:"rand text",
//   //   url:"/img/6.jpg",
//   // },
// ];