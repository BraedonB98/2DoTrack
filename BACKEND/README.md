BackEnd planning
- needed for base program
---Later capability
[] array
{} Object

-----------------------------Data Structures ----------------------------------------
User{}
    -Name
    -ID(Auto from Mongoose)
    -Subscription{}
    -Photo
    -Email
    -Phone Number
    -Password
    -Preferences{}
        -Wake Up time
        -Email,text, or both reminder? (put highest priority tasks at the top of the list)
        -ToDo Reminder?
        -Finance OverView?
    -To Do Catagories[]
        -To Do List{} //single catagory object
            -Name
            -ToDoItems[]
                -ToDoItem (Mongoose Oject)
    ---PendingSharedTasks[] //tasks shared by another user but not accepted by this user
    -Recurring Expenses[] //will update every set amount of time
        -...Finance Item{}
            -Reaccuring time frame
    -Finance Accounts[]  //Business, Personal,ext
        -Balance
        -Finance Catagory[] //create new or use existing (food, movies,ext)
            -FinanceItem(Mongoose Object)
            
To Do Item{}
    -Task
    -ID (Auto from Mongoose)
    -Complete(Pending, Started, Complete)
    //-ToDoLists //which todo list is it stored in, If is shared with other users this will be filled in upon return 
    -Due(if so){}
        -Date
        -Time
    -Priority(1-Low, 2-LowMid, 3-Mid, 4-MidHigh, 5 High)
    -Address
    -Location
    -Notes
    -Users[] 

Finance Item{}
    -Name
    -ID(Auto from Mongoose)
    -Profit or Deficit amount //Deficit is negative Profit is positive 
    -Date
    -Notes
    ---Color
    ---Location
    -Users[]

------------------------------ REST API Commands --------------------------------------
-GET/API/UID/Name/:Name
    -Returns UID based on name 

-GET/API/UID/Email/:Email
    -Returns UID based on email

-GET/API/UID/PhoneNumber/:PhoneNumber
    -Returns UID based on PhoneNumber

-POST/API/CreateUser -Create User
    -(Name, Email, PhoneNumber, Password)//will assign preferences and Photo default, Todo lists,Recurring Expenses, and Finance Accounts Empty
    -Will create a new user and add them to the database IF there is not an exsisting user with that email and phone number
    -Make my phone number overRide this check for testing purposes
    -Returns created user object or error

-POST/API/Login -Login
    -(Email, Password)
    -Login User to website

-PATCH/API/:UID/Info/Photo -Photo
    -(Photo, Auth)
    -Uploads new photo to user profile

-GET/API/:UID/Info/Preferences -Get Preferences
    -(Auth???) 
    -Returns User Preferences if user is the logged in user

-PATCH/API/:UID/Info/Preferences -Change Preferences 
    -(Auth, Preference{})
    -Updates User Preferences if User is logged in

-POST/API/:UID/TODOLIST -New TODOLIST 
    -(Auth, Todo TODOLIST Name)
    -Creates new empty array with Name in USER->TO DO Catagories -> Name[]

-PATCH/API/TODOLISTS/:UID/:TODOLIST -Rename TODOLIST
    -(Auth,New TODOLIST Name)
    -Finds Previous TODOLIST -> Name , If its there then it will duplicate the found array to a new array with a new Name else return error

-DELETE/API/TODOLISTS/:UID/:TODOLIST -Delete TODOLIST
    -(Auth)
    -Deletes TODOLIST and all TODO Items in catagory 

-GET/API/user/:UID/Catagories -Get Catagorys
    -(Auth)
    -returns all catagories user has

-GET/API/:UID/TODOLISTS/:TODOLIST -Get TODO LIST
    -(Auth)
    -returns specific TODO LIST requested

-GET/API/:UID/:TODOLIST/:TDIID -Get TODO ITEM //TDI == TO DO ITEM
    -(Auth)
    -Searches through todo List in user if there returns todoitem else error

-POST/API/:UID/:TODOLIST/
    -(Auth, TODOITEM)
    - if todo list is there, add new TODO Item to the selected todo list, else throw error

-PATCH/API/:UID/:TODOLIST/:TDID/ -Change Task info
    -(Auth, task, due, priority, location, notes)
    - if todo item is there, ...TDID +  amend new info
    
-DELETE/API/:UID/:TODOLIST/:TDID/ - Delete Task
    -(Auth)
    - if todo item is there, Delete it

-PATCH/API/:UID/:TODOLIST/:TDID/Move -Move Task
    -(Auth, newTaskList)
    - if todo item is there, copy Task to new Task list, Remove it from old task list

---PATCH/API/:UID/:TODOLIST/:TDID/Share - Share Task with other user
    -(Auth, UsersAdded)
    -Adds task to UsersAdded PendingSharedTasks[] array until they accept

---GET/API/:UID/PendingSharedTasks/
    -(Auth)
    -returns all pending tasks for user shared from other user

---PATCH/API/:UID/AcceptTask/
    -(Auth, TaskAcceptedID , TODOLIST)//TODOLIST is the list the user wants to add it to
    -Moves task from PendingSharedTasks[] to TODOLIST, removes it from PendingSharedTasks[]






-------------------------------------------------------Known Issues---------------------------------------
in user-controller->imageUpload, if image fails to unlink, add it to a log file to be able to delete later

in app.js/ && user files -> still need to handle validation of users

in uid-controller.js->getbyName will need to get all users with same name and show part of personal info to let user decide which one they are looking for.

need to add user->getcatagory

todo-controller.js -> delete Category, It will also need to search through recurring category and delete any with that category. 

todo-controller.js -> rename Category, It will also need to search through recurring category and rename any with that category and rename those in renamed category

todo-controllers.js -> deleteItem, make sure to go through users list and delete it from task list of all users(both pending or accepted) Also make sure user is the creator. If just a user just remove it from array so they no longer use it.

Todo-routes.js ->still need to add validation to all functions
User-routes.js ->still need to add validation to all functions
UID-routes.js ->still need to add validation to all functions
Finance-routes.js ->still need to add validation to all functions

Need to add a delete user function

Figure out why todo categories have their own object Id when they arnt a mongoose 

Need to standardize emails and phonenumber inputs so a capitalization and stuff doesnt make it not findable when searching.

add change category Icon patch route    

may need to install twilio-cli into project, its installed globally but not for this project

will only work with phone numbers with +1   (USA phone numbers)

----------------------------------------------Dev Info----------------------------------
you need ngrok to be able to open port to internet for sms functionality
