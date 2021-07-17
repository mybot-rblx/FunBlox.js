# FunBlox
**We are a roblox API on development! (Contact us : fedee#9606 / DinoChickenFlexJosh#0656)**

**Emails: hello@mybot-rblx.tk, support@mybot-rblx.tk**

# Project Information
**FunBlox is an API for ROBLOX that was developed at the time with JS after two months it was reverted to a package made with TS, today the developers work to add more functions.**


[![CircleCI](https://circleci.com/gh/mybot-rblx/FunBlox/tree/main.svg?style=svg)](https://circleci.com/gh/mybot-rblx/FunBlox/tree/main)   [<img src="https://i.ibb.co/S6XXfxW/0001-4390861584-20210716-002953-0000.png" width="100"/>](https://discord.gg/uxfTMgRmTt)  [![NPM](https://nodei.co/npm/@mybot-rblx/funblox.js.png)](https://nodei.co/npm/@mybot-rblx/funblox.js/)




# Instructions

```
npm i @mybot-rblx/funblox.js
```
# Get group rank

```js
const roblox = require("@mybot-rblx/funblox.js")

roblox.getUserRank("groupid", "userid").then(respon => {
    console.log(respon)
}).catch(() => {
    console.log("ERR")
})
```

# Getusername info

```js
const roblox = require("@mybot-rblx/funblox.js")

roblox.getUser("fede1212156", "username").then(respon => {
    console.log(respon)
}).catch(() => {
    console.log("ERR")
})
```

```js
const roblox = require("@mybot-rblx/funblox.js")

roblox.getUser("149556783", "id").then(respon => {
    console.log(respon)
}).catch(() => {
    console.log("ERR")
})
```
# Group Examples

```js
const roblox = require("@mybot-rblx/funblox.js")

roblox.getGroupByName("Iron Cafe", "name").then(res => {
    console.log(res);

}).catch(console.error);
```

```js
const roblox = require("@mybot-rblx/funblox.js")

roblox.getGroupByID("10394589", "id").then(res => {
    console.log(res);

}).catch(console.error);

```

# Package information
| Daily updates | ✅ |
| ------- | ------ |
| Maintained | ✅ |
| Active Support | ✅|
| Developers | [@fede1212156](https://www.roblox.com/users/835364986/profile), [@Joshuadl12](https://www.roblox.com/users/156711358/profile) |


# More Coming Soon...
