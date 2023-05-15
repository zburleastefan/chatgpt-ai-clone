import { DocumentData } from "firebase/firestore";

type Props = {
    message: String;
};

function Message({message}: Props) {
    // const isChatGPT = message.user.name === "ChatGPT"; 

    return (
        <div className={`flex-col items-center justify-start flex overflow-auto text-start`}>
            <div className="text-base">
               
                        {message}
                  
            </div>           
        </div>
    )
};

export default Message;