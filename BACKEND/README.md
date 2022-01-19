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
    -To Do Catagories[]
        -To Do List{} //single catagory object
            -Name
            -ToDoItems[]
                -ToDoItem (Mongoose Oject)
    -Recurring Expenses[] //will update every set amount of time
        -...Finance Item{}
            -Reaccuring time frame
    -Finance Accounts[]  //Business, Personal,ext
        -Balance
        -Finance Catagory[] //create new or use existing
            -FinanceItem(Mongoose Object)
            
To Do Item{}
    -Task
    -ID (Auto from Mongoose)
    -Due?(if so)
        -Date
        -Time
    -Priority(1-Low, 2-LowMid, 3-Mid, 4-MidHigh, 5 High)
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

-POST/API/:UID/Catagories -New Catagory 
    -(Auth, Todo Catagory Name)
    -Creates new empty array with Name in USER->TO DO Catagories -> Name[]

-PATCH/API/:UID/Catagories -Rename Catagory
    -(Auth, Previous Catagory Name, New Catagory Name)
    -Finds Previous CatagoryName in  USER->TO DO Catagories -> Name[], If its there then it will duplicate the found array to a new array with a new Name

-DELETE/API/:UID/Catagories -Delete Catagory
    -(Auth, Catagory)
    -Deletes Catagory and all TODO Items in catagory 

-GET/API/:UID/Catagories -Get Catagorys
    -(Auth)
    -returns all catagories user has

-GET/API/:UID/Catagories/:Catagory
    -(Auth)
    -returns specific catagory requested


