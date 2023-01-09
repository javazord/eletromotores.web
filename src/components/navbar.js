import React from "react";
import NavbarItem from "./navbar-item";

export default function Navbar() {

    return (


        <aside className="sidebar">
            <div className="toggle">
                <a href="#" className="burger js-menu-toggle" data-toggle="collapse" data-target="#main-navbar">
                    <span></span>
                </a>
            </div>
            <div className="side-inner">

                <div className="profile">
                    <img src="images/person_profile.jpg" alt="Image" className="img-fluid" />
                    <h3 className="name">Craig David</h3>
                    <span className="country">Web Designer</span>
                </div>


                <div className="nav-menu">
                    <ul>
                        <li className="accordion">
                            <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="collapsible">
                                <span className="icon-home mr-3"></span>Feed
                            </a>
                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne">
                                <div>
                                    <ul>
                                        <li><a href="#">News</a></li>
                                        <li><a href="#">Sport</a></li>
                                        <li><a href="#">Health</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="accordion">
                            <a href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" className="collapsible">
                                <span className="icon-search2 mr-3"></span>Explore
                            </a>

                            <div id="collapseTwo" className="collapse" aria-labelledby="headingOne">
                                <div>
                                    <ul>
                                        <li><a href="#">Interior</a></li>
                                        <li><a href="#">Food</a></li>
                                        <li><a href="#">Travel</a></li>
                                    </ul>
                                </div>
                            </div>

                        </li>
                        <li><a href="#"><span className="icon-notifications mr-3"></span>Notifications</a></li>
                        <li><a href="#"><span className="icon-location-arrow mr-3"></span>Direct</a></li>
                        <li><a href="#"><span className="icon-pie-chart mr-3"></span>Stats</a></li>
                        <li><a href="#"><span className="icon-sign-out mr-3"></span>Sign out</a></li>
                    </ul>
                </div>
            </div>

        </aside>



    )

}