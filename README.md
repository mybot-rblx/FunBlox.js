<img src="https://user-images.githubusercontent.com/72459034/168478419-50f69a42-f776-4062-84fa-8f198920cb5e.png" width="800"/>

# FunBlox
**We are a roblox API wrapper on development! (Contact us : fedee#9606 / DogeFlexJosh#0656)**

# Project Information
**FunBlox is an API wrapper for ROBLOX that was developed at the time with JS after two months it was reverted to a package made with TS, today our developers work to add more functions.**


[![CircleCI](https://circleci.com/gh/mybot-rblx/FunBlox/tree/main.svg?style=svg)](https://circleci.com/gh/mybot-rblx/FunBlox/tree/main) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmybot-rblx%2FFunBlox.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmybot-rblx%2FFunBlox?ref=badge_shield)
  [<img src="https://img.shields.io/discord/776614395722989599.svg?style=for-the-badge" width="100"/>](https://discord.gg/3PjNrKW4h7) [<img src="https://img.shields.io/npm/v/funblox.js.svg?style=flat-square" alt="NPM package"/>](https://www.npmjs.com/package/funblox.js)


# Instructions

```
npm i funblox.js
```

# setCookie

```js
const roblox = require("funblox.js")

roblox.setcookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# Promote

```js
const roblox = require("funblox.js")

roblox.promote("groupid", "username").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# Demote

```js
const roblox = require("funblox.js")

roblox.promote("groupid", "username").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# setRank

```js
const roblox = require("funblox.js")

roblox.setRank("groupid", "username").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# getUser Info

```js
const roblox = require("funblox.js")

roblox.getUser("fede1212156").then(respon => {
    console.log(respon)
}).catch((err) => {
    console.log(err)
})
```

```js
const roblox = require("funblox.js")

roblox.getUser("149556783").then(respon => {
    console.log(respon)
}).catch((err) => {
    console.log(err)
})
```

# getPlayerThumbnail



```js
const roblox = require("funblox.js")

roblox.getPlayerThumbnail("user_id", "size", "format", [isCircular (false, true)]).then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# getUserFavoriteGames

```js
const roblox = require("funblox.js")

roblox.getUserFavoriteGames("user_id").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# getUserBundles

```js
const roblox = require("funblox.js")

roblox.getUserBundles("user_id").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# getUserRank

```js
const roblox = require("funblox.js")

roblox.getUserRank("groupid", "userid").then(respon => {
    console.log(respon)
}).catch((err) => {
    console.log(err)
})
```

# getGroup Info

```js
const roblox = require("funblox.js")

roblox.getGroup("Iron Cafe").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})
```

```js
const roblox = require("funblox.js")

roblox.getGroup("10394589").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# getCategories

```js
const roblox = require("funblox.js")

roblox.getCategories().then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# getFavoritesOfBundle

```js
const roblox = require("funblox.js")

roblox.getFavoritesOfBundle("bundleId").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# getFavoritesOfItem

```js
const roblox = require("funblox.js")

roblox.getFavoritesOfItem("itemId").then(res => {
    console.log(res);

}).catch((err) => {
    console.log(err)
})

```

# Package information
| Package information | ✅ |
| ------- | ------ |
| Maintained | ✅ |
| Active Support | ✅|
| Developers | [@fedeetide](https://www.roblox.com/users/835364986/profile), [@Joshuadl12](https://www.roblox.com/users/156711358/profile) |

# [License](https://github.com/mybot-rblx/FunBlox/blob/main/LICENSE)
This package is under license (MIT).
License description:

A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmybot-rblx%2FFunBlox.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmybot-rblx%2FFunBlox?ref=badge_large)

# More Coming Soon...
