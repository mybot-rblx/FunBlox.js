const getUser = require("./getUser");
const getUserRank = require("./getUserRank");
const getGroup = require("./getGroup");

getGroup().then(wow => {
    console.log(wow)
});
getUserRank().then(wow => {
    console.log(wow)
})
getUser().then(wow => {
    console.log(wow)
})
