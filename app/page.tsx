'use client'
import firebaseApp from "@/src/firebase/firebaseConfig";
import { BoltIcon, CodeBracketSquareIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-[#11A37F] bg-no-repeat bg-center bg-cover place-items-center bg-[url('/chatgptLogo.svg')] justify-center h-screen sm:pt-[10%] overflow-y-hidden overflow-x-clip p-3 text-white">
      <h3 className="text-white justify-between items-center text-center p-3 opacity-80">Hello <span className="font-semibold hover:underline hover:text-[#11A37F] hover:opacity-100">{auth?.currentUser?.displayName || auth?.currentUser?.email}</span></h3>
      <h2 className="text-base opacity-80 md:text-xl font-semibold">Welcome to</h2>
      <h1 className="text-3xl md:text-5xl font-bold my-3">ChatGPT Clone</h1>
      <h6 className="text-sm mx-10 mb-3 text-gray-400/70 font-semibold">Answers from ChatGPT OpenAI:</h6>
      <div className='flex-1 md:flex text-gray-300 text-center h-screen overflow-y-auto overflow-x-clip'>
          <div className='md:space-x-2'>
              <div className="flex flex-col items-center justify-content m-5">
                  <CodeBracketSquareIcon className="h-6 w-6 md:h-10 md:w-10 text-blue-500"/>
              </div>
              <div>
                  <p className="infoText">&quot;JavaScript is a programming language that allows you to create interactive web pages. It is commonly used to add dynamic effects to web pages, such as changing content, displaying multimedia, and creating interfaces with other web-based technologies like AJAX and JSON. It is also used to create dynamic web applications and server-side scripting.&quot;</p>
              </div>
          </div>

          <div className='md:space-x-2'>
              <div className="flex flex-col items-center justify-content m-5">
                  <BoltIcon className="h-6 w-6 md:h-10 md:w-10 text-blue-500"/>
              </div>
              <div>
                  <p className="infoText">&quot;Thunder is the sound that is produced when lightning strikes and creates a rapid expansion of the air. It usually can be heard several miles away and rolls in like a wave.&quot;</p>          
              </div>
          </div>

          <div className='md:space-x-2'>
              <div className="flex flex-col items-center justify-content m-5">
                  <PaperAirplaneIcon className="h-6 w-6 md:h-10 md:w-10 text-blue-500"/>
              </div>
              <div>
                  <p className="infoText">&quot;A plane is a motorized, winged aircraft typically used for passenger or cargo transport, or for other activities such as military or recreational flight. Planes usually have two or four engines and a fixed wing, and they are typically powered by jet fuel.&quot;</p>          
              </div>
          </div>
      </div>
    </div>
  )
}
