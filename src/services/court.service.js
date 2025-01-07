import { httpService } from './http.service.js'

export const courtService = {
    getClubCourts,
    editClubUser,
    addClubCourt,
    addPriceConstraint,
    editPriceConstraint,
    getPriceConstraints,
    getPunchCards,
    getClubUsers,
    getClubClasses,
    addPunchCard,
    editPunchCard,
    updateClubClass,
    addClubUser,
    getClubHours,
    addClubHours,
    deleteClubHours,
    editClubPreferences,
    getClubPreferences,
    editAboutClub,
    getAboutClub,
    getUserPermissions,
    deletePriceConstraint,
    deleteClubCourt,
    editClubCourt,
    deleteClubUser,
    saveClubUser,
    getUser,
    addSubscriber
}

async function getClubCourts() {
    try {
        let res = await httpService.get('courts/clubcourts')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getAboutClub() {
    try {
        let res = await httpService.get('courts/aboutclub')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getClubPreferences() {
    try {
        let res = await httpService.get('courts/clubpreferences')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getPunchCards() {
    try {
        let res = await httpService.get('courts/punchcards')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getClubUsers() {
    try {
        let res = await httpService.get('courts/clubusers')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getUserPermissions() {
    try {
        let res = await httpService.get('courts/userpermissions')
        return res
    }
    catch (err) {
        throw err
    }
}

async function getUser(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubuser', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function getClubClasses() {
    try {
        let res = await httpService.get('courts/clubclasses')
        return res
    }
    catch (err) {
        throw err
    }
}

async function addPunchCard(data, role='admin') {
    try {
        let res = await httpService.post('courts/punchcards/addPunchCard', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function editPunchCard(data, role='admin') {
    try {
        let res = await httpService.post('courts/punchcards/editPunchCard', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function updateClubClass(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubclasses/addClubClass', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addClubUser(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubusers/addClubUser', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addSubscriber(data, role='subscriber') {
    try {
        let res = await httpService.post('courts/clubusers/addSubscriber', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function editClubUser(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubusers/editClubUser', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function deleteClubUser(data, role='admin') {
    try {
        let res = await httpService.delete('courts/clubusers/deleteClubUser', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function saveClubUser(data, role='admin') {
    try {
        let res = await httpService.delete('courts/clubusers/saveClubUser', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function getClubHours() {
    try {
        let res = await httpService.get('courts/clubhours')
        return res
    }
    catch (err) {
        throw err
    }
}

async function addClubHours(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubhours/addClubHours', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addClubCourt(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubcourts/addClubCourt', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function editClubCourt(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubcourts/editClubCourt', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function addPriceConstraint(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubcourts/addPriceConstraint', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function editPriceConstraint(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubcourts/editPriceConstraint', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function editClubPreferences(data, role='admin') {
    try {
        let res = await httpService.post('courts/clubpreferences', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function editAboutClub(data, role='admin') {
    try {
        let res = await httpService.post('courts/aboutclub', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function deleteClubCourt(data, role='admin') {
    try {
        let res = await httpService.delete('courts/clubcourts/court', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function deletePriceConstraint(data, role='admin') {
    try {
        let res = await httpService.delete('courts/clubcourts', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function deleteClubHours(data, role='admin') {
    try {
        let res = await httpService.delete('courts/clubhours', data, role)
        return res
    }
    catch (err) {
        throw err
    }
}

async function getPriceConstraints() {
    try {
        let res = await httpService.get('courts/priceconstraints')
        return res
    }
    catch (err) {
        throw err
    }
}
