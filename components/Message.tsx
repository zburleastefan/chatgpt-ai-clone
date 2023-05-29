type Props = {
    message: String;
    userName: String;
    uid: String;
};

function Message({message, userName, uid}: Props) {
    let gptMessage = message;
    if (message[0] == '\n') {
        gptMessage = message.replace(/\n/, "");
        if (gptMessage[0] == '\n') {
            gptMessage = gptMessage.replace(/\n/, "");
        }
    }
    return (
        <div className={`flex-col items-center justify-start flex overflow-auto text-start ${userName?.includes("ChatGPT") && "text-white"} ${!userName?.includes("ChatGPT") && "text-white/70"}`}>
            <div className="text-base text-white">
                { userName === "ChatGPT" ? (
                        <div className="new-line">
                            {gptMessage}
                        </div>
                    ) : (
                        <div>
                            {message}
                        </div>
                    )
                }              
            </div>           
        </div>
    )
};

export default Message;