import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { TextBox } from '../../../../shared-components/text-box';
import { SwitchInput } from '../../../../shared-components/switch-input';
import { SaveButton } from '../../../../shared-components/save-button';
import UsersTable from './users-table'
import { Loader } from '../../../../../components/loader.jsx';
import { courtService } from '../../../../../services/court.service'
import { useNavigate } from 'react-router-dom'
import PermissionsTable from './permissions-table';
import { SelectMenu } from '../../../../shared-components/select-menu';
import { UserRoles } from '../../club-helper';
import { PersonalDetails } from './personal-details';
import { Button } from '@mui/material';

export const UsersPermission = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [searchVal, setSearchVal] = useState();
  const [userName, setUserName] = useState();
  const [userMessage, setUserMessage] = useState(`שלום  מועדון האקדמיה לטניס דודי סלע  מזמין אותך להצטרף למערכת הזמנות ממוחשבת. לחץ על הקישור להורדת האפליקציה https://lazuz.co.il`);
  const [permissionType, setPermissionType] = useState()
  const [clubUsers, setClubUsers] = useState([])
  const [userPermissions, setUserPermissions] = useState([])
  const navigate = useNavigate()
  const [rowsTableUsers, setRowsTableUsers] = useState([])
  const [iRowsTableUsers, initRowsTableUsers] = useState([])
  const [rowsUserPermissions, setRowsUserPermissions] = useState([])
  const [usersData, setUsersData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (userName) {
      const message = `שלום  ${userName} לטניס דודי סלע  מזמין אותך להצטרף למערכת הזמנות ממוחשבת. לחץ על הקישור להורדת האפליקציה https://lazuz.co.il`
      setUserMessage(message)
    }
  }, [userName])
  const handleGetClubUsers = useCallback(() => {
    getClubUsers().then(res => {
      setClubUsers(res)
      if (res.length > 0) {
        const _rowsTableUsers = res.map((user) => createUserData(user.fullName, user.primaryPhone, user.email, user.role, user.validTill))
        setRowsTableUsers(_rowsTableUsers);
        initRowsTableUsers(_rowsTableUsers);
        setUsersData(res)
      }
    })
  })
  useEffect(() => {
    if (clubUsers.length === 0) {
      getClubUsers().then(res => {
        setClubUsers(res)
        if (res.length > 0) {
          const _rowsTableUsers = res.map((user) => createUserData(user.fullName, user.primaryPhone, user.email, user.role, user.validTill))
          setRowsTableUsers(_rowsTableUsers);
          initRowsTableUsers(_rowsTableUsers);
          setUsersData(res)
        }
      })
    }
  }, [])
  const getClubUsers = async () => {
    try {
      setIsLoading(true)
      let res = await courtService.getClubUsers()
      setIsLoading(false)
      return res.data
    } catch (error) {
      navigate('/')
    }
  }

  // ||
  //     user.primaryPhone.indexOf(searchVal) !== -1 ||
  //     user.fullName.indexOf(searchVal) !== -1
  const isFoundUser = (user) => {
    const foundUser=user && ((user.email && user.email.indexOf(searchVal) !== -1) || (user.primaryPhone && user.primaryPhone.indexOf(searchVal) !== -1) || (user.fullName && user.fullName.indexOf(searchVal) !== -1));
    return foundUser;
  }
  const handleSearch = (e, searchVal) => {
    const _rows = iRowsTableUsers.filter(user => isFoundUser(user))
    setRowsTableUsers(_rows)
    if (searchVal === "") handleGetClubUsers()
  }
  const createUserData = (fullName, primaryPhone, email, permission, validTill) => {
    return {
      fullName,
      primaryPhone,
      email,
      permission,
      validTill,
    };
  }


  const toggleAddUser = () => {
    setShowAddUser(!showAddUser)
  }

  const toggleSearchUser = () => {
    setShowSearchUser(!showSearchUser)
  }
  const closeAddUser = () => {
    setShowAddUser(false)
  }
  const handelCancelSearch = () => {
    handleGetClubUsers()
    setShowSearchUser(false)
  }
  const handleSaveUser = async (selectedUser) => {
    setIsLoading(true)
    await courtService.saveClubUser(selectedUser)
    handleGetClubUsers()
    setIsLoading(false)
  }
  const handleDeleteUser = async (selectedUser) => {
    setIsLoading(true)
    await courtService.deleteClubUser(selectedUser)
    handleGetClubUsers()
    setIsLoading(false)
  }
  const renderSearchUser = () => {
    if (showSearchUser) {
      return (
        <>
          <Box className="main-component-fields-container">
            <TextBox label="חפש שם משתמש לפי מייל, שם, וטלפון" value={searchVal} setValue={setSearchVal} />
          </Box>
          <Box className="">
            <Button label="חפש" component="label" onClick={(e) => handleSearch(e, searchVal)}>חפש</Button>
            <Button label="ביטול" component="label" onClick={() => handelCancelSearch()}>ביטול</Button>
          </Box></>
      )
    }
  }
  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }
  const renderModal = () => {
    if (showAddUser) {
      return (
        <PersonalDetails handleGetClubUsers={handleGetClubUsers} user={{}} showUserDetails={showAddUser} setShowUserDetails={setShowAddUser} closeUserDetails={closeAddUser} />
      )
    }
  }
  return (
    <Box className="users-permission-box container">
      {renderIsLoading()}
      <Container className="users-permission-content">
        <Box className="users-permission-header">
          <Typography id="club-title" variant="h6" component="h2">משתמשים והרשאות</Typography>
        </Box>
        <CustomDivider />
        <div className="users-permission-actions-container flex">
          <button onClick={() => toggleAddUser()} className="permission-actions-btn flex">
            הוסף משתמש
          </button>
          {renderModal()}
          <button onClick={() => toggleSearchUser()} className="permission-actions-btn flex">
            חפש משתמש
          </button>
          {renderSearchUser()}
        </div>
        <CustomDivider />
        <UsersTable
          handleGetClubUsers={handleGetClubUsers}
          usersData={usersData}
          rows={rowsTableUsers}
          handleSaveUser={handleSaveUser}
          handleDeleteUser={handleDeleteUser} />
        <CustomDivider />
      </Container>
    </Box>
  )
}

