'use client'
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import ArrowDownCircleIcon from "@heroicons/react/24/solid/ArrowDownCircleIcon";
import { ErrorIcon } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { ArrowUpCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { auth, db } from "@/firebase/firebaseConfig";

type Props = {
    chatId: string;
}

function Chat({chatId}: Props) {
  const [messages, loading, error] = useCollection(auth && query(
    collection(db, "users", auth?.currentUser!.uid, "chats", chatId, "messages"),
    orderBy("createdAt","asc"),
  ));  

  const messagesEnd = useRef<null | HTMLDivElement>(null);
  const messagesStart = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior:"smooth"});
  };
  const scrollToTop = () => {
    messagesStart.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [height, setHeight] = useState(0);
  const heightRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (heightRef?.current?.clientHeight! > 750) {
     setHeight(heightRef?.current?.clientHeight!);
     scrollToBottom(); 
    }
  }, [[], [heightRef]]);

  if (loading) return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <p className="text-white text-2xl text-center mt-20">
        Loading...
      </p>
      <Cog6ToothIcon className="text-white animate-spin h-12 w-12 mx-auto mt-6"/>
    </div>   
  );
  
  if (error) return (
    <div className="flex-1 overflow-y-auto overflow-x-clip">
      <p className="text-white text-2xl text-center mt-20">Error!</p>
      <ErrorIcon className="h-15 w-15 mx-auto mt-6"/>
    </div>   
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <div>
          <div className="text-white text-center mt-10 ">
            <div className="flex mx-auto justify-center mt-6 animate-bounce">
              <p className="my-auto">Ask ChatGPT anything, in any language.</p>
            </div>
            <div className="flex mx-auto justify-center mt-6 animate-bounce">
              <ArrowDownCircleIcon className="h-10 w-10 animate-pulse"/> 
            </div>
          </div>
        </div>
      )}
  
      {!messages?.empty && (
        <div>
          <div 
            ref={heightRef} 
          >
            {height > 750 && (
              <div 
                ref={messagesStart} 
                className="p-1 md:p-3"
              >
                <ArrowDownCircleIcon 
                  onClick={() => scrollToBottom()} 
                  className="cursor-pointer h-6 w-6 md:mx-3 mt-3 animate-bounce text-white opacity-60"/>       
              </div> 
            )}

            { messages?.docs.map((message) => (
              <li key={message.id} className={`flex p-2 md:px-6 ${message.data().user.name === "ChatGPT" && "justify-start"} ${message.data().user.name != "ChatGPT" && "justify-end"}`}>
              <figure className={`relative hover:scale-105 sm:hover:scale-100 md:hover:scale-105 transition duration-1000 ease-in-out rounded-2xl p-6 shadow-xl shadow-slate-900/10 ${message.data().user.name  === "ChatGPT" && "bg-[#11A37F] hover:bg-opacity-90 justify-start"} ${message.data().user.name  != "ChatGPT" && "bg-[#434654] justify-end" } `}>
                
                <blockquote className="relative overflow-auto max-w-[200px] sm:max-w-[400px] lg:max-w-[550px] xl:max-w-[800px]">
                  <div className="tracking-tight w-fit">
                    <Message key={message.id} message={message.data()}/>     
                  </div>
                </blockquote>

                <figcaption className="relative mt-4 flex flex-col items-center justify-between border-t border-slate-100/50 pt-4 space-y-1">
                  <div className={`font-display text-base ${message.data().user.name == "ChatGPT" && "text-white/80"} ${message.data().user.name != "ChatGPT" && "text-white/60"}`}>
                    {message.data().user.name}
                  </div>
                  <Image 
                    src={message.data().user.avatar}
                    alt={''} 
                    width={100} height={100} 
                    className='h-8 w-8 rounded-full bg-white bg-blend-saturation object-contain'
                  />
                </figcaption>
              </figure>
          </li>
            ))}

            {height > 750 && (
              <div 
                ref={messagesEnd} 
                className="p-1 md:p-3"
              >
                <ArrowUpCircleIcon 
                  onClick={() => scrollToTop()} 
                  className="cursor-pointer h-6 w-6 md:mx-3 mt-3 animate-bounce text-white opacity-60"/> 
              </div> 
            )} 
          </div>  
        </div>
      )}
    </div>
  )
};

export default Chat;