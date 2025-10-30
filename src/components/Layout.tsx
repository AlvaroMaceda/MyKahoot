import type { JSX } from 'react'

import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps): JSX.Element {

  return (
    <div className='app-layout'>
      <header>
        <h2><a href="/">MyKahoot</a></h2>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <small>© 2025 maceda</small>
      </footer>
    </div>
  )
}

export default Layout
