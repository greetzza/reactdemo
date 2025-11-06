// App.jsx
import React from 'react'
import InteractiveGreetingCard from './components/InteractiveGreetingCard'
import './App.css'

function App() {
  // Data spesifik untuk greeting card ini
  const greetingData = {
    recipientName: "Majiid",
    senderName: "Dara", 
    message: "Untuk Jessica yang cantik... Terima kasih sudah menjadi bagian dari cerita indah hidupku. Semoga kebahagiaan selalu menyertaimu di setiap langkah. Setiap momen bersamamu adalah kenangan yang sangat berharga.",
    photos: [
      "/gambar/memory1.jpg",
      "/gambar/memory2.jpg",
      "/gambar/memory3.jpg",
      "/gambar/potrait1.JPG",
      "/gambar/potrait2.JPG", 
      "/gambar/potrait3.JPG"
    ],
    backgroundColor: "#FFD1DC",
    textColor: "#555",
    musicUrl: "gambar/kks.mp3"
  }

  return (
    <div className="App">
      <InteractiveGreetingCard {...greetingData} />
    </div>
  )
}

export default App