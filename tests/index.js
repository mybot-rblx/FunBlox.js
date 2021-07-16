const getUser = require("./getUser");
const getUserRank = require("./getUserRank");
const getGroupById = require("./getGroupById");
const getGroupByName = require("./getGroupByName");

getGroupById().then(wow => {
    console.log(wow)
});

getGroupByName().then(wow => {
    console.log(wow)
})
getUserRank().then(wow => {
    console.log(wow)
})
getUser().then(wow => {
    console.log(wow)
})
