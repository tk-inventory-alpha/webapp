import React, { ReactNode } from 'react';

import Header from "../Header";

type Props = {
    children: ReactNode;
}

const Page = ({children}: Props) => (
    <div className="container">
        <Header />
        {children}
    </div>
);

export default Page;
