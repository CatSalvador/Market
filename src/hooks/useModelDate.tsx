import { useSelector } from 'react-redux';
import {RootStateType} from "../store.tsx";
import orm from "../orm.tsx";

const getArrayData = (modelName: string, state: RootStateType) => {
    const session = orm.session(state.orm);
    if (modelName === 'Product') {
        const products = session['Product'].all().toModelArray();
        return products.map(product => ({
            ...product.ref,
            images: product.images,
            variations: product.variations,
        }));
    } else {
        return session[modelName].all().toModelArray().map(model => model.ref);
    }
};

const useModelData = (modelName: string) => {
    return useSelector((state: RootStateType) => getArrayData(modelName, state));
};

export default useModelData;