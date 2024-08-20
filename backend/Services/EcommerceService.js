const axios = require('axios');
const sortingUtil = require('../Utils/Sorting');

const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const testServerUrl = 'http://20.244.56.144/test/companies/AMZ/categories/Phone/products?top=10&minPrice=1&maxPrice=100000'; // Replace with the actual test server URL

const generateUniqueId = (product, company) => {
    return `${company}-${product.id}`;
};

exports.fetchProducts = async (category, n, page, sortBy, sortOrder) => {
    const start = (page - 1) * n;
    const end = start + n;

    let allProducts = [];
    
    // Fetch products from each e-commerce API
    for (const company of companies) {
        const response = await axios.get(`${testServerUrl}/products`, {
            params: { category, company }
        });

        const products = response.data.map(product => ({
            ...product,
            id: generateUniqueId(product, company),
            company
        }));

        allProducts = allProducts.concat(products);
    }

    // Sort products based on query parameters
    if (sortBy) {
        allProducts = sortingUtil.sortProducts(allProducts, sortBy, sortOrder);
    }

    // Return paginated products
    return allProducts.slice(start, end);
};

exports.fetchProductDetails = async (category, productId) => {
    for (const company of companies) {
        const response = await axios.get(`${testServerUrl}/products`, {
            params: { category, company }
        });

        const product = response.data.find(p => generateUniqueId(p, company) === productId);
        if (product) {
            return { ...product, company };
        }
    }

    return null;
};