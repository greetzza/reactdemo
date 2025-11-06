import React, { useState, useEffect, useRef } from 'react'
import './InteractiveGreetingCard.css'

const InteractiveGreetingCard = ({ 
  recipientName = "Sahabat Terbaik",
  senderName = "Flomma Flower",
  message = "Terima kasih sudah menjadi bagian dari cerita indah hidupku. Semoga kebahagiaan selalu menyertaimu di setiap langkah.",
  photos = [],
  backgroundColor = "#FFD1DC",
  textColor = "#555",
  musicUrl = null
}) => {
  const [step, setStep] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const mailboxRef = useRef(null)
  const letterRef = useRef(null)

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const steps = [
    "Klik kotak pos",
    "Tarik surat", 
    "Baca pesan"
  ]

  // Handle mailbox click
  const handleMailboxClick = () => {
    if (step === 0) {
      setStep(1)
      setTimeout(() => setStep(2), 800)
    }
  }

  // Simple drag handler - langsung buka ketika di-click/tap
  const handleLetterClick = () => {
    if (step === 2) {
      setStep(3)
      setTimeout(() => {
        setStep(4)
        setShowContent(true)
      }, 500)
    }
  }

  // Reset function
  const resetAnimation = () => {
    setStep(0)
    setShowContent(false)
    setCurrentPhotoIndex(0)
  }

  // Auto-play photos
  useEffect(() => {
    if (step === 4 && photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex(prev => (prev + 1) % photos.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [step, photos.length])

  // Debug log
  useEffect(() => {
    console.log('Current step:', step, 'Show content:', showContent)
  }, [step, showContent])

  return (
    <div className="interactive-greeting-card" style={{ backgroundColor }}>
      {/* Background Music */}
      {musicUrl && step === 4 && (
        <audio autoPlay loop>
          <source src={musicUrl} type="audio/mpeg" />
        </audio>
      )}

      {/* Progress Steps */}
      {isMobile ? (
        <div className="mobile-progress-steps">
          {steps.map((text, index) => (
            <div key={index} className={`mobile-step ${step > index ? 'completed' : ''} ${step === index ? 'current' : ''}`}>
              <div className="mobile-step-dot"></div>
              <span className="mobile-step-text">{text}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="progress-steps">
          {steps.map((text, index) => (
            <div key={index} className={`step-indicator ${step > index ? 'completed' : ''} ${step === index ? 'current' : ''}`}>
              <div className="step-number">{index + 1}</div>
              <span className="step-text">{text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className={`content-area ${isMobile ? 'mobile-content' : ''}`}>
        {/* Mailbox Container */}
        <div 
          className={`mailbox-container ${step >= 1 ? 'mailbox-open' : ''} ${isMobile ? 'mobile-mailbox' : ''}`}
          onClick={handleMailboxClick}
        >
          {/* Mailbox */}
          <div className={`mailbox ${isMobile ? 'mobile-mailbox-size' : ''}`} ref={mailboxRef}>
            <div className="mailbox-body">
              <div className="mailbox-door">
                <div className="mailbox-handle"></div>
                <div className="mailbox-slot"></div>
              </div>
              <div className="mailbox-base"></div>
              <div className="mailbox-flag">
                <div className={`flag ${step >= 1 ? 'flag-up' : ''}`}></div>
              </div>
            </div>

            {/* Letter - Simple click to open */}
            <div 
              className={`letter ${step >= 2 ? 'letter-visible' : ''} ${step >= 3 ? 'letter-pulled' : ''} ${isMobile ? 'mobile-letter' : ''}`}
              ref={letterRef}
              onClick={handleLetterClick}
              style={{ cursor: step === 2 ? 'pointer' : 'default' }}
            >
              <div className="letter-envelope">
                <div className="envelope-flap"></div>
                <div className="envelope-body"></div>
                <div className="stamp">💌</div>
              </div>
              
              {/* Click Instruction */}
              {step === 2 && (
                <div className="click-handle">
                  <div className="click-icon">📨</div>
                  <div className="click-text">Klik suratnya!</div>
                </div>
              )}
            </div>
          </div>

          {/* Instruction */}
          {step === 2 && (
            <div className={`pull-instruction ${isMobile ? 'mobile-pull-instruction' : ''}`}>
              <div className="hand-icon">👆</div>
              <p>{isMobile ? "Ketuk suratnya" : "Klik suratnya untuk dibuka"}</p>
            </div>
          )}
        </div>

        {/* Click Instruction for First Step */}
        {step === 0 && (
          <div className={`click-instruction ${isMobile ? 'mobile-click-instruction' : ''}`}>
            <div className="pulse-circle"></div>
            <p>{isMobile ? "Ketuk kotak pos" : "Klik kotak pos untuk mulai"}</p>
          </div>
        )}
      </div>
 
{/* Letter Content */}
{showContent && (
  <div 
    className="letter-content-overlay content-visible"
    onClick={() => setShowContent(false)}
  >
    <div 
      className={`letter-content ${isMobile ? 'mobile-letter-content' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="letter-paper">
        <button className="close-button" onClick={() => setShowContent(false)}>
          <i className="fas fa-times"></i>
        </button>

        <div className="letter-scrollable-content">
          <div className="letter-header">
            <h2 className="recipient-name" style={{ color: textColor }}>
              Untuk {recipientName}
            </h2>
            <div className="heart-divider">💖</div>
          </div>

          <div className="letter-message">
            <div className="message-content">
              <p style={{ color: textColor }}>{message}</p>
            </div>
          </div>

          {/* Photo Gallery */}
          {photos.length > 0 && (
            <div className="photo-gallery">
              <div className="photos-container-portrait">
                {photos.map((photo, index) => (
                  <div 
                    key={index}
                    className={`photo-frame-portrait ${index === currentPhotoIndex ? 'active' : ''}`}
                  >
                    <img src={photo} alt={`Memory ${index + 1}`} />
                    <div className="photo-overlay-portrait"></div>
                    <div className="photo-number">{index + 1}</div>
                  </div>
                ))}
              </div>
              {photos.length > 1 && (
                <div className="photo-dots-portrait">
                  {photos.map((_, index) => (
                    <div 
                      key={index}
                      className={`dot-portrait ${index === currentPhotoIndex ? 'active' : ''}`}
                      onClick={() => setCurrentPhotoIndex(index)}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="letter-footer">
            <p className="sender-name" style={{ color: textColor }}>
              Dengan cinta,<br />
              <strong>{senderName}</strong>
            </p>
            <div className="seal">✨</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)} 

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-heart">💖</div>
        <div className="floating-flower">🌷</div>
        <div className="floating-sparkle">✨</div>
        <div className="floating-star">⭐</div>
      </div>

      {/* Reset Button */}
      {step === 4 && (
        <button className={`reset-button ${isMobile ? 'mobile-reset-button' : ''}`} onClick={resetAnimation}>
          <i className="fas fa-redo"></i>
          {isMobile ? "Ulangi" : "Baca Lagi"}
        </button>
      )}
    </div>
  )
}

export default InteractiveGreetingCard