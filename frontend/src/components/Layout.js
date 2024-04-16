import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// Wrapper component for every page
const Layout = () => {
    const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

    return (
        <div>
            <div className="flex items-center justify-end p-4 bg-[rgb(57,65,80)] text-white">
                <h1 className='font-bold text-3xl pr-5'>EDUCRM</h1>
                <nav>
                    <section className="MOBILE-MENU flex lg:hidden">
                        <div
                            className="HAMBURGER-ICON space-y-2"
                            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
                        >
                            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        </div>

                        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                            <div
                                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                            >
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            </div>
                            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] text-black">
                                <li className="border-b border-gray-400 my-8 uppercase" onClick={() => setIsNavOpen(false)}>
                                    <p><Link to="/">Students</Link></p>
                                </li>
                                <li className="border-b border-gray-400 my-8 uppercase" onClick={() => setIsNavOpen(false)}>
                                    <p><Link to="/teachers">Teachers</Link></p>
                                </li>
                                <li className="border-b border-gray-400 my-8 uppercase" onClick={() => setIsNavOpen(false)}>
                                    <p><Link to="/programs">Programs</Link></p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
                        <li>
                            <p><Link to="/">Students</Link></p>
                        </li>
                        <li>
                            <p><Link to="/teachers">Teachers</Link></p>
                        </li>
                        <li>
                            <p><Link to="/programs">Programs</Link></p>
                        </li>
                    </ul>
                </nav>
                <style>{`
                .hideMenuNav {
                    display: none;
                }
                .showMenuNav {
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    background: white;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                }
                `}</style>
            </div>
            <Outlet />
        </div>
    )
}

export default Layout


