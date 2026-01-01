import productModel from "../models/productModel.js";

export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All products",
      products,

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "getiing product failed",
    });
  }
};

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.status(200).send({
            success: true,
            message: "Single product Found successfully",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error,
            message: "Error while getting single product",
        })
    }
}

export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.productId).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error,
            message: "Error while getting product photo",
        })
    }
}
