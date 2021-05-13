# FunBlox
**We are a roblox API on development! (Contact us : fedee#9606)**

# Instructions

```
npm i funblox.js
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
