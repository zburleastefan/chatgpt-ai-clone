'use client'
import Message from "./Message";
import ArrowDownCircleIcon from "@heroicons/react/24/solid/ArrowDownCircleIcon";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "@/context/AuthContext";
import React from "react";
import { ArrowUpCircleIcon, HomeModernIcon, PaperAirplaneIcon, RssIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { rapidApiGPT } from "@/lib/rapidApiGPT";

type Props = {
    dbData: {
        posts : [],
    },
}

function ChatPage({dbData}: Props) {
    const router = useRouter();
    const path = usePathname();
    const [prompt, setPrompt] = React.useState<string>('');
    const [placeholdermsg, setPlaceholderMsg] = React.useState<string | null>("Ask me anything...");
    const [isInputDisabled, setIsInputDisabled] = React.useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const model = "text-davinci-003";
     
    const selectInput = (e: { target: { focus: () => void; }; }) => {
        e.target.focus();
    };
 
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 
        if (!prompt) return;
        const notification = toast.loading('ChatGPT is thinking...');
        setIsInputDisabled(true);
        setPlaceholderMsg("ChatGPT is thinking...");

        let userInput = prompt.trim();
        while (userInput[0] == ' ') {
            userInput = userInput.trim();
        }

        if (!userInput || userInput ==' ') {
            toast.error("You entered only white spaces. Please type in a valid message!");
            setPrompt("");
            return;
        }
        setPrompt("");   

        // Posting user message to database
        await fetch("/api/dbPosts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorId: authContext?.currentUser?.uid!,
                email: authContext?.currentUser?.email,
                avatar: authContext?.currentUser?.photoURL || '/defaultUser.svg',
                prompt: userInput, 
                name : authContext?.currentUser?.displayName || authContext?.currentUser?.email,
                model: model,
            }),     
        }).then(async () => {
            router.refresh();
            toast.success('Posting user input to database...', { 
                id: notification,})
            setPlaceholderMsg("Posting user input to database...");
            toast.loading('Asking Gpt...', { 
                id: notification,})
            setPlaceholderMsg("Asking Gpt...");
        }).catch((error) => {
            toast.error(error);
        })
        
         // asking GPT 
         const gptResponse = await rapidApiGPT(userInput).then(async (response) => {
            console.log( JSON.stringify(response.choices[0].text));
            toast.success('GPT message arrived...', { 
                id: notification,});
            setPlaceholderMsg("GPT message arrived...");
            return JSON.stringify(response.choices[0].text);
        }).catch((error) => {
            toast.error(error);
        })

        // // asking GPT 
        // const gptResponse = await fetch("/api/askGPT", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         prompt: userInput, 
        //         model: model,
        //     }),     
        // }).then(async (response) => {
        //     const json = await response.json();
        //     toast.success('GPT message arrived...', { 
        //         id: notification,});
        //     setPlaceholderMsg("GPT message arrived...");
        //     return json.answer;
        // }).catch((error) => {
        //     toast.error(error);
        // })
        
        //posting Gpt message to database
        await fetch("/api/dbPosts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorId: authContext?.currentUser?.uid!,
                email: 'https://openai.com/',
                avatar: "/favicon.ico",
                prompt: gptResponse, 
                name : "ChatGPT",
                model: model,
            }),     
        }).then(() => {
            toast.success('Posting GPT message to database...', { 
                id: notification,})
            setPlaceholderMsg("Posting GPT response to database...");
        }).catch((error) => {
            toast.error(error);
        })
        toast.loading('Clearing thoughts...', { 
            id: notification,})
        setPlaceholderMsg("Clearing thoughts...");
        toast.success('Success!', { 
            id: notification,})
        setPlaceholderMsg("Ask me anything...");
        setIsInputDisabled(false);
        setPrompt("");   
        router.refresh();
    };

    const messagesEnd = useRef<null | HTMLDivElement>(null);
    const messagesStart = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEnd.current?.scrollIntoView({ behavior:"smooth"});
    };
    const scrollToTop = () => {
        messagesStart.current?.scrollIntoView({ behavior: "smooth" });
    };
    const [height, setHeight] = useState(0);
    const heightRef = useRef<HTMLDivElement>(null);
    const screenHeight= () => {
        if (heightRef?.current?.clientHeight) {
            setHeight(heightRef.current.clientHeight);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 1);
    }, []);

    useEffect(() => {
        screenHeight(); 
        scrollToBottom(); 
    }, [[]]);

