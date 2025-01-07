import React, { useState, useEffect, useRef } from "react"

export const ChildrenPractice = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const counter = useRef(0)

  let slides = [
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674816341/General/Dudi%20Sela/childrenpractice6_m3wdeh.jpg'
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674816332/General/Dudi%20Sela/childrenpractice2_usbsxh.jpg'
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674816333/General/Dudi%20Sela/childrenpractice5_s2tli9.jpg'
      },
      {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674816332/General/Dudi%20Sela/childrenpractice3_gtx7qn.jpg'
      },
      {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674816332/General/Dudi%20Sela/childrenpractice1_srzaaa.jpg'
      },
      {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674816332/General/Dudi%20Sela/childrenpractice4_xuetj3.jpg'
      }
  ]

  useEffect(() => {
    setInterval(() => {
      counter.current = counter.current + 1
      setCurrentIndex(counter.current % slides.length)
    }, 10000)
  }, [slides.length])

  return (
    <section className="slider-container container">
      <div className="slider">
        <div className="slider-img">
          <img src={slides[currentIndex].img} alt={slides[currentIndex].name} />
        </div>
      </div>
    </section>
  )
}

