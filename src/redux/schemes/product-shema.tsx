import { Model, attr, fk } from 'redux-orm';

export interface ProductFields {
    id: number;
    name: string;
    description: string;
    category_id: number;
}

export class ProductSchema extends Model<typeof ProductSchema, ProductFields> {
    static modelName = 'Product';

    static fields = {
        id: attr(),
        name: attr(),
        description: attr(),
        category_id: fk('Category', 'products'),
    };

    get images() {
        return this['productImages'].toModelArray().map(image => image.ref);
    }

    get variations() {
        return this['productVariations'].toModelArray().map(image => image.ref).sort((imageA, imageB) => imageA.price - imageB.price);
    }
}