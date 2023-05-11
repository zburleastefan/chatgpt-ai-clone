'use client'
import { auth, db } from '@/firebase/firebaseConfig';
import { PlusIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React from 'react';


function NewChat() {
  const router = useRouter();

  const createNewChat = async() => {
    const doc = await addDoc(
      collection(db, 'users', auth?.currentUser!.uid, 'chats'), {
        userId: auth?.currentUser?.uid!,
        email: auth?.currentUser?.email!,
        createdAt: serverTimestamp()
      }
    );
    router.replace(`/chat/${doc.id}`);
  };

  return (
    <div onClick={createNewChat} className=' border-blue-700 border chatRow p-1 md:p-2'>
        <PlusIcon className='h-4 w-4 md:h-6 md:w-6 text-[#11A37F] hover:text-red-700'/>
        <div>New Chat</div>
    </div>
  )
};

export default NewChat;