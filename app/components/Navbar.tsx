import React from 'react';
import Image from "next/image";
import Link from "next/link";   
import { auth ,signOut,signIn} from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const Navbar = async() => {
  const session=await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className='flex justify-between items-center' >

        <Link href="/">
        <Image src="/logo.png" alt="Logo" width={140} height={30} />
        </Link>
        <div className='flex items-center gap-5 text-black ' >
        {session && session?.user ? (<>
        <Link href="/startup/create">
        <span  className='max-sm:hidden'>Create</span>
        </Link>
        <form action={async()=>{
          "use server";
          await signOut({redirectTo:"/"});
        }} >
          <button type="submit">Log Out</button>
        </form>
        <Link  href={`/user/${session?.user?.id}`}>
        <Avatar className='size-10' >
          <AvatarImage src={session?.user?.image || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'} alt={session?.user?.name  || ""} />
         <AvatarFallback>AV</AvatarFallback>
          </Avatar>
        
        </Link>
        </>):
        
        (
         <form action={async ()=>{
          "use server";
          await signIn('github');
         }}>
         <button type="submit">Login</button>
         </form>
        )}

        </div>
      </nav>
    </header>
  );
}
export default Navbar