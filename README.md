![Password Lense Demo][demo-image]

## What is this?

Certain characters in passwords ('O' and '0', 'I' and 'l', etc.) can be hard to
identify when you need to type them in (and copy-paste is unavailable).
**Password Lense** is a small web application that provides a quick and secure
way to get a more informative view of your password.

## Features

- Color codes each character in your password with a corresponding legend/key
- Hover-based tooltip on each character in case the colors are not enough
- Accessible color palette
- Light and dark modes
- Monospace font for easy character identification
- Core functionality works even when offline
- Secure (your password never leaves your browser)
- Pressing `ESC` clears the password (in case someone walks in unexpectedly)
- Checks your password against those available in publicly disclosed data
  breaches _(requires Internet connectivity)_
- Automatically checks for updates _(requires Internet connectivity)_

## Run your own

[![Deploy to Netlify][deploy-image]][deploy-link]

## FAQ

<details>
  <summary>Why?</summary>
  <p>Because a co-worker asked for it.</p>
</details>

<details>
  <summary>Isn't Gatsby overkill for this?</summary>
  <p>
    <a href="https://twitter.com/jlengstorf/status/1043237435675557888">No</a>,
    it's <a href="https://twitter.com/kylemathews/status/1043226318978998272">awesome</a>
    for <a href="https://www.gatsbyjs.org/blog/2018-11-07-gatsby-for-apps/">building
    apps</a>.
  </p>
</details>

[demo-image]: ./demo.gif
[deploy-image]: https://www.netlify.com/img/deploy/button.svg
[deploy-link]:
  https://app.netlify.com/start/deploy?repository=https://github.com/wKovacs64/pwl
