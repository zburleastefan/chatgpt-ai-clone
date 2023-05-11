'use client'
import { AuthContextProvider } from "@/context/AuthContext"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <AuthContextProvider>
          <div className="flex bg-[#11A37F] flex-1 md:p-2 h-screen max-h-screen bg-no-repeat bg-center bg-cover bg-[url('/chatgptLogo.svg')] ">
            {children}
          </div>
        </AuthContextProvider>
  )
}