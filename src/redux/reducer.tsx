import orm from '../orm.tsx';
import {ADD_PRODUCTS, ADD_CATEGORIES, ADD_IMAGES, ADD_PRODUCT_VARIATIONS, RESET_PRODUCTS} from './actions';

const ormReducer = (state, action) => {
    const session = orm.session(state || orm.getEmptyState());

    switch (action.type) {
        case ADD_PRODUCTS:
            action.payload.forEach(product => {
                session['Product'].upsert(product);
            });
            break;
        case RESET_PRODUCTS:
            session['Product'].all().toModelArray().forEach(product => product.delete());
            break;
        case ADD_CATEGORIES:
            action.payload.forEach(category => {
                session['Category'].upsert(category);
            });
            break;
        case ADD_IMAGES:
            action.payload.forEach(image => {
                session['Image'].upsert(image);
            });
            break;
        case ADD_PRODUCT_VARIATIONS:
            action.payload.forEach(variation => {
                session['ProductVariations'].upsert(variation);
            });
            break;
        default:
            break;
    }

    return session.state;
};

export default ormReducer;