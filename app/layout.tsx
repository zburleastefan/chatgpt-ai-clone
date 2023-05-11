'use client'
import './globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import Notification from '../components/Notification';
import Sidebar from '../components/Sidebar';
import Head from './head';
import React from 'react';

export default function RootLayout({
  children,
}:{
  children: React.ReactNode,
}){
  return (
    <html lang="en" suppressHydrationWarning >
      <Head/>
      <body id="bodyElem">
        <AuthContextProvider>
          <div className='flex overflow-hidden h-screen max-h-screen'>

            <div className='bg-[#202123] min-w-[100px] w-[100px] md:w-[220px] lg:w-[320px] overflow-y-hidden h-screen'>
              <Sidebar/>
            </div>
            
            {children}

            <Notification/>

          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}

if (typeof window != "undefined") {
  var fullscreenButton = document.getElementById("bodyElem");  
}

export const enterfullscreen = () =>
{
  if (fullscreenButton?.requestFullscreen) {
    fullscreenButton?.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } 
}

export const exitFullscreen = () =>
{
  if (fullscreenButton?.requestFullscreen) {
    document.exitFullscreen().catch(err => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  }
}