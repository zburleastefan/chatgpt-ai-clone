import Chat from "@/app/components/Chat";
import ChatInput from "@/app/components/ChatInput";

type Props = {
    params: {
        id: string
    }
}

function ChatPage({params: {id}}: Props) {
    return (
        <div className="flex flex-col w-full">
            <Chat chatId={id} />
            <ChatInput chatId={id} />
        </div>
    )
};

export default ChatPage;