# FunBlox
**We are a roblox API on development! (Contact us : fedee#9606 / DinoChickenFlexJosh#0656)**
[NPM Page](https://www.npmjs.com/package/@mybot-rblx/funblox.js)
[Discord Server](https://discord.gg/uxfTMgRmTt)
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

roblox.getGroup("Iron Cafe", "name").then(res => {
    console.log(res);

}).catch(console.error);
```

```js
const roblox = require("@mybot-rblx/funblox.js")

roblox.getGroup("10394589", "id").then(res => {
    console.log(res);

}).catch(console.error);

```
# More Coming Soon...
