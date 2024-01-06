import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user, loadingUser] = useAuthState(auth)
  return (
    <div style={{height:"100vh"}}>{user ? 'hi user' : 'hi'}</div>
  )
}
