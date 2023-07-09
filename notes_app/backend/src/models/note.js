import mongoose from "mongoose";
import dotenv from "dotenv"
mongoose.set("strictQuery", false);
dotenv.config();

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 3,
        required: true
    },
    important: Boolean,
});

noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Note = mongoose.model("Note", noteSchema);
export { Note };
