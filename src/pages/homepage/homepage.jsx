import React from 'react'
import { HomeHero } from '../../components/homepage-sections/home-hero/home-hero.jsx'
import { QuestionAnswer } from '../../components/homepage-sections/question-answer/question-answer.jsx'
import { Testimonials } from '../../components/homepage-sections/testimonials/testimonials.jsx'
import { DudiInfo } from '../../components/homepage-sections/dudi-info/dudi-info.jsx'
import coachesData  from './coachesData.jsx'
import { Coaches } from '../../components/homepage-sections/coaches/coaches.jsx'
import { CoachesMobile } from '../../components/homepage-sections/coaches/coaches-mobile/coaches-mobile.jsx'

export const Homepage = () => {

  const renderCoaches = () => {
    if (window.innerWidth < 720) {
      return <CoachesMobile coaches={coachesData}/>;
    } else {
      return <Coaches coaches={coachesData}/>;
    }
  }

  return (
    <div className="home">
      <section className="home-hero">
        <HomeHero />
      </section>
      <section className="coaches-container container">
        <h2>נבחרת המאמנים</h2>
        {renderCoaches()}
      </section>
      <DudiInfo />
      <section className="FAO-container container flex-column align-center">
        <QuestionAnswer />
      </section>
      <Testimonials />
    </div >
  )
}

