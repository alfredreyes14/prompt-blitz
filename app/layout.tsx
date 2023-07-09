import '@styles/globals.css'
import NavBar from '@components/NavBar'

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
      <div className="main">
        <div className="gradient"></div>
      </div>

      <main className="app">
        <NavBar />
        { children }
      </main>
    </body>
    </html>
  )
}

export default RootLayout