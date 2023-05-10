import { auth, db } from '@/src/firebase/firebaseConfig';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

type Props = {
    id: string;
}

function ChatRow({id}: Props) {
    const pathName = usePathname();
    const router = useRouter();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(
        collection(db,'users', auth?.currentUser!.uid, 'chats', id, 'messages'),
    );

    const pathFunction = () => {
        if (!pathName) return;
        setActive(pathName?.includes(id));
    }

    useEffect(() => {
        pathFunction();
    }, [pathName]);

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', auth?.currentUser!.uid, 'chats', id));
        router.replace('/');
    };

  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center hover:text-white ${active && 'bg-gray-700/50'}`}>
        <ChatBubbleLeftIcon className='h-5 w-7 text-[#11A37F] hover:text-white'/>
        <p className='flex-1 hidden md:inline-flex truncate'>            
            {messages?.docs[messages?.docs.length - 1]?.data().text || 'New chat'}
        </p>
        <TrashIcon onClick={removeChat} className='h-5 w-5 text-gray-700 hover:text-red-700'/>
    </Link>
  )
};

export default ChatRow;
