import { ArrowLeftCircleIcon, ArrowLeftOnRectangleIcon, HomeModernIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';
import userImage from '../public/defaultUser.svg';
import { auth } from '@/firebase/firebaseConfig';
import signOutFirebase from '@/context/auth/signout';
import SquigglyLines from './SquigglyLines';

type Props = {}

function Header({}: Props) {
    const pathName = usePathname();
  return (
    <header className="flex flex-row  bg-black bg-no-repeat place-items-center sticky z-10 top-0 p-1 items-center justify-around">
        { pathName?.match('/chat') ? (
            <Link href={'/'} data-tooltip-id="tooltip" data-tooltip-content="Home" data-tooltip-place='bottom' className='tooltip text-white'>
                <HomeModernIcon 
                    className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
                />     
            </Link>
        ) : ( 
            <button onClick={() => signOutFirebase()} data-tooltip-id="tooltip" data-tooltip-content="Sign out"  data-tooltip-place='bottom' className='tooltip text-white'>
                <ArrowLeftOnRectangleIcon 
                    className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
                />     
            </button>
        )}

        <h1 className="text-3xl font-display font-serif md:text-5xl font-bold tracking-normal text-white/90 ">
            ChatGPT{" "}
            <span className="relative whitespace-nowrap text-[#3290EE]">
                <SquigglyLines />
                <span className="relative">Clone</span>
            </span>
        </h1>

        <Image 
            src={auth?.currentUser?.photoURL || userImage} 
            alt={'photo'} 
            width={200} height={200} 
            className='h-8 w-8 md:h-14 md:w-14 rounded-full bg-white bg-blend-saturation m-1'
        />
        <Tooltip anchorSelect=".tooltip" id='tooltip' className='text-white font-sans text-xs rounded-full justify-center p-1 text-center bg-white/30 absolute'/>
    </header>
  )
}

export default Header