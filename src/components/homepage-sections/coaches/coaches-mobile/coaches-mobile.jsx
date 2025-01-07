import React, { useState, useEffect, useRef, useCallback } from 'react'

export const CoachesMobile = ({ coaches }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const counter = useRef(0)

  const slideStyles = {
    width: "80%",
    aspectRatio: "0.9 / 1",
    borderRadius: "4px",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    color: "white",
    margin: "0 auto"
  }

  const rightArrowStyles = {
    position: "absolute",
    top: "45%",
    transform: "translate(0, -50%)",
    right: "12%",
    fontSize: "40px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
    border: "none",
    outline: "none",
    background: "none"
  }

  const leftArrowStyles = {
    position: "absolute",
    top: "45%",
    transform: "translate(0, -50%)",
    left: "12%",
    fontSize: "40px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
    border: "none",
    outline: "none",
    background: "none"
  }

  const sliderStyles = {
    position: "relative",
    height: "100%",
  }

  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  }

  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  }

  const handleSlideAutoChange = useCallback(() => {
    setInterval(() => {
      counter.current = counter.current + 1
      setCurrentIndex(counter.current % coaches.length)
    }, 20000)
  }, [coaches.length])

  useEffect(() => {
    handleSlideAutoChange()
  }, [handleSlideAutoChange])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? coaches.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === coaches.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (coachIndex) => {
    setCurrentIndex(coachIndex)
  }

  const slideWithBackgroundImg = {
    ...slideStyles,
    backgroundImage: `url(${coaches[currentIndex].img})`,
    cursor: "pointer"
  }

  return (
    <div style={sliderStyles}>
      <button onClick={goToPrevious} style={leftArrowStyles}>
        ❱
      </button>
      <button onClick={goToNext} style={rightArrowStyles}>
        ❰
      </button>
      <div style={slideWithBackgroundImg}>
        <h4 className="category-legends">
          <small>{coaches[currentIndex].legends}</small>
          <br />
          <span>{coaches[currentIndex].name}</span>
        </h4>
      </div>
      <div style={dotsContainerStyles}>
        {coaches.map((coach, coachIndex) => (
          <div
            style={dotStyle}
            key={coachIndex}
            onClick={() => goToSlide(coachIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  )
}
