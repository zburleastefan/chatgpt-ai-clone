'use client'
import './globals.css';
import { AuthContextProvider } from '../src/context/AuthContext';
import ClientProvider from './components/ClientProvider';
import Sidebar from './components/Sidebar';
import Head from './head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head/>
      <body>
        <AuthContextProvider>
          <div className='flex overflow-hidden h-screen max-h-screen'>
            {/* Sidebar */}
            <div className='bg-[#202123] min-w-[100px] w-[100px] md:w-[220px] lg:w-[320px] overflow-y-hidden h-screen'>
              <Sidebar/>
            </div>
            
            {children}

            {/* Notification */} 
            <ClientProvider/>

          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
