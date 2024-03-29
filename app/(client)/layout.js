import { Rubik } from 'next/font/google'
import Sidenav from '@/components/Sidenav'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MessageAlerts from '@/components/MessageAlerts'
import { SidebarProvider } from '@/context/SidebarContext/SidebarProvider'
import { getServerUserDetails } from '../api/auth/actions/auth'


const rubik = Rubik({
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})
export const metadata = {
    title: 'Bidsforce',
    description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
   
    let userRec = await getServerUserDetails()

    return (
        <div className='flex'>
            <SidebarProvider>
                <Sidenav userRec={userRec}/> 
                <div className="flex-[85%]">
                    <div className='w-full h-full '>
                        <Navbar />
                        <div className='p-7 bg-[#F2F4F6] h-full max-h-[90%] overflow-y-auto scrollbar'>
                            {children}
                            <div id="errorMessageAlertMain" className="fixed bottom-[4rem] position-absolute items-center p-4 mb-5 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" style={{ display: 'none' }} role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div id="errorMessageAlertMainContent">
                                    <span className="font-medium">Error!</span> <span>Operation failed.</span>
                                </div>
                            </div>
                        </div>

                        <div id="successMessageAlertMain" className="flex fixed bottom-[4rem] position-absolute items-center p-4 mb-5 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" style={{ display: 'none' }} role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div id="successMessageAlertMainContent">
                                <span className="font-medium">Success!</span> <span>Operation completed successfully.</span>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}
