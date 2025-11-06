// App.jsx
import React from 'react'
import InteractiveGreetingCard from './components/InteractiveGreetingCard'
import './App.css'

function App() {
  // Data spesifik untuk greeting card ini
  const greetingData = {
    recipientName: "Jessica",
    senderName: "Michael", 
    message: "Untuk Jessica yang cantik... Terima kasih sudah menjadi bagian dari cerita indah hidupku. Semoga kebahagiaan selalu menyertaimu di setiap langkah. Setiap momen bersamamu adalah kenangan yang sangat berharga.",
    photos: [
      "/gambar/potrait1.JPG",
      "/gambar/potrait2.JPG", 
      "/gambar/potrait3.JPG"
    ],
    backgroundColor: "#FFD1DC",
    textColor: "#555",
    musicUrl: null
  }

  return (
    <div className="App">
      <InteractiveGreetingCard {...greetingData} />
    </div>
  )
}

export default App