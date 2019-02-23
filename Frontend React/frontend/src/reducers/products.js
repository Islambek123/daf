import { SET_PRODUCTS, ADD_PRODUCT, PRODUCT_FETCHED, PRODUCT_UPDATED, PRODUCT_DELETED } from "../Octions";
export default function products(state=[], action={}) {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.products;
        case ADD_PRODUCT:
            return [
                ...state,
                action.product
            ];

        case PRODUCT_DELETED:
            return state.filter(item => item.id != action.productId);
        case PRODUCT_FETCHED:
            const index = state.findIndex(item => item.id == action.product.id);
            if (index > -1) {
                return state.map(item => {
                    if (item.id == action.product.id) return action.product;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.product
                ]
            }

        case PRODUCT_UPDATED:
        //return Object.assign({}, state, action.game);
            return state.map(item => {
                if (item.id == action.product.id) return action.product;
                return item;
            });
        default: return state;
    }
}