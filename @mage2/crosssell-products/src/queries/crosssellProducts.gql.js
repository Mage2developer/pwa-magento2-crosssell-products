import { gql } from '@apollo/client';

export const GET_CART_DATA = gql`
    query GetCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
            items {
                id
                product {
                    sku
                    crosssell_products {
                        id
                        sku
                        name
                        small_image {
                            label
                            url
                        }
                        url_key
                        url_suffix
                        price_range {
                            minimum_price {
                                regular_price {
                                    currency
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
