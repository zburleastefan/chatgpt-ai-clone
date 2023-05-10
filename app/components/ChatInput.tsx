'use client'
import { auth, db } from "@/src/firebase/firebaseConfig";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import chatGptLogo from '../../public/chatgptLogo.svg';
import userImage from '../../public/defaultUser.svg';

type Props = {
    chatId: string;
}

function ChatInput({chatId}: Props) {
    const [placeholdermsg, setPlaceholder] = useState("Ask ChatGPT anything");
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [prompt, setPrompt] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const selectInput = (e: any) => {
        e.target.focus();
    };

    // use swr
    const model = "text-davinci-003";

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;

        let input = prompt.trim();
        while (input[0] == ' ') {
            input.trim();
        }

        if (!input || input ==' ') {
            setPrompt("");
            alert("You entered only white spaces. Please type in a valid message!");
            return;
        }

        // await fetch(`/google.com/${input}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         prompt: input, 
        //     }),     
        // })

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: auth?.currentUser?.uid! || 'ChatGPT',
                name: auth?.currentUser?.displayName! || auth?.currentUser?.email! || 'ChatGPT',
                avatar: auth?.currentUser?.photoURL! || userImage,
            },
        };   

        await addDoc(
            collection(
                db, 
                "users", 
                auth?.currentUser?.uid!, 
                "chats", 
                chatId, 
                "messages"
            ), 
            message,
        );

        // toast notification - loading
        const notification = toast.loading('ChatGPT is thinking...');
        setIsInputDisabled(true);
        setPlaceholder("ChatGPT is thinking...");

        await fetch("/api/askQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: input, 
                chatId, 
                model, 
                auth,
            }),     
        }).then(async () => {
            toast.loading('Clearing thoughts...', { 
                id: notification,
            })
            setPlaceholder("Clearing thoughts...");
            await new Promise(r => setTimeout(r, 10000));

            // toast notification - successful
            toast.success('Success!', { 
                id: notification,
            })
            setPrompt("");   
            setIsInputDisabled(false);
            setPlaceholder("Ask ChatGPT anything");
        })
    };

    return (
        <div className="text-gray-400 text-sm">            
            <form onSubmit={sendMessage} className="p-5 flex justify-evenly space-x-4 md:space-x-10 items-center">
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
    )
}; 

export default ChatInput;