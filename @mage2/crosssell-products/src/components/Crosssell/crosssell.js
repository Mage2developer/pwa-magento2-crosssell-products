import React from "react";
import { FormattedMessage } from 'react-intl';
import { Link, resourceUrl } from '@magento/venia-drivers';
import ErrorView from "@magento/venia-ui/lib/components/ErrorView";
import Image from "@magento/venia-ui/lib/components/Image";
import Price from "@magento/venia-ui/lib/components/Price";
import {UNCONSTRAINED_SIZE_KEY} from "@magento/peregrine/lib/talons/Image/useImage";
import { useCrosssell } from "../../talons/useCrosssell";
import { GET_CART_DATA } from "../../queries/crosssellProducts.gql";

import defaultClasses from './crosssell.css';

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const Crosssell = () => {

    const talonProps = useCrosssell({
        getCartData: GET_CART_DATA
    });

    const {
        hasItems,
        error,
        crosssellProducts
    } = talonProps;

    const classes = defaultClasses;

    if (error) {
        return <ErrorView message={error.message} />;
    }

    const crosssellItems = hasItems ? crosssellProducts.map((item) => {

        const productLink = resourceUrl(`/${item.url_key}${item.url_suffix || ''}`);

        return (
            <div className={classes.item}>
                <Link
                    to={productLink}
                    className={classes.images}
                >
                    <Image
                        alt={item.small_image.label}
                        classes={{
                            image: classes.image,
                            root: classes.imageContainer
                        }}
                        height={IMAGE_HEIGHT}
                        resource={item.small_image.url}
                        widths={IMAGE_WIDTHS}
                    />
                </Link>
                <Link
                    to={productLink}
                    className={classes.name}
                >
                    <span>{item.name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={item.price_range.minimum_price.regular_price.value}
                        currencyCode={item.price_range.minimum_price.regular_price.currency}
                    />
                </div>
            </div>
        );
    }) : null;

    const crosssellProductsContent = crosssellProducts ? (
        <div className={classes.productsContainer}>
            <h3 className={classes.heading}>
                <FormattedMessage
                    id={'crosssell.crosssell'}
                    defaultMessage={'Crosssell Products'}
                />
            </h3>
            <div className={classes.root}>
                <div className={classes.items}>
                    {crosssellItems}
                </div>
            </div>
        </div>
    ) : null;

    return (
        crosssellProductsContent
    );
}

export default Crosssell;
