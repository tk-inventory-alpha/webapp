import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FaList, FaSearch } from 'react-icons/fa';
import { useSelector } from "react-redux";
import classNames from "classnames";

import AddProduct from "../AddProduct";
import { Product, selectAllProducts, selectNeededProducts, selectStockedProducts } from "../../features/productSlice";
import ProductListItem from "../ProductListItem";


enum Tabs {
    ALL,
    STOCKED,
    NEEDED
}

const TabToSelector = {
    [Tabs.ALL]: selectAllProducts,
    [Tabs.STOCKED]: selectStockedProducts,
    [Tabs.NEEDED]: selectNeededProducts
};

const Container = styled.div`

`;

const Tab = ({ label, active, onClick }: { label: string, active: boolean, onClick: any }) => (
    <a className={classNames({ 'is-active': active })}
        onClick={onClick}>
        {label}
    </a>
);

const TabList = [
    {
        label: 'All',
        id: Tabs.ALL,
    },
    {
        label: 'Stocked',
        id: Tabs.STOCKED
    },
    {
        label: 'Needed',
        id: Tabs.NEEDED
    }
];

const ProductList = () => {
    const [activeTab, setActiveTab] = useState(Tabs.ALL);
    const [searchFilter, setSearchFilter] = useState('');

    const products: Product[] = useSelector(
        TabToSelector[activeTab]
    );

    const filteredProducts = useMemo(
        () => {
            if (searchFilter) {
                return products.filter(product => product.name.toLowerCase().includes(searchFilter.toLowerCase()));
            }

            return products;
        },
        [products, searchFilter]
    );

    const onSearchChange = useCallback(
        (e) => {
            setSearchFilter(e.target.value);
        },
        []
    );

    return (
        <Container>
            <nav className="panel">
                <p className="panel-heading">
                    Inventory
                </p>
                <div className="panel-block">
                    <AddProduct/>
                </div>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <input className="input"
                               value={searchFilter}
                               onChange={onSearchChange}
                               type="text"
                               placeholder="Search"/>
                        <span className="icon is-left"><FaSearch/></span>
                    </p>
                </div>
                <p className="panel-tabs">
                    {TabList.map(({label, id}) => (
                        <Tab label={label}
                             key={label}
                             active={id === activeTab}
                             onClick={() => setActiveTab(id)}/>
                    ))}
                </p>
                {filteredProducts.map(product => (
                    <ProductListItem product={product} key={product.id} />
                ))}
            </nav>
        </Container>
    );
}

export default ProductList;
