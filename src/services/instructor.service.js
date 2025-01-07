import { httpService } from './http.service.js'

export const instructorService = {
    getInstructors,
    getParticipants,
    addParticipant
}

async function getInstructors() {
    try {
        let res = await httpService.get('courts/clubusers')
        const _instructors = res.data.filter((user) => user.role  === "instructor" && user.firstName);
        return _instructors.map(user => user.firstName + " " +user.lastName);
    }
    catch (err) {
        throw err
    }
}

async function getParticipants() {
    try {
        let res = await httpService.get('instructors/participants')
        return res.data.class_participants;
    }
    catch (err) {
        throw err
    }
}

async function addParticipant(data, role='instructor') {
    try {
        let res = await httpService.post('instructors/addparticipant', data, role)
        return res;
    }
    catch (err) {
        throw err
    }
}