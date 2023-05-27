import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Nav from '@components/Nav';
import Provider from '@components/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Baseball Tracker',
  description: 'Baseball Matchups Tracker',
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="main"></div>

          <main className="app">
            <Nav />
            {children}
          </main>
          <footer className="z-50 w-full h-6 flex justify-center absolute">
            <div className="text-primary-grey text-sm px-6 text-center">
              Created By Paul Sturtz{' | '}
              <a
                target="_blank"
                href="https://github.com/psturtz"
                className="underline hover:text-primary-white"
              >
                Github
              </a>
              {' | '}
              <a
                target="_blank"
                href="https://www.linkedin.com/in/paulsturtz/"
                className="underline hover:text-primary-white"
              >
                LinkedIn
              </a>
              {' | '}
              <a
                target="_blank"
                href="https://www.termsfeed.com/live/f84ea026-71cd-4e28-a671-eaf88a49393a"
                className="underline hover:text-primary-white"
              >
                Fair Use Disclaimer
              </a>
            </div>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;