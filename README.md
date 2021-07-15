# FunBlox
**We are a roblox API on development! (Contact us : fedee#9606 / DinoChickenFlexJosh#0656)**

[Discord Server](https://discord.gg/3PcZBE2u)
# Instructions

```
npm i @mybot-rblx/funblox.js
```

```js
const roblox = require("funblox.js")

roblox.getUser("fede1212156", "username").then(respon => {
    console.log(respon)
}).catch(() => {
    console.log("ERR")
})
```

```js
const roblox = require("funblox.js")

roblox.getUser("149556783", "id").then(respon => {
    console.log(respon)
}).catch(() => {
    console.log("ERR")
})
```
# Group Examples

```js
const roblox = require("funblox.js")

roblox.getGroup("Iron Cafe", "name").then(res => {
    console.log(res);

}).catch(console.error);
```

```js
const roblox = require("funblox.js")

roblox.getGroup("10394589", "id").then(res => {
    console.log(res);

}).catch(console.error);

```
# More Coming Soon...
