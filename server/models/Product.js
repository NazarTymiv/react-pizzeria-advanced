import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        id: Number,
        imageUrl: String,
        title: String,
        types: Array,
        sizes: Array,
        price: Number,
        category: Number,
        rating: Number,
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
