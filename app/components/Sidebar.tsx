'use client'
import {collection, query, orderBy } from 'firebase/firestore';
import NewChat from './NewChat';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatRow from './ChatRow';
import { ArrowLeftOnRectangleIcon, HomeIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';
import { auth, db } from '@/src/firebase/firebaseConfig';
import signOutFirebase from '@/src/firebase/auth/signout';
import userImage from '../../public/defaultUser.svg';

function Sidebar() {
    const router = useRouter();
    const [chats, loading, error] = useCollection(
        auth && query(collection(db, 'users', auth?.currentUser!.uid, 'chats'),
        orderBy('createdAt', 'asc') 
    ));

    const onSignOut = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const {result, error} = await signOutFirebase();
        if (error) {
            return console.log(error);
        }
        // else success
        return router.push('/');
    }

    const goToHomePage = () => {
        router.replace('/');
    };

  return (
    <div suppressHydrationWarning className='mt-3 p-1 flex flex-col h-screen max-h-screen overflow-hidden '>
      <div className='flex-1 flex flex-col space-x-2 overflow-y-auto '>
        <div>
          <NewChat/>  
        </div>

        <div className='flex flex-col space-y-2'>
          {loading && (
            <div className='text-white text-center animate-bounce text-base'>
              <p>Loading Chats...</p>
            </div>
          )}  
        </div>

        <div className=' overflow-y-auto'>
          <div>
            {chats?.docs.map(chat => 
                <ChatRow key={chat.id} id={chat.id} />   
              )
            }
          </div>               
        </div>
      </div>
      {auth && ( 
        <div className='flex md:p-2 items-center justify-around  mx-auto overflow-hidden mb-2 min-w-fit'>
          <div className='flex  flex-col items-center align-middle justify-evenly md:flex-row md:space-x-3 lg:space-x-10 p-3 space-y-3'>
            <a data-tooltip-id="tooltip" data-tooltip-content="Home" data-tooltip-float>
              <HomeIcon 
                onClick={() => goToHomePage()}
                className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
              />      
            </a>

            <Image 
              src={auth?.currentUser?.photoURL || userImage} 
              alt={'photo'} 
              width={200} height={200} 
              className='h-8 w-8 md:h-14 md:w-14 rounded-full bg-white bg-blend-saturation'
            />
      
            <a data-tooltip-id="tooltip" data-tooltip-content="Sign out" data-tooltip-float>
              <ArrowLeftOnRectangleIcon
                onClick={onSignOut}
                className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
              />
            </a>
          </div>
          <Tooltip id='tooltip' className='text-white font-sans text-xs rounded-full justify-center p-1 text-center bg-white/30 absolute' />
        </div>
      )}
    </div>
  )
};

export default Sidebar;
