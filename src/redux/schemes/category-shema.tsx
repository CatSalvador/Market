import {Model, attr} from 'redux-orm';

export interface CategoryFields {
    id: number;
    name: string;
    parent_id: number;
}

export class CategorySchema extends Model<typeof CategorySchema, CategoryFields> {
    static modelName = 'Category';

    static fields = {
        id: attr(),
        name: attr(),
        parent_id: attr(),
    };
}

