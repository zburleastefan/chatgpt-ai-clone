import { DocumentData } from "firebase/firestore";

type Props = {
    message: String;
    userName: String;
    uid: String;
};

function Message({message, userName, uid}: Props) {
    // const isChatGPT = message.user.name === "ChatGPT"; 

    return (
        <div className={`flex-col items-center justify-start flex overflow-auto text-start ${userName?.includes("ChatGPT") && "text-white"} ${!userName?.includes("ChatGPT") && "text-white/70"}`}>
            <div className="text-base text-white">
                { userName === "ChatGPT" ? (
                        <>
                            &quot;{message} &quot;
                        </>
                    ) : (
                        <>
                            {message}
                        </>
                    )
                }              
            </div>           
        </div>
    )
};

export default Message;