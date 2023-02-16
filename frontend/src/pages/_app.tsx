import { AuthContextProvider } from '@/context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId='147816423858-7rgu6oldr2414ifd6v0q6ucqu0bft4ie.apps.googleusercontent.com'>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  )
}
