import { ClerkProvider } from '@clerk/nextjs';
//import RootLayout from '../(root)/layout';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import { dark } from "@clerk/themes";

export const metadata: Metadata = {
    title: 'Threads',
    description: 'A Nextjs 14 Meta Threads Application'
}

//import { Inter } from 'next/font/google';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode; 
}) {
    return (
        <ClerkProvider>
          <html lang='en'>
            <body className={`${inter.className} bg-dark-1`}>  
              {children}
            </body>
          </html>
        </ClerkProvider>
    );
}





















