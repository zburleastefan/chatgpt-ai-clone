'use client'
import firebaseApp from "@/firebase/firebaseConfig";
import { BoltIcon, CodeBracketSquareIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { getAuth } from "firebase/auth";
import Link from "next/link";

const auth = getAuth(firebaseApp);

export default function Home() {
  return (
    <div 
        className="relative bg-[#11A37F] bg-no-repeat bg-center bg-cover object-scale-down place-items-center 
        bg-[url('/chatgptLogo.svg')] h-screen  flex flex-col items-center justify-center text-center overflow-hidden"
    >      
        <section className='grid align-middle overflow-y-hidden text-center overflow-x-hidden justify-center'>
            <h3 className="text-white m-1 opacity-80">Hello <span className="font-semibold hover:underline hover:text-[#11A37F] hover:opacity-100">{auth?.currentUser?.displayName || auth?.currentUser?.email}</span></h3>
            <Link href={'/chat'} className="text-white mb-5 hover:scale-105 hover:shadow-lg hover:shadow-red-700 md:m-10 md:text-2xl p-1 m-2 border border-t rounded-full transition duration-700">
                Chat with <span className="font-serif">ChatGPT 3.5</span>
            </Link>
            <h6 className="text-sm mx-10 mb-2 text-gray-400/70 font-semibold">Answers from ChatGPT OpenAI:</h6>
            <div className='flex-1 md:flex text-gray-300 text-center mb-2 overflow-y-auto overflow-x-hidden justify-center items-center'>
                <div className='md:space-x-2 '>
                    <div className="flex flex-col items-center justify-content m-5">
                        <CodeBracketSquareIcon className="h-6 w-6 md:h-10 md:w-10 text-blue-500"/>
                    </div>
                    <div className="flex flex-col items-center justify-content">
                        <p className="infoText">&quot;JavaScript is a programming language that allows you to create interactive web pages. It is commonly used to add dynamic effects to web pages, such as changing content, displaying multimedia, and creating interfaces with other web-based technologies like AJAX and JSON. It is also used to create dynamic web applications and server-side scripting.&quot;</p>
                    </div>
                </div>

                <div className='md:space-x-2'>
                    <div className="flex flex-col items-center justify-content m-5">
                        <BoltIcon className="h-6 w-6 md:h-10 md:w-10 text-blue-500"/>
                    </div>
                    <div className="flex flex-col items-center justify-content">
                        <p className="infoText">&quot;Thunder is the sound that is produced when lightning strikes and creates a rapid expansion of the air. It usually can be heard several miles away and rolls in like a wave.&quot;</p>          
                    </div>
                </div>

                <div className='md:space-x-2'>
                    <div className="flex flex-col items-center justify-content m-5">
                        <PaperAirplaneIcon className="h-6 w-6 md:h-10 md:w-10 text-blue-500"/>
                    </div>
                    <div className="flex flex-col items-center justify-content">
                        <p className="infoText">&quot;A plane is a motorized, winged aircraft typically used for passenger or cargo transport, or for other activities such as military or recreational flight. Planes usually have two or four engines and a fixed wing, and they are typically powered by jet fuel.&quot;</p>          
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
