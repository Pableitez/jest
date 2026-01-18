// product.test.js
const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe("Adding Products", () => {
    test("should add a product", () => {
        const product = addProduct("Camiseta", 20);
        expect(getProducts()).toContainEqual(product);
    });

    test("should increment the id by 1 each time", () => {
        const p1 = addProduct("Camiseta", 20);
        const p2 = addProduct("Pantalón", 30);
        expect(p2.id).toBe(p1.id + 1);
    });

    test("should throw error if name or price is missing", () => {
        expect(() => addProduct(undefined, 20)).toThrow("Nombre y precio son requeridos");
        expect(() => addProduct("Zapato")).toThrow("Nombre y precio son requeridos");
    });

    test("should throw error if product already exists", () => {
        addProduct("Camiseta", 20);
        expect(() => addProduct("Camiseta", 25)).toThrow("El producto ya existe");
    });
});

describe("Removing Products", () => {
    test("should remove a product", () => {
        const product = addProduct("Camiseta", 20);
        removeProduct(product.id);
        expect(getProducts()).not.toContainEqual(product);
    });

    test("should throw error if product does not exist", () => {
        expect(() => removeProduct(999)).toThrow("Producto no encontrado");
    });
});

describe("Getting a single product", () => {
    test("should get a product", () => {
        const product = addProduct("Camiseta", 20);
        expect(getProduct(product.id)).toEqual(product);
    });

    test("should throw error if product does not exist", () => {
        expect(() => getProduct(999)).toThrow("Producto no encontrado");
    });
});

describe("Updating Products", () => {
    test("should update a product", () => {
        const product = addProduct("Camiseta", 20);
        const updated = updateProduct(product.id, "Camiseta XL", 25);
        expect(updated.name).toBe("Camiseta XL");
        expect(updated.price).toBe(25);
    });

    test("should throw error if product does not exist", () => {
        expect(() => updateProduct(999, "Nombre", 50)).toThrow("Producto no encontrado");
    });

    test("should only update the price", () => {
        const product = addProduct("Camiseta", 20);
        const updated = updateProduct(product.id, undefined, 30);
        expect(updated.name).toBe("Camiseta");
        expect(updated.price).toBe(30);
    });

    test("should only update the name", () => {
        const product = addProduct("Camiseta", 20);
        const updated = updateProduct(product.id, "Camiseta XL");
        expect(updated.name).toBe("Camiseta XL");
        expect(updated.price).toBe(20);
    });
});
