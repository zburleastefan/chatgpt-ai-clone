import { DocumentData } from "firebase/firestore";

type Props = {
    message: DocumentData;
};

function Message({message}: Props) {
    const isChatGPT = message.user.name === "ChatGPT"; 

    return (
        <div className={`flex-col items-center justify-start flex overflow-auto text-start ${isChatGPT && "text-white"} ${!isChatGPT && "text-white/70"}`}>
            <div className="text-base">
                { isChatGPT ? (
                    <>
                        &quot;{message.text} &quot;
                    </>
                ) : (
                    <>
                        {message.text}
                    </>
                )}
            </div>           
        </div>
    )
};

export default Message;