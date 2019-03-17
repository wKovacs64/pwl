# Change Log

The changelog is automatically updated using
[semantic-release](https://github.com/semantic-release/semantic-release). You
can see it on the [releases page](../../releases).

---

<details>
<summary>Historical Change Log</summary>

#### Version 1.5.5 _(2019-02-10)_

- Fixed another "flash of unstyled content" issue when using the dark mode theme
  ([f14a36f0][f14a36f0])

#### Version 1.5.4 _(2019-02-10)_

- Fixed a "flash of unstyled content" issue when using the dark mode theme
  ([#39][#39])

#### Version 1.5.3 _(2019-01-11)_

- Fixed a "flash of unstyled content" issue ([d7033193][d7033193])

#### Version 1.5.2 _(2019-01-11)_

- Fixed style loss on page reload ([28aa86e1][28aa86e1])
- Removed custom `<noscript>` hack for appeasing Lighthouse as Gatsby includes
  it now

#### Version 1.5.1 _(2019-01-09)_

- Fixed an issue where the pubic exposure would indicate your password had not
  been exposed in a breach while you were typing (even if it had been)
- Removed redundant debounce logic delaying password exposure queries

#### Version 1.5.0 _(2019-01-08)_

- Added a dark mode theme 🌚 ([#20][#20])
- Converted codebase to TypeScript ([#21][#21])
- Added a `<noscript>` SSR hack to appease Lighthouse ([d354eccf][d354eccf])
- Fixed max paragraph width in IE11
- Tweaked update alert visuals

#### Version 1.4.0 _(2018-12-08)_

- Updated emotion to v10 ([#13][#13], [c18d7a81][c18d7a81],
  [a5071ef2][a5071ef2], [d0f3896f][d0f3896f], etc.)
- Converted codebase to use React Hooks 🤠 ([#15][#15])
- Added reload and dismiss buttons to the update alert ([c822d112][c822d112])

#### Version 1.3.2 _(2018-10-20)_

- Fixed a "flash of empty content" issue related to `<noscript>` ([#10][#10])

#### Version 1.3.1 _(2018-10-14)_

- Added a delay before showing the loading indicator when retrieving public
  exposure info to prevent a "flash of loading state" ([#8][#8])
- Added an explicit border on the password input field to resolve an issue where
  it was being cut off in Google Chrome on mobile devices
- Fixed a bug in the E2E tests that was allowing some PwnedPassword API requests
  to use the actual network when they should have been stubbed out

#### Version 1.3.0 _(2018-10-03)_

- Added social media sharing metadata ([#7][#7])
- Changed the back link on the 404 page to a button (to leverage `back()` from
  the [History API][history-api] instead of a direct link to the site root) and
  improved its styling
- Added tests for the 404 page

#### Version 1.2.3 _(2018-09-27)_

- Reduced space above the site title on large screens

#### Version 1.2.2 _(2018-09-27)_

- Fixed issue with the 404 page redirecting to append `?no-cache=1`

#### Version 1.2.1 _(2018-09-26)_

- Fixed update alert positioning in IE
- Added a border to the update alert

#### Version 1.2.0 _(2018-09-25)_

- Added automatic update checks ([#3][#3])
- Hid the Microsoft `input` clear action for cross-browser layout consistency
- Fixed `main` element display for IE
- Added `noscript` block in case JavaScript is unavailable
- Reduced bundle size by formatting numbers more efficiently
- Improved tests

#### Version 1.1.0 _(2018-09-23)_

- Added logic and styles to account for preceding and trailing spaces
- Added functionality preview animation to the README
- Added E2E tests

#### Version 1.0.0 _(2018-09-21)_

- Initial release

</details>

[#3]: https://github.com/wKovacs64/pwl/pull/3
[#7]: https://github.com/wKovacs64/pwl/pull/7
[history-api]: https://developer.mozilla.org/en-US/docs/Web/API/History
[#8]: https://github.com/wKovacs64/pwl/pull/8
[#10]: https://github.com/wKovacs64/pwl/pull/10
[#13]: https://github.com/wKovacs64/pwl/pull/13
[c18d7a81]:
  https://github.com/wKovacs64/pwl/commit/c18d7a814f8389d5f7fc9e9fefce9909d1b1a7c5
[a5071ef2]:
  https://github.com/wKovacs64/pwl/commit/a5071ef2e457545335b23cd46afc37b90e1794b0
[d0f3896f]:
  https://github.com/wKovacs64/pwl/commit/d0f3896ff43dd6a5479c8ce9b1fe6f2826beb632
[#15]: https://github.com/wKovacs64/pwl/pull/15
[c822d112]:
  https://github.com/wKovacs64/pwl/commit/c822d11243748d1e35d1190e8f5cd85d17ed0c73
[d354eccf]:
  https://github.com/wKovacs64/pwl/commit/d354eccf9f469e890397609f8c93731c3bca0737
[#20]: https://github.com/wKovacs64/pwl/pull/20
[#21]: https://github.com/wKovacs64/pwl/pull/21
[28aa86e1]:
  https://github.com/wKovacs64/pwl/commit/28aa86e17b3915e7858119e358c4b75d51f7c050
[d7033193]:
  https://github.com/wKovacs64/pwl/commit/d70331936d0edb710f35a88b555fddaa8de20c7a
[#39]: https://github.com/wKovacs64/pwl/pull/39
[f14a36f0]:
  https://github.com/wKovacs64/pwl/commit/f14a36f088c84d4eab71f75b2373077a2fcd4e92
