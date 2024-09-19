import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {console.log(import.meta.env.VITE_APPWRITE_URL)}
     <h1>hello world</h1>
    </>
  )
}

export default App
