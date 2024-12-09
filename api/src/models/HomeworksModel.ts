import { model, Schema } from "mongoose";
import { IHomework } from "../GlobalTypes";



const HomeworkSchema = new Schema<IHomework>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

export const HomeworkModel = model("homeworks", HomeworkSchema);