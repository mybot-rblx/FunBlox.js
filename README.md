<img src="https://media.discordapp.net/attachments/700857793443528737/923246821583781908/png_20211222_131305_0000.png" width="800"/>

# FunBlox
**We are a roblox API wrapper on development! (Contact us : fedee#9606 / DogeFlexJosh#0656)**

# Project Information
**FunBlox is an API wrapper for ROBLOX that was developed at the time with JS after two months it was reverted to a package made with TS, today the developers work to add more functions.**


[![CircleCI](https://circleci.com/gh/mybot-rblx/FunBlox/tree/main.svg?style=svg)](https://circleci.com/gh/mybot-rblx/FunBlox/tree/main) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmybot-rblx%2FFunBlox.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmybot-rblx%2FFunBlox?ref=badge_shield)
  [<img src="https://img.shields.io/discord/776614395722989599.svg?style=for-the-badge" width="100"/>](https://discord.gg/3PjNrKW4h7) [<img src="https://img.shields.io/npm/v/funblox.js.svg?style=flat-square" alt="NPM package"/>](https://www.npmjs.com/package/funblox.js)


# Instructions

```
npm i funblox.js
```

# getUser Info

```js
const roblox = require("funblox.js")

roblox.getUser("fede1212156").then(respon => {
    console.log(respon)
}).catch(() => {
    console.log("ERR")
})
```

```js
const roblox = require("funblox.js")

roblox.getUser("149556783").then(respon => {
    console.log(respon)
}).catch(() => {
    console.log("ERR")
})
```

# getPlayerThumbnail



```js
const roblox = require("funblox.js")

roblox.getPlayerThumbnail("user_id", "size", "format", [isCircular (false, true)]).then(res => {
    console.log(res);

}).catch(console.error);

```

# getUserFavoriteGames

```js
const roblox = require("funblox.js")

roblox.getUserFavoriteGames("user_id").then(res => {
    console.log(res);

}).catch(console.error);

```

# getUserBundles

```js
const roblox = require("funblox.js")

roblox.getUserBundles("user_id").then(res => {
    console.log(res);

}).catch(console.error);

```

# getUserRank

```js
const roblox = require("funblox.js")

roblox.getUserRank("groupid", "userid").then(respon => {
    console.log(respon)
}).catch(() => {
    console.log("ERR")
})
```

# getGroup Info

```js
const roblox = require("funblox.js")

roblox.getGroup("Iron Cafe").then(res => {
    console.log(res);

}).catch(console.error);
```

```js
const roblox = require("funblox.js")

roblox.getGroup("10394589").then(res => {
    console.log(res);

}).catch(console.error);

```

# getCategories

```js
const roblox = require("funblox.js")

roblox.getCategories().then(res => {
    console.log(res);

}).catch(console.error);

```

# getFavoritesOfBundle

```js
const roblox = require("funblox.js")

roblox.getFavoritesOfBundle("bundleId").then(res => {
    console.log(res);

}).catch(console.error);

```

# getFavoritesOfItem

```js
const roblox = require("funblox.js")

roblox.getFavoritesOfItem("itemId").then(res => {
    console.log(res);

}).catch(console.error);

```

# Package information
| Package information | ✅ |
| ------- | ------ |
| Maintained | ✅ |
| Active Support | ✅|
| Developers | [@fede1212156](https://www.roblox.com/users/835364986/profile), [@Joshuadl12](https://www.roblox.com/users/156711358/profile) |

# [License](https://github.com/mybot-rblx/FunBlox/blob/main/LICENSE)
This package is under license (MIT).
License description:

A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmybot-rblx%2FFunBlox.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmybot-rblx%2FFunBlox?ref=badge_large)

# More Coming Soon...
