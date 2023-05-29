import ChatPage from "@/components/ChatPage";
import { getServerSideProps } from "@/lib/prismaClient";


const Chat = async () =>  {
    const dbData = await getServerSideProps();

    return (
        <div 
            className="relative bg-[#11A37F] bg-no-repeat bg-center bg-cover object-scale-down place-items-center 
            bg-[url('/chatgptLogo.svg')] h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden"
        >      
            <ChatPage dbData={dbData.props} />
        </div>
    )
}; 

export default Chat;