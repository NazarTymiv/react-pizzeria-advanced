import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const { category, sortType, search, page, limit } = req.query;

        const products = await Product.find(
            category === "0" ? {} : { category }
        )
            .sort(sortType)
            .sort({ _id: 1 })
            .where({
                title: { $regex: String(search).toLowerCase(), $options: "i" },
            })
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await Product.count(
            category === "0" ? null : { category }
        ).where({
            title: { $regex: String(search).toLowerCase(), $options: "i" },
        });

        res.status(200).json({
            items: products,
            totalPages: Math.ceil(count / limit),
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.find({ id });

        res.status(200).json({ currentItem: product });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
