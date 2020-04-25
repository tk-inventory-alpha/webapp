import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { FaList } from 'react-icons/fa';
import { useDispatch } from "react-redux";

import { Product, removeProduct, updateProduct } from "../../features/productSlice";
import * as ProductService from '../../services/product';

const StockedBackground = css`
  background: linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(44,172,44,1) 100%);
`;

const NotStockedBackground = css`
  background: linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(172,44,48,1) 100%);
`;

const PanelBlock = styled.div<{stocked?: boolean}>`
  ${({stocked}) => stocked ? StockedBackground : NotStockedBackground}

  progress {
    max-width: 5rem;
    margin-left: auto;
  }

  .buttons {
    visibility: hidden;
  }

  &:hover {
    > .buttons {
      visibility: visible;
      margin-left: auto;
    }
  }
`;

type Props = {
    product: Product;
}

const ProductListItem = ({ product }: Props) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)

    const handleToggle = useCallback(
        async () => {
            setLoading(true);

            const updatedProduct = {
                ...product,
                stocked: !product.stocked
            };

            await ProductService.update(updatedProduct);

            dispatch(updateProduct(updatedProduct));

            setLoading(false);
        },
        [product]
    );

    const handleDelete = useCallback(
        async () => {
            setLoading(true);

            await ProductService.remove(product);

            dispatch(removeProduct(product));

            setLoading(false);
        },
        [product]
    );

    if (isLoading) {
        return (
            <PanelBlock className="panel-block" stocked={product.stocked}>
                <span className="panel-icon"><FaList/></span>
                <span>{product.name}</span>
                <progress className="progress is-small is-primary" max="100">15%</progress>
            </PanelBlock>
        );
    }

    return (
        <PanelBlock className="panel-block" stocked={product.stocked}>
            <span className="panel-icon"><FaList/></span>
            <span>{product.name}</span>
            <div className="buttons">
                <button className="button is-small"
                        onClick={handleToggle}>
                    Toggle
                </button>
                <button className="button is-danger is-small"
                        onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </PanelBlock>
    );
}

export default ProductListItem;
