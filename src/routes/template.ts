import express from 'express';
import Template from '../models/Template';
import TemplateShape from '../models/TemplateShapes';

const templateRouter = express.Router();

templateRouter.post('/', async function (req, res) {
    try {
        const body = req.body;
        const result = await Template.create({ name: body.name });
        const shapesToStore = body.shapes.map((shape) => ({...shape, templateId: result.id}))
        const shapes = await TemplateShape.insertMany(shapesToStore);
        return res.status(200).json({id: result._id, name: result.name, shapes});
    } catch(error) {
        console.log("Error:", error);
        return res.status(500).json({})
    }
})

templateRouter.get('/', async function (req, res) {
    try {
        let result = await Template.find();
        if(!result.length) {
            return res.status(404).json({message: "Data not found"});
        }
        const finalresult = await Promise.all(result.map(async (record) => {
            const shapes = await TemplateShape.find({templateId: record.id});
            return {id: record.id, name: record.name, shapes}
        }))
        return res.status(200).json(finalresult);
    } catch(error) {
        console.log("Error:", error);
        return res.status(500).json({})
    }
});

templateRouter.delete('/:id', async function (req, res) {
    try {
        await Template.deleteOne({_id: req.params.id});
        await TemplateShape.deleteMany({templateId: req.params.id})
        return res.status(204).json({});
    } catch(error) {
        console.log("Error:", error);
        return res.status(500).json({})
    }
});

templateRouter.put('/:id', async function (req, res) {
    try {
        const body = req.body;
        const result = await Template.updateOne({ id: req.params.id }, {name: body.name});
        const shapesToStore = body.shapes.map(({_id, ...rest}) => ({...rest, templateId: req.params.id}));
        await TemplateShape.deleteMany({templateId: req.params.id})
        const shapes = await TemplateShape.insertMany(shapesToStore);
        return res.status(200).json({id: result.upsertedId, name: body.name, shapes});
    } catch(error) {
        console.log("Error:", error);
        return res.status(500).json({})
    }
});

export { templateRouter }