return (
    <>
        <section className='grid w-screen h-screen justify-centeritems-center align-middle overflow-y-auto overflow-x-hidden'>
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                { dbData?.posts?.length < 1 && (
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

                { dbData?.posts?.length > 0 && (
                    <div>
                        <div ref={heightRef} className="mx-2 md:mx-8">
                            {height > 750 && (
                            <div ref={messagesStart} className="p-1 md:p-3">
                                <ArrowDownCircleIcon 
                                    onClick={() => scrollToBottom()} 
                                    className="cursor-pointer h-6 w-6 md:mx-3 mt-3 animate-bounce text-white opacity-60"
                                />       
                            </div> 
                            )}

                            { dbData?.posts?.map((message: any) => (
                                path?.includes(message.authorId) && (
                                    <li key={message.id} className={`flex p-2 md:px-6 ${message.name == "ChatGPT" && "justify-start"} ${message.name != "ChatGPT" && "justify-end"}`}>
                                        <figure className={`relative rounded-2xl p-6 shadow-xl shadow-[#434654]/70 ${message.name  == "ChatGPT" && "bg-[#11A37F] shadow-[#11A37F]/70 justify-start md:hover:scale-105 transition duration-1000 ease-in-out"} ${message.name  != "ChatGPT" && "bg-[#434654] justify-end" } `}>
                                        
                                        <blockquote className="relative overflow-auto max-w-[200px] sm:max-w-[400px] lg:max-w-[550px] xl:max-w-[800px]">
                                            <div className="tracking-tight w-fit">
                                                <Message key={message.id} message={message.content} userName={message.name} uid={message.authorId}/>     
                                            </div>
                                        </blockquote>
            
                                        <figcaption className="relative mt-4 flex flex-col items-center justify-between border-t border-slate-100/50 pt-4 space-y-1">
                                            <div className={`font-display text-base ${message.name == "ChatGPT" && "text-white/80"} ${message.name != "ChatGPT" && "text-white/60"}`}>
                                                {message.name}
                                            </div>
                                            <Image 
                                                src={message.avatar}
                                                alt={''} 
                                                width={100} height={100} 
                                                className='h-8 w-8 rounded-full bg-white bg-blend-saturation object-contain'
                                            />
                                        </figcaption> 
                                        </figure>
                                    </li>
                                )
                            ))}

                            {height > 750 && (
                                <div ref={messagesEnd} className="p-1 md:p-3">
                                    <ArrowUpCircleIcon 
                                        onClick={() => scrollToTop()} 
                                        className="cursor-pointer h-6 w-6 md:mx-3 mt-3 animate-bounce text-white opacity-60"
                                    /> 
                                </div> 
                            )} 
                        </div>
                    </div>
                )}
            </div>
        </section>
        <div className={`text-gray-400 text-sm w-full rounded-full`}>            
            <form onSubmit={sendMessage} className="p-2 flex justify-evenly items-center">
                <Link href={'/'} data-tooltip-id="tooltip" data-tooltip-content="Home" data-tooltip-place='bottom' className='tooltip text-white'>
                    <HomeModernIcon 
                        className='w-10 h-10 md:w-12 md:h-12 text-white cursor-pointer hover:text-[#11A37F]'
                    />     
                </Link>
                <input 
                    ref={inputRef}
                    className={`md:px-3 w-3/4  align-start items-start rounded-full p-2 text-start justify-start 
                    ${ !prompt && "animate-pulse" } ${ prompt && "animate-none" } bg-slate-300/30
                    disabled:cursor-not-allowed disabled:text-gray-100 text-white text-lg md:text-2xl 
                    focus:outline-none placeholder-[#11A37F]`}
                    disabled={!authContext || isInputDisabled}
                    value={prompt} 
                    onChange={e => setPrompt(e.target.value)}
                    onMouseMove={e => selectInput}
                    onMouseEnter={e => selectInput}
                    type="text" 
                    id="text"
                    name="text"             
                    placeholder={placeholdermsg!} 
                />

                <button            
                    className="bg-[#11A37F] hover:opacity-50 items-end text-end align-end justify-end text-white 
                    w-10 h-10 md:w-12 md:h-12 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed font-bold"
                    disabled={!prompt || !authContext || prompt == " "} 
                    type="submit"
                >
                    <PaperAirplaneIcon className="p-2 -rotate-45 items-center text-center align-middle justify-center object-scale-down" />
                </button>   
            </form>
        </div>
    </>
  )
};

export default ChatPage;