const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    tittle: String,
    description: String,
    idCreator: Schema.Types.ObjectId
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
