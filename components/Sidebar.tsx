'use client'
import {collection, query, orderBy } from 'firebase/firestore';
import NewChat from './NewChat';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatRow from './ChatRow';
import { ArrowLeftOnRectangleIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, HomeModernIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';
import { auth, db } from '@/firebase/firebaseConfig';
import signOutFirebase from '@/context/auth/signout';
import userImage from '../public/defaultUser.svg';
import { enterfullscreen, exitFullscreen } from '../app/layout';

function Sidebar() {
  const pathName = usePathname();
    const [isFullscreen, setIsFullscreen] = useState<Boolean>(false);
    const [isHomeScreen, setIsHomeScreen] = useState<Boolean>(true);
    const router = useRouter();
    const [chats, loading, error] = useCollection(
        auth && query(collection(db, 'users', auth?.currentUser!.uid, 'chats'),
        orderBy('createdAt', 'asc') 
    ));

    const onSignOut = async () => {
        const {result, error} = await signOutFirebase();
        if (error) {
            return console.log(error);
        }
        return router.push('/');
    }

    const goToHomePage = () => {
        router.replace('/');
    };

    const pathFunction = () => {
      if (pathName?.includes('chat')) { 
        setIsHomeScreen(false);
      } else {
        setIsHomeScreen(true);
      }
    }

    useEffect(() => {
        pathFunction();
    }, [[], pathName]);

  return (
    <div className='mt-3 p-1 flex flex-col h-screen max-h-screen overflow-hidden '>
      <div className='flex-1 flex flex-col space-x-2 overflow-y-auto '>
        <div>
          <NewChat  />  
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
          <div className='flex flex-col m-5 items-center justify-evenly md:flex-row-reverse md:p-3'>
            { isFullscreen ? (
                <a data-tooltip-id="tooltip" data-tooltip-content="Exit fullscreen" data-tooltip-float className='m-1'>
                  <ArrowsPointingInIcon
                    onClick={() => {exitFullscreen(); setIsFullscreen(false)}}
                    className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
                  />
                </a>
              ) : (
                <a data-tooltip-id="tooltip" data-tooltip-content="Fullscreen" data-tooltip-float className='m-1'>
                  <ArrowsPointingOutIcon
                    onClick={() => {enterfullscreen(); setIsFullscreen(true)}}
                    className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
                  />
                </a>
              )
            }

            <Image 
              src={auth?.currentUser?.photoURL || userImage} 
              alt={'photo'} 
              width={200} height={200} 
              className='h-8 w-8 md:h-14 md:w-14 rounded-full bg-white bg-blend-saturation m-1'
            />

            { isHomeScreen ? (
                <a data-tooltip-id="tooltip" data-tooltip-content="Sign out" data-tooltip-float className='m-1'>
                  <ArrowLeftOnRectangleIcon
                    onClick={() => {onSignOut()}}
                    className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
                  />
                </a>
              ) : (
                <a data-tooltip-id="tooltip" data-tooltip-content="Home" data-tooltip-float className='m-1'>
                  <HomeModernIcon 
                    onClick={() => {goToHomePage(); setIsHomeScreen(true)}}
                    className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
                  />      
                </a>
              )
            }
          </div>
        )}
      <Tooltip id='tooltip' className='text-white font-sans text-xs rounded-full justify-center p-1 text-center bg-white/30 absolute' />
    </div>
  )
};

export default Sidebar;
