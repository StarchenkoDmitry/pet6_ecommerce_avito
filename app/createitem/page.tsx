import Image from 'next/image';

import Navbar from '@/components/ui/Navbar';
import ItemBuilder from '@/components/item/ItemBuilder';


export default async function Home() {
  console.log("Render CreateItem page");

  return (
    <div className="border-2 border-blue-200 bg-green-100">
      <Navbar/>
      <div className='m-1 p-1 flex flex-col'>
        <h2 className='m-1'>Create an announcement</h2>
        <ItemBuilder/>
      </div>
    </div>
  )
}
