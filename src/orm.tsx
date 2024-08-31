import {ORM} from "redux-orm";
import {CategorySchema} from "./redux/schemes/category-shema.tsx";
import {ProductSchema} from "./redux/schemes/product-shema.tsx";
import {ImageSchema} from "./redux/schemes/images-shema.tsx";
import {ProductVariationsSchema} from "./redux/schemes/product-variations-schema.tsx";

const orm = new ORM<typeof ProductSchema | typeof CategorySchema | typeof ImageSchema |  typeof ProductVariationsSchema>();

orm.register(ProductSchema, CategorySchema, ImageSchema, ProductVariationsSchema);

export default orm;