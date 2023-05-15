"use client"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEvent, useEffect, useRef, useState } from "react";
import React from "react";
import userImage from "../../public/defaultUser.svg";
import Message from "../../components/Message";
import ArrowDownCircleIcon from "@heroicons/react/24/solid/ArrowDownCircleIcon";
import toast from "react-hot-toast";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { auth, realtimeDB } from "@/firebase/firebaseConfig";
import { getDatabase, onValue, ref, set, query, limitToLast, get, orderByChild, orderByValue} from "firebase/database";

function Chat() {
    const [prompt, setPrompt] = React.useState("");
    const [placeholdermsg, setPlaceholder] = React.useState("Ask me anything...");
    const [isInputDisabled, setIsInputDisabled] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const model = "text-davinci-003";

    const selectInput = (e: any) => {
        e.target.focus();
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
    const heightRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (heightRef?.current?.clientHeight! > 750) {
        setHeight(heightRef?.current?.clientHeight!);
        scrollToBottom(); 
        }
    }, [heightRef]);

    const [items , setItems] = useState<string[]>([]); 
    const que = query(ref(realtimeDB, 'users/' + auth?.currentUser?.uid!), limitToLast(10));

    useEffect(() => {

        get(que).then((snapshot) => {
            let realtimeDbData: string[] = [];
            
            snapshot.forEach((childSnapshot) => {
                realtimeDbData.push(childSnapshot.val().userName + ' : ' + childSnapshot.val().text);
            });

            setItems(realtimeDbData);
        })

        // onValue(ref(realtimeDB, 'users/' + auth?.currentUser?.uid!), (snapshot) => {
        //     let realtimeDbData: string[] = [];
        //     snapshot.forEach((childSnapshot) => {
        //     const childData = childSnapshot.val();
        //     realtimeDbData.push(childData.userName + ' : ' + childData.text);
        //     });
        //     setItems(realtimeDbData);
        //     }, {
        //     onlyOnce: true
        // });
    },[isInputDisabled])

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let d = new Date();
        let hr = d.getHours();
        let min = d.getMinutes().toString();
        let sec = d.getSeconds().toString();
        if (sec.length == 1) { sec = `0${sec}`; }
        if (min.length == 1) { min = `0${min}`; }
        let date = d.getDate();
        let year = d.getFullYear();
        const currentDate = year + "" +  d.getDay()  + "" +  date + hr + "" + min + "" + sec;

        if (!prompt) return;

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

        // toast notification - loading
        const notification = toast.loading('ChatGPT is thinking...');
        setIsInputDisabled(true);
        setPlaceholder("ChatGPT is thinking...");

        // send user msg to realtime DB
        await set(ref(realtimeDB, 'users/' + auth?.currentUser?.uid! +`/${currentDate}`), {
            text: userInput,
            createdAt: d.toLocaleString(),
            userId: auth?.currentUser?.uid,
            userEmail: auth?.currentUser?.email,
            userName: auth.currentUser?.displayName || auth.currentUser?.email,
            userAvatar: auth?.currentUser?.photoURL! || userImage,
        }).then(async () => {
            // toast.success('Data from user set succesfully!');
        }).catch((error) => {
            toast.error(error);
        })

        // ChatGPT ask question
        await fetch("/api/askChatGpt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: userInput, 
                model, 
                auth,
            }),     
        }).then(async () => {
            toast.loading('Clearing thoughts...', { 
                id: notification,
            })
            setPlaceholder("Clearing thoughts...");
            
            // toast notification - successful
            toast.success('Success!', { 
                id: notification,
            })
            setIsInputDisabled(false);
            setPlaceholder("Ask me anything...");
            setPrompt("");   
        }).catch((error) => {
            toast.error(error);
        })

        // To Do : google search samples
    };

    return (
        <div 
            className="relative bg-[#11A37F] bg-no-repeat bg-center bg-cover object-scale-down place-items-center 
            bg-[url('/chatgptLogo.svg')] h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden"
        >      
            <section className='grid w-screen h-screen justify-centeritems-center align-middle overflow-y-auto overflow-x-hidden'>

                {items.length <= 0 && (
                    <div>
                    <div className="text-white text-center mt-10 ">
                        <div className="flex mx-auto justify-center mt-6 animate-bounce">
                        <p className="my-auto">Ask ChatGPT anything, in any language.</p>
                        </div>
                        <div className="flex mx-auto justify-center mt-6 animate-bounce cursor-pointer">
                            <ArrowDownCircleIcon onClick={() => scrollToBottom()}  className="h-10 w-10 animate-pulse"/> 
                        </div>
                    </div>
                    </div>
                )}

                {items && (
                    <div>
                        <div  ref={heightRef} >
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

                            {items?.map((message, index) => (
                                <li key={index} className={`flex p-2 md:px-6 ${message.includes("ChatGPT") && "justify-start"} ${!message.includes("ChatGPT") && "justify-end"}`}>
                                    <figure className={`relative rounded-2xl p-6 shadow-xl shadow-slate-900/10 ${message.includes("ChatGPT") && "bg-[#11A37F] justify-start"} ${!message.includes("ChatGPT") && "bg-[#434654] justify-end" } `}>
                                        
                                        <blockquote className="relative overflow-auto max-w-[200px] sm:max-w-[400px] lg:max-w-[550px] xl:max-w-[800px]">
                                        <p className="tracking-tight w-fit text-white">
                                            <Message key={index} message={message}/>     
                                        </p>
                                        </blockquote>

                                        <figcaption className="relative mt-4 flex flex-col items-center justify-between border-t border-slate-100/50 pt-4 space-y-1">
                                        { message.includes("ChatGPT") ? (
                                            <Image 
                                            src={'/favicon.ico'}
                                            alt={''} 
                                            width={100} height={100} 
                                            className='h-8 w-8 rounded-full bg-white bg-blend-saturation object-contain'
                                            />
                                        ) : (
                                            <Image 
                                            src={auth?.currentUser?.photoURL!}
                                            alt={''} 
                                            width={100} height={100} 
                                            className='h-8 w-8 rounded-full bg-white bg-blend-saturation object-contain'
                                        />
                                        )}
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
            </section>

            <div className="text-gray-400 text-sm w-full sticky z-10 top-0 p-1 items-center justify-around">            
                <form onSubmit={sendMessage} className="p-1 flex justify-evenly space-x-4 md:space-x-10 items-center">
                    <input 
                        ref={inputRef}
                        className={`md:px-3 w-3/4 flex-1 align-start items-start rounded-full p-2 text-start justify-start 
                        ${ !prompt && "animate-pulse" } ${ prompt && "animate-none" } bg-slate-300/30
                        disabled:cursor-not-allowed disabled:text-gray-100 text-white text-lg md:text-2xl 
                        focus:outline-none placeholder-[#11A37F]`}
                        disabled={!auth || isInputDisabled}
                        value={prompt} 
                        onChange={e => setPrompt(e.target.value)}
                        onMouseMove={selectInput}
                        onMouseEnter={selectInput}
                        type="text" 
                        id="text"
                        name="text"             
                        placeholder={placeholdermsg} 
                    />

                    <button            
                        className="bg-[#11A37F] hover:opacity-50 items-end text-end align-end justify-end text-white 
                        w-10 h-10 md:w-12 md:h-12 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed font-bold"
                        disabled={!prompt || !auth || prompt == " "} 
                        type="submit"
                    >
                        <PaperAirplaneIcon className="p-2 -rotate-45 items-center text-center align-middle justify-center object-scale-down" />
                    </button>   
                </form>
            </div>
        </div> 
    )
}; 

export default Chat;