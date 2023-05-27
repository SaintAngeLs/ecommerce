import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect()

    if(method === 'POST')
    {
        const {name, parentCategory} = req.body;
        const categoryDocument = await Category.create({name, parentCategory: parentCategory});
        res.json(categoryDocument);
    }

    if(method === 'GET')
    {
        res.json(await Category.find().populate('parentCategory'))
    }
    if(method == 'PUT')
    {
        const {name, parentCategory, _id} = req.body;
        const categoryDocument = await Category.updateOne({_id},{name, parentCategory: parentCategory});
        res.json(categoryDocument);
    }
    if(method === 'DELETE')
    {
        const {_id} = req.query;
        await Category.deleteOne({_id:_id});
        res.json('ok')
    }
}