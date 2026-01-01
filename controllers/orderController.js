import orderModel from "../models/orderModel.js";
export const createOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    const order = await new orderModel({
      products: cart,
      payment: { success: true },
      buyer: req.user._id,
    }).save();
    res.status(201).json({ 
      ok: true,
      message: "Order created successfully",
      order 
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while creating order",
      error,
    });
  }
};


export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ buyer: req.user._id });
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};
