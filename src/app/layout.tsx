import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
            <div className="w-full bg-white rounded-lg shadow dark:border mt-0 max-w-md p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="space-y-6 p-8">
                {children}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
