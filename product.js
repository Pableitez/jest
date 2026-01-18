// product.js

let products = [];
let id = 0;

// Reinicia la lista de productos y el id
function resetProducts() {
    products = [];
    id = 0;
}

// Devuelve todos los productos
function getProducts() {
    return products;
}

// Agrega un producto
function addProduct(name, price) {
    if (name === undefined || price === undefined) {
        throw new Error("Nombre y precio son requeridos");
    }

    // Verificar si ya existe un producto con el mismo nombre
    const exists = products.some(p => p.name === name);
    if (exists) {
        throw new Error("El producto ya existe");
    }

    const product = { id, name, price };
    products.push(product);
    id += 1;
    return product;
}

// Elimina un producto por id
function removeProduct(productId) {
    const index = products.findIndex(p => p.id === productId);
    if (index === -1) {
        throw new Error("Producto no encontrado");
    }
    products.splice(index, 1);
}

// Obtiene un producto por id
function getProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        throw new Error("Producto no encontrado");
    }
    return product;
}

// Actualiza un producto
function updateProduct(productId, name, price) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        throw new Error("Producto no encontrado");
    }
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    return product;
}

module.exports = {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct
};
