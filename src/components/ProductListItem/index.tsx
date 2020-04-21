import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FaList } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { Product } from "../../features/productSlice";

const PanelBlock = styled.div`
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
    const [isLoading, setLoading] = useState()

    const handleToggle = useCallback(
        () => {

        },
        [product]
    );

    const handleDelete = useCallback(
        () => {

        },
        [product]
    );

    if (isLoading) {
        return (
            <PanelBlock className="panel-block">
                <progress className="progress is-small is-primary" max="100">15%</progress>
            </PanelBlock>
        );
    }

    return (
        <PanelBlock className="panel-block">
            <span className="panel-icon"><FaList/></span>
            <span>{product.name}</span>
            <div className="buttons">
                <button className="button is-small">
                    Toggle
                </button>
                <button className="button is-danger is-small">
                    Delete
                </button>
            </div>
        </PanelBlock>
    );
}

export default ProductListItem;
