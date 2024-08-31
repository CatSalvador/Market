import { Model, attr, fk } from 'redux-orm';

export interface ImageFields {
    id: number
    image_name: string
    image_url: string
    product_id: number
}
export class ImageSchema extends Model<typeof ImageSchema, ImageFields> {
    static modelName = 'Image';

    static fields = {
        id: attr(),
        image_name: attr(),
        image_url: attr(),
        product_id: fk('Product', 'productImages'),
    };
}

