import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { CreateClubCourse } from './create-club-course';
import { Loader } from '../../../../../components/loader.jsx';
import { useNavigate } from 'react-router-dom'
import { courtService } from '../../../../../services/court.service'
import { instructorService } from '../../../../../services/instructor.service.js';
import { EmptyCourse } from '../../club-helper';

export const ClubClasses = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [clubClasses, setClubClasses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [classParticipants, setClassParticipants] = useState([])
  const [selectedCourse, setSelectedCourse] = useState()
  const [isNewClass, setIsNewClass] = useState(false)

  const getClubClasses = useCallback(async () => {
    try {
      setIsLoading(true)
      let res = await courtService.getClubClasses()
      setIsLoading(false)
      return res.data.club_classes
    } catch (error) {
      navigate('/')
    }
  }, [navigate]);

  useEffect(() => {
    if (clubClasses.length === 0) {
      getClubClasses().then(res => {
        setClubClasses(res)
      })
    }
    getClassParticipants()
  }, [clubClasses.length, getClubClasses])


  const closeClubCourse = () => {
    console.info("close")
  }

  const handleSave = async (e, clubClass) => {
    if (clubClass.title.trim() !== "") {
      setIsLoading(true)
      await courtService.updateClubClass(clubClass)
      getClubClasses().then(res => {
        setClubClasses(res)
      })
    }
    setShowModalCreate(false)
  }

  const renderModalCreate = () => {
    if (showModalCreate && !isNewClass) {
      return (
        <CreateClubCourse selectedCourse={selectedCourse} showModalCreate={showModalCreate} closeClubCourse={closeClubCourse} setShowModalCreate={setShowModalCreate} handleSave={handleSave} classParticipants={classParticipants} setClassParticipants={setClassParticipants} setIsNewClass={setIsNewClass} isNewClass={isNewClass}/>
      )
    }
    if (showModalCreate && isNewClass) {
      return (
        <CreateClubCourse selectedCourse={EmptyCourse} showModalCreate={showModalCreate} closeClubCourse={closeClubCourse} setShowModalCreate={setShowModalCreate} handleSave={handleSave} classParticipants={classParticipants} setClassParticipants={setClassParticipants} setIsNewClass={setIsNewClass} isNewClass={isNewClass}/>
      )
    }

  }
  const getClassParticipants = useCallback(async () => {
    let participants = await instructorService.getParticipants()
    setClassParticipants(participants)
  }, [setClassParticipants])

  const handleShowClubCourse = (e, course) => {
    setSelectedCourse(course)
    setShowModalCreate(true)
  }
  const handleNewClass = () => {
    setShowModalCreate(true)
    setIsNewClass(true)
  }
  const renderClubCourses = () => {
    return (
      clubClasses.map((course) => {
        return (
          <button className="class-type-btn flex-column" onClick={(e) => handleShowClubCourse(e, course)} >{course.title}
            <span>מדריך: {course.tennisInstructor}</span>
            <span>תיאור הקורס: {course.description}</span>
            <span>תלמידים: {JSON.parse(course.participants).map(p => <span>{p} </span>)}</span>
          </button>
        )
      })
    )
  }

  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }
  return (
    <Box className="club-classes-box container">
      {renderIsLoading()}
      <Container className="club-classes-content">
        <Typography id="club-title" className="club-title" variant="h6" component="h2">חוגים</Typography>
        <CustomDivider />
        <h2>סוגי החוגים</h2>
        <div className="classess-type-container flex">
          {renderClubCourses()}
        </div>
        <Box className="save-classess-btn-container">
          <button onClick={() => handleNewClass()} className="save-club-classes-btn">הוסף חוג</button>
        </Box>
        {renderModalCreate()}
      </Container>
    </Box>
  )
}