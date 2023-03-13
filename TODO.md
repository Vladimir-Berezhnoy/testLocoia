Hello!

I did not have time to create the page that shows the list of people, but I can try to explain there
how I would do it:
1) In components, I would create 2 files: 'WinListPage' and 'WinListComponent'
2) Restructure viewing of win-list to own component, and append this component to 'WinListPage' and 'NameSearcher'
3) Some modifications in router file
4) Create button 'back' and related to it functionallity by routes.

Possible further improvements to the architecure:
- Each api request would have error handling by catch. If the server is unavailability or some non-understandable
  issue, the error would be something like 'We're sorry! Something went wrong!". For the errors with the inited
  status, would be create their own error handling.
- As a rate limiting handling, I would create lazy-loaders on each api request, which would be shown if the data
 is loading and hidden if not
- For the app protecting need to:
  - type all data that can be passed on the both sides(Back and Front)
  - handle mouse events, for block the form submit spamming.
  - create requests limit on Back-End side
- For make a sure that the app is running with the latest version of code, I can use github desktop and 
  check actual branch name and have I some pulls or not
- For each significant change I can:
  - create new branch based on actual branch, after all functionallity is done and well tested, merge this 
    branch to the production
  - separate massive task to few lesser, create new branches for each tasks, merge every branch to prod
    on each functionality done, while users will test new functionality I could create new, and fix bugs if
    they would be
- The app should have access to:
  - Every popular browser version
  - Responsive size screen(desktops, mobiles, tablet, etc.)
  - Use the right html tags for the Google validation
- I would create shared scss file, for init colors, sizes, and so on variables. Create other shared scss files
  if different components would have the same styles