'use client'
import './globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import Notification from '../components/Notification';
import Head from './head';
import React from 'react';
import Header from '@/components/Header';

export default function RootLayout({ 
  children,
}:{
  children: React.ReactNode,
}){
  return (
    <html lang="en" suppressHydrationWarning >
      <Head/>
      <body>
        <AuthContextProvider>
          <div className='flex flex-col overflow-hidden h-screen max-h-screen'>
            <Header/>

            {children}

            <Notification/>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}