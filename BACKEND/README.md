BackEnd planning
- needed for base program
---Later capability
[] array
{} Object

-----------------------------Data Structures ----------------------------------------
User{}
    -Name
    -ID(Auto from Mongoose)
    -Photo
    -Email
    -Phone Number
    -Password
    -Preferences{}
        -Wake Up time
        -Email,text, or both reminder? (put highest priority tasks at the top of the list)
        -ToDo Reminder?
        -Finance OverView?
    -To Do Lists[]
        -ToDoItem ID
    -Recurring Expenses[] //will update every set amount of time
        -...Finance Item{}
            -Reaccuring time frame
    -Finance Accounts[]  //Business, Personal,ext
        -Balance
        -Finance Catagory[] //create new or use existing
            -Finance Items{}
                -Name
                -Profit or Deficit amount //Deficit is negative Profit is positive 
                -Date
                -Notes
                ---Color
                ---Location
-To Do Items{}
    -Task
    -ID (Auto from Mongoose)
    -Due?(if so)
        -Date
        -Time
    -Priority(1-Low, 2-LowMid, 3-Mid, 4-MidHigh, 5 High)
    -Location
    -Notes
    ---Users Involved

------------------------------ REST API Commands --------------------------------------

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


