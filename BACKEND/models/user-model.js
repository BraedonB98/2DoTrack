const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  //id
  subscription: { type: String },
  imageUrl: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  password: { type: String },
  preferences: {
    notificationTime: { type: Number },
    notificationType: { type: String },
    notificationToDo: { type: Boolean },
    notificationFinance: { type: Boolean },
  },
  toDoCategories: [
    {
      name: { type: String },
      icon: { type: String },
      toDoList: [{ type: mongoose.Types.ObjectId, ref: "ToDoItem" }],
    },
  ],
  recurringTasks: [{ type: mongoose.Types.ObjectId, ref: "ToDoItem" }], //may have some issue making shared enter recurring folder
  pendingSharedTasks: [{ type: mongoose.Types.ObjectId, ref: "ToDoItem" }], //could just make this a category but easier to be able to clear occasionally this way
  financeAccounts: [
    {
      account: { type: String },
      balance: { type: Number },
      financeCategories: [
        {
          category: { type: String },
          transactionList: [
            { type: mongoose.Types.ObjectId, ref: "Transaction" },
          ],
        },
      ],
    },
  ],
  recurringExpenses: [{ type: mongoose.Types.ObjectId, ref: "Transaction" }],
  conversationSID: { type: String },
});

module.exports = mongoose.model("User", userSchema);
