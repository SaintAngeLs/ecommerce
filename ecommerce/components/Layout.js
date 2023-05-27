import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const {data: session} = useSession();
  if(!session)
  {
    return (
      <div className="bg-blue-900 w-screen h-screen flex justify-between items-center">
        <div className='text-center w-full'>
          <button onClick = {() => {signIn('google')}} className='bg-white p-2 rounded-lg'>Login with google</button>
        </div>
      {/* <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-6 h-6"/>
        <span className="px-2">
          {session?.user?.name}
        </span>
        </div> */}
      </div>
    )
  }
  return (
    <div className='bg-blue-900 min-h-screen flex'>
      <Navbar/>
      <div className="bg-white flex-grow p-5 mt-1 mb-1 mr-1 rounded-lg">{children}</div>
    </div>
    
  );
 
  
  
}


