import '@styles/globals.css'
import NavBar from '@components/NavBar'
import Provider from '@components/Provider'
import { AppProvider } from '@context/AppProvider'

interface PropsInterface {
  children: React.ReactNode
}

export const metadata = {
  title: 'Promptopia Clone',
  description: 'Promptopia Clone'
}

const RootLayout = ({ children }: PropsInterface): React.ReactNode => {
  return (
    <html lang="en">
    <body>
      <Provider>
        <AppProvider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <NavBar />
            { children }
          </main>
        </AppProvider>
      </Provider>
    </body>
    </html>
  )
}

export default RootLayout