
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Template = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model('Template', Template);
