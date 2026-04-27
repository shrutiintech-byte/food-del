import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// PLACE ORDER
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // ✅ Stripe initialized here (SAFE)
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const { userId, items, amount, address } = req.body;

        // Create order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            payment: false
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 200
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false`
        });

        res.json({
            success: true,
            session_url: session.url
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Stripe order error" });
    }
};
 const verifyOrder = async(req,res)=>{
          const {orderId,success} = req.body;
          try {
            if(success=="true"){
                await orderModel.findByIdAndUpdate(orderId,{payment:true});
                res.json({success:true,message:"paid"})
            }
            else{
                await orderModel.findByIdAndDelete(orderId);
                res.json({success:false,message:"Not Paid"})
            }
          } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
            
          }
 }
 const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, verifyOrder, userOrders };