import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useCartContext } from "@magento/peregrine/lib/context/cart";

export const useCrosssell = props => {
    const {
        getCartData
    } = props;

    const [{ cartId }] = useCartContext();

    const { data, error } = useQuery(getCartData, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !cartId,
        variables: { cartId }
    });

    const hasItems = !!(data && data.cart.total_quantity);

    const cartItems = useMemo(() => {
        return (data && data.cart.items) || [];
    }, [data]);

    var arrProductSkus = [];
    var arrCrosssellSkus = [];
    var arrCrosssellProducts = [];

    if (cartItems.length > 0) {
        cartItems.map((item) => {
            arrProductSkus.push(item.product.sku);

            const crosssellObj = item.product.crosssell_products;
            crosssellObj.map((prod) => {
                const productSku = prod.sku;
                arrCrosssellSkus.push(productSku);
                arrCrosssellProducts[productSku] = prod;
            });
        });
    }

    const crosssellSkus = arrCrosssellSkus.filter(x => !arrProductSkus.includes(x));
    if (crosssellSkus.length > 5) {
        crosssellSkus.splice(4);
    }

    var arrFinalProducts = [];
    crosssellSkus.forEach(function (sku) {
        arrFinalProducts.push(arrCrosssellProducts[sku]);
    });

    return {
        hasItems,
        error,
        crosssellProducts: arrFinalProducts
    };
};
