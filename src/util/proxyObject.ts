import { convertUSDtoVND } from './money';

interface Product {
    brand: string;
    category: string;
    description: string;
    discount: number;
    image: string;
    name: string;
    price: number;
    slug: string;
    tags: string[];
}

interface OrderItem {
    product: Product;
    quantity: number;
}

interface TransformedItem {
    itemid: string;
    itename: string;
    itemprice: number;
    itemquantity: number;
}

const proxyObj = {
    transformOrderItems(orderItems: OrderItem[]): TransformedItem[] {
        return orderItems.map((item) => {
            return {
                itemid: item.product.slug,
                itename: item.product.name,
                itemprice: convertUSDtoVND(item.product.price), // Chuyển đổi giá sang VND và làm tròn đến hàng nghìn
                itemquantity: item.quantity,
            };
        });
    },
};

export default proxyObj;
