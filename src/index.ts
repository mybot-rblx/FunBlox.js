import GetUser from './user/getUser';
import GetGroup from './group/getGroup';
import getUserRank from './user/getUserRank';
import * as api from './api'

// if any have class
const getGroup = new GetGroup()
const getUser = new GetUser()

export {
    getGroup,
    api,
    getUser,
    getUserRank,
}
