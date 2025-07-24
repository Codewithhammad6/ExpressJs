import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react";
const clerkPubKey='pk_test_c2VsZWN0LXdhaG9vLTgzLmNsZXJrLmFjY291bnRzLmRldiQ'

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <App />
  </ClerkProvider>
)
