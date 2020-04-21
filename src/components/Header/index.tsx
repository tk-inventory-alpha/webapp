import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
    const [headerIsOpen, setHeaderIsOpen] = useState(false);

    return (
        <nav className="navbar"
             role="navigation"
             aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    Inventory {'<Alpha />'}
                </a>

                <a role="button"
                   className={`navbar-burger ${headerIsOpen && 'is-active'}`}
                   onClick={() => setHeaderIsOpen(prev => !prev)}
                   aria-label="menu"
                   aria-expanded="false">
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            </div>

            <div className={`navbar-menu ${headerIsOpen && 'is-active'}`}>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-light"
                               href="https://github.com/tk-guestbook/">
                            <span className="icon">
                                <FaGithub/>
                            </span>
                                <span>
                                Github
                            </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Header;
