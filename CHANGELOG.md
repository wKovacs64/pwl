# Change Log

## Version 1.3.2 _(2018-10-20)_

- Fixed a "flash of empty content" issue related to `<noscript>` ([#10][#10])

## Version 1.3.1 _(2018-10-14)_

- Added a delay before showing the loading indicator when retrieving public
  exposure info to prevent a "flash of loading state" ([#8][#8])
- Added an explicit border on the password input field to resolve an issue where
  it was being cut off in Google Chrome on mobile devices
- Fixed a bug in the E2E tests that was allowing some PwnedPassword API requests
  to use the actual network when they should have been stubbed out

## Version 1.3.0 _(2018-10-03)_

- Added social media sharing metadata ([#7][#7])
- Changed the back link on the 404 page to a button (to leverage `back()` from
  the [History API][history-api] instead of a direct link to the site root) and
  improved its styling
- Added tests for the 404 page

## Version 1.2.3 _(2018-09-27)_

- Reduced space above the site title on large screens

## Version 1.2.2 _(2018-09-27)_

- Fixed issue with the 404 page redirecting to append `?no-cache=1`

## Version 1.2.1 _(2018-09-26)_

- Fixed update alert positioning in IE
- Added a border to the update alert

## Version 1.2.0 _(2018-09-25)_

- Added automatic update checks ([#3][#3])
- Hid the Microsoft `input` clear action for cross-browser layout consistency
- Fixed `main` element display for IE
- Added `noscript` block in case JavaScript is unavailable
- Reduced bundle size by formatting numbers more efficiently
- Improved tests

## Version 1.1.0 _(2018-09-23)_

- Added logic and styles to account for preceding and trailing spaces
- Added functionality preview animation to the README
- Added E2E tests

## Version 1.0.0 _(2018-09-21)_

- Initial release

[#3]: https://github.com/wKovacs64/pwl/pull/3
[#7]: https://github.com/wKovacs64/pwl/pull/7
[history-api]: https://developer.mozilla.org/en-US/docs/Web/API/History
[#8]: https://github.com/wKovacs64/pwl/pull/8
[#10]: https://github.com/wKovacs64/pwl/pull/10
