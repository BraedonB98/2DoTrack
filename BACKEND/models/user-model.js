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
    dashboardLayout: [
      [
        {
          feature: { type: String }, //item list or finance value
          reference: { type: String }, //location/id
          configuration: { type: String }, //modifiers
        },
      ],
    ],
  },
  toDoCategories: [
    {
      name: { type: String },
      icon: { type: String },
      toDoList: [{ type: mongoose.Types.ObjectId, ref: "ToDoItem" }],
    },
  ],
  pendingSharedTasks: [{ type: mongoose.Types.ObjectId, ref: "ToDoItem" }], //could just make this a category but easier to be able to clear occasionally this way
  financeAccounts: [
    {
      name: { type: String },
      balance: { type: Number },
      icon: { type: String },
      transactionList: [{ type: mongoose.Types.ObjectId, ref: "Transaction" }],
    },
  ],
  financeCategories: [
    {
      name: { type: String },
      icon: { type: String },
      transactionList: [{ type: mongoose.Types.ObjectId, ref: "Transaction" }],
    },
  ],
  recurringExpenses: [{ type: mongoose.Types.ObjectId, ref: "Transaction" }],
});

module.exports = mongoose.model("User", userSchema);
