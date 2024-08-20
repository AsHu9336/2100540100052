const ecommerceService = require('../Services/EcommerceService');

exports.getTopProducts = async (req, res) => {
    try {
        const { categoryname } = req.params;
        const { n = 10, page = 1, sort_by, sort_order = 'asc' } = req.query;

        // Fetch and aggregate products from all e-commerce APIs
        const products = await ecommerceService.fetchProducts(categoryname, n, page, sort_by, sort_order);
        console.log(products.json())

         res.json(products);
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const { categoryname, productid } = req.params;
        const product = await ecommerceService.fetchProductDetails(categoryname, productid);

        console.log(product)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }


        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};