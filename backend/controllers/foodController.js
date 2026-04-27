import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food items
const addFood = async (req, res) => {
    try {
        // check image
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
            image: image_filename
        });

        await food.save();

        res.json({
            success: true,
            message: "Food added successfully"
        });

    } catch (error) {
        console.log("ERROR:", error);

        // delete uploaded image if something fails
        if (req.file) {
            fs.unlink(`uploads/${req.file.filename}`, (err) => {
                if (err) console.log("File delete error:", err);
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// all list food 
const listFood= async(req,res)=>{
try {
    const foods=await foodModel.find({});
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
}
}

//remove food item
//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // ✅ added check (IMPORTANT)
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        fs.unlink(`uploads/${food.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food removed" });

    } catch (error) {
        console.log(error);

        // ✅ small improvement (shows real error)
        res.json({ success: false, message: error.message });
    }
}

export { addFood, listFood, removeFood };