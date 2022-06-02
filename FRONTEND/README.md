Ideas for later maybe
-adjustable css for each user(color preferences saved on file)
-have different sorts and filters for todolist
-add an export category button to allow me to not have to manually copy over known issues each time

# known issues

-Transfer creator
--Allow creater of task to search through other users the task is shared with and transfer creator to them

- Non Creator Edit
  --does the edit button show for users that are not the creator of the task
  -Move Task
  --User back end move task, Allow users to switch which category an item is in, Backend still needs to be tested on this
  -Settings Page
  --Add a page where users can adjust their preferences and UPLOAD A USER IMAGE
  -Dashboard
  --Add a dashboard that is customizable by using the grid on the dashboard and save in preferences where things are so user can
  -upload user image
  --On settings page let use update their profile photo
  -nav bar
  --Make it so when clicking off of the user drop down it will close the drop-down
  -add user info to the local storage
  --Add user context to local storage when assigning but then also run removeUser when logging out
  -uid frontend requests
  --Alot of the front end requests include the uid but the back end isn't looking for this since it is taking it from the token, there are a couple of requests that use it because the uid is another user. Go through and delete the ones that are not needed.
  -create task
  --Create task has a couple of user.filters that are never actually used for anything, make sure there isn't a purpose, then remove them
  -rearrange categories!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  --Make a way to move categories around within the array they are stored in, I want my personal first, then projects overview, then
  -remove autofill
  --notes and title auto fill when adding task. make it so it stops
  -icon color change
  --Change color of icons to match rarity of games, brown for 1, green for 2, blue for 3, purple for 4, and gold for 5
  -user drop down
  --Make sure the user drop down menu only appears when in desktop mode, if the sideDrawer is active it should not appear
