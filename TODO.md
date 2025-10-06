# TODO: Enhance LineChart Popup with Detailed Employee Info

## Completed Tasks
- [x] Added new endpoint `getEventsByWorkerAndWeek` in `chartsService.js`
- [x] Added controller `eventsByWorkerAndWeekController` in `chartsController.js`
- [x] Added route `/api/eventsByWorkerAndWeek/:workerId/:year/:month/:week` in `index.js`
- [x] Modified `DashboardsInd.jsx` to pass `year` and `month` props to `LineChart`
- [x] Updated `LineChart` component to accept `workerId`, `year`, `month` props
- [x] Modified `handleClick` in `LineChart` to fetch detailed data for the clicked week
- [x] Computed average entry and exit times from fetched data
- [x] Updated popup to display average entry time and last exit time

## Next Steps
- [ ] Test the implementation by running the backend and frontend
- [ ] Verify that clicking on chart points shows the enhanced popup with times
- [ ] Handle edge cases, like no data for a week
- [ ] Optimize if needed (e.g., cache data or show loading)
