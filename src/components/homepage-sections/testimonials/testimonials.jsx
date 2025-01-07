import React, { useState, useEffect, useRef } from "react"

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const counter = useRef(0)

  let slides = [
    {
      elementName: 'group-practice',
      quote: 'רמת האימונים הקבוצתיים אינטנסיבית וגבוהה, המאמנים מספקים תמיכה ומענה על כל שאלה וצורך. הקבוצות הקטנות (מקסימום של 4 שחקנים) מאפשרות לי להתמקד בכל אימון ולהתקדם בקלות ובמהירות. האימונים מספקים תוצאות מהירות וכל אימון מרגיש משמעותי. מעבר לכך, האימונים בקבוצה רצינית ותחרותית מדרבנת אותי להתקדם ולהשיג את המטרות שלי.',
      name: '--איתי גולדשטיין',
      img: 'https://res.cloudinary.com/primap/image/upload/v1669392539/General/Dudi%20Sela/1_5_wyrwrm.jpg'
    },
    {
      elementName: 'personal-training',
      quote: `חווית אימון אישי עם בכירי מאמני ישראל.
      היו לי כבר הרבה מאוד אימונים אישיים במועדוני טניס אחרים ופשוט אין מה להשוות מבחינה רמה.
      התאמת האימון בצורה מושלמת לסגנון של השחקן עם טכניקות מדויקות לתרגול על מנת להשיג תנועה מושלמת ויעילה. לכל מי שרוצה להקפיץ את רמת הטניס שלו,
      אני ממליץ בחום לנסות אימונים אישיים`,
      name: '--דור ינאי',
      img: 'https://res.cloudinary.com/primap/image/upload/v1669392548/General/Dudi%20Sela/1_3_tnz7rj.jpg'
    },
    {
      elementName: 'parent',
      quote: 'כהורה, אתה תמיד רוצב את הטוב ביותר עבור הילד שלך, ובאקדמיה של דודי סלע מצאתי את השילוב המנצח בין יחס אישי לכל ילד, מקצוענות ושאיפה למצוינות. כשהילד שלי מתאמן שם, אני שקטה ומרגיש שהוא מקבל את האימון הטוב ביותר ומתקדם בכל צעד. תודה דודי סלע וצוות האקדמיה שלך!',
      name: '--שחר כהן',
      img: 'https://res.cloudinary.com/primap/image/upload/v1669388589/General/Dudi%20Sela/pexels-rodnae-productions-8224537_pcqgk5.jpg'
    },
    // {
    //   elementName: 'customer',
    //   quote: 'תהליך הזמנת המגרשים באתר האקדמיה של דודי סלע נעשה בקלות ובמהירות. המגרשים נקיים, מסודרים ומצויינים ברמה גבוהה מאוד. שירות לקוחות מהיר ואדיב ויש גם הנחה למנויים. מומלץ בחום!',
    //   name: '--לוי לוי',
    //   img: 'https://res.cloudinary.com/primap/image/upload/v1669400699/General/Dudi%20Sela/pexels-blue-arauz-7386780_e69ymd.jpg'
    // },

  ]

  useEffect(() => {
    setInterval(() => {
      counter.current = counter.current + 1
      setCurrentIndex(counter.current % slides.length)
    }, 20000)
  }, [slides.length])

  return (
    <section className="slider-container container">
      <div className="slider">
        <div className="slider-content flex-column">
          <blockquote>{slides[currentIndex].quote}
          </blockquote>

          <figcaption>
            <cite>
            {slides[currentIndex].name}
          </cite>
          </figcaption>
        </div>
        <div className="slider-img">
          <img src={slides[currentIndex].img} alt={slides[currentIndex].name} />
        </div>
      </div>
    </section>
  )
}

