import { useState, useEffect } from 'react'
import LoginForm from '../../components/LoginForm'
import InvoiceForm from '../../components/InvoiceForm'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem('session')
    if (session) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (username) => {
    localStorage.setItem('session', username)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('session')
    setIsLoggedIn(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <InvoiceForm onLogout={handleLogout} />
      )}
    </div>
  )
}

