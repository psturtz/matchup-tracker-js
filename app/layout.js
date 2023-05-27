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
          <div className="main">
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;