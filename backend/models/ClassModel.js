import mongoose, { mongo } from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Classname is required"],
      trim: true,
    },
    section: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    room: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Class Code is required"],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    assignments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assignments",
    },
    quizassignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizassignments",
      },
    ],
    materials: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Materials",
    },
  },
  {
    timestamps: true,
  }
);

const ClassModel = mongoose.model("Classes", ClassSchema);

export default ClassModel;
