import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TemplateShape = new Schema({
    templateId: {
        type: mongoose.Types.ObjectId,
        ref: "Template",
        required: true},
    x: {
        type: Number,
        required: true
    }, 
    y: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    }
});

export default mongoose.model('TemplateShape', TemplateShape);