/* {renderAddPermission()} */
// const renderAddPermission = () => {
//   if (showAddUser) {
//     return (
//       <>
//       <Box className="main-component-fields-container">
//         <TextBox label="מייל המשתמש" value={permissionType} setValue={setPermissionType} />
//       </Box>
//       <Box className="main-component-fields-container">
//         <SelectMenu inputLabel="סוג ההרשאה" value={permissionType} values={UserRoles} setValue={setPermissionType} />
//       </Box>
//       <Box className="">
//         <SaveButton label="הוסף" onClick={handleAddPermission} />
//       </Box>
//       </>
//     )
//   }
// }
/* <PermissionsTable rows={rowsUserPermissions} /> */

/* {renderCreateUser()} */
// const handleAddPermission = (e) => {
//   e.stopPropagation()
//   e.preventDefault()

// }

// const renderCreateUser = () => {
//   if (showCreateUser) {
//     return (
//       <>
//       <Box className="main-component-fields-container">
//         <TextBox label="טלפון הלקוח" value={email} setValue={setSearchVal} />
//         <TextBox label="שם משתמש (בכניסה לאפליקציה)" value={userName} setValue={setUserName} />
//         <TextBox label="תוכן מודעה" value={userMessage} setValue={setUserMessage} />
//       </Box>
//       <Box className="">
//         <SaveButton label="שלח הזמנה" onClick={handleSend} />
//       </Box></>
//     )
//   }
// }


// const getUserPermissions = async () => {
//   try {
//     // setIsLoading(true)
//     let res = await courtService.getUserPermissions()
//     // setIsLoading(false)
//     // permissionName, daysAheadInApp, daysAheadCancel, allowWatch, isManager, allowEditEvents, allowInnerEvents, allowOpenGates
//     return res.data.user_permissions
//   } catch (error) {
//     navigate('/')
//   }
// }
// following in useEffect
// if (userPermissions.length === 0) {
//   getUserPermissions().then(res => {
//     setUserPermissions(res)
//     if (res.length > 0)
//     setRowsUserPermissions(res);
//   })
// }