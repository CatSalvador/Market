import { Model, attr, fk } from 'redux-orm';

export interface ProductVariationsFields {
    id: number
    price: string
    stock: number
    product_id: number
}
export class ProductVariationsSchema extends Model<typeof ProductVariationsSchema, ProductVariationsFields> {
    static modelName = 'ProductVariations';

    static fields = {
        id: attr(),
        price: attr(),
        stock: attr(),
        product_id: fk('Product', 'productVariations'),
    };
}

