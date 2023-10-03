import React from 'react'

interface Props { }

function Home(props: Props) {
    const { } = props

    return (
        <div>
            <div className="header_section">

                <div className="header_left">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="logo"><a href="index.html"><img src="images/logo.png" /></a></div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="index.html">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="about.html">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="services.html">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="team.html">Team</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="contact.html">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="banner_main">
                        <h1 className="banner_taital">financial <br />Service</h1>
                        <p className="banner_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
                        <div className="btn_main">
                            <div className="more_bt"><a href="#">Read More </a></div>
                            <div className="contact_bt"><a href="#">Contact Us</a></div>
                        </div>
                    </div>
                </div>
                <div className="header_right">
                    <img src="images/banner-img.png" className="banner_img" />
                </div>
            </div>


            <div className="services_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="services_taital">WELCOME TO FINAnCIAL SERVICES</h1>
                            <p className="services_text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it </p>
                            <div className="moremore_bt"><a href="#">Read More </a></div>
                        </div>
                        <div className="col-md-4">
                            <div><img src="images/img-1.png" className="image_1" /></div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="what_we_do_section layout_padding">
                <div className="container">
                    <h1 className="what_taital">WHAT WE DO</h1>
                    <p className="what_text">It is a long established fact that a reader will be distracted by the readable content of a </p>
                    <div className="what_we_do_section_2">
                        <div className="row">
                            <div className="col-lg-3 col-sm-6">
                                <div className="box_main">
                                    <div className="icon_1"><img src="images/icon-1.png" /></div>
                                    <h3 className="accounting_text">Accounting</h3>
                                    <p className="lorem_text">Lorem Ipsum is simply dummy text of the printing and</p>
                                    <div className="moremore_bt_1"><a href="#">Read More </a></div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="box_main active">
                                    <div className="icon_1"><img src="images/icon-2.png" /></div>
                                    <h3 className="accounting_text">Advisor</h3>
                                    <p className="lorem_text">Lorem Ipsum is simply dummy text of the printing and</p>
                                    <div className="moremore_bt_1"><a href="#">Read More </a></div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="box_main">
                                    <div className="icon_1"><img src="images/icon-3.png" /></div>
                                    <h3 className="accounting_text">Investment</h3>
                                    <p className="lorem_text">Lorem Ipsum is simply dummy text of the printing and</p>
                                    <div className="moremore_bt_1"><a href="#">Read More </a></div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="box_main">
                                    <div className="icon_1"><img src="images/icon-4.png" /></div>
                                    <h3 className="accounting_text">Financial</h3>
                                    <p className="lorem_text">Lorem Ipsum is simply dummy text of the printing and</p>
                                    <div className="moremore_bt_1"><a href="#">Read More </a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="project_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="project_main">
                                <h1 className="services_taital">Our projects</h1>
                                <p className="services_text">It is a long established fact that a reader will be distracted by the readable content of a </p>
                                <div className="moremore_bt"><a href="#">Read More </a></div>
                                <div className="image_6"><img src="images/img-6.png" /></div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="images_main">
                                <div className="images_left">
                                    <div className="container_1">
                                        <img src="images/img-2.png" alt="Avatar" className="image" />
                                        <div className="middle">
                                            <div className="text"><img src="images/search-icon.png" /></div>
                                            <h2 className="fact_text">Established Fact</h2>
                                        </div>
                                    </div>
                                    <div className="container_1">
                                        <img src="images/img-3.png" alt="Avatar" className="image" />
                                        <div className="middle">
                                            <div className="text"><img src="images/search-icon.png" /></div>
                                            <h2 className="fact_text">Established Fact</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="images_right">
                                    <div className="container_1">
                                        <img src="images/img-4.png" alt="Avatar" className="image" />
                                        <div className="middle">
                                            <div className="text"><img src="images/search-icon.png" /></div>
                                            <h2 className="fact_text">Established Fact</h2>
                                        </div>
                                    </div>
                                    <div className="container_1">
                                        <img src="images/img-5.png" alt="Avatar" className="image" />
                                        <div className="middle">
                                            <div className="text"><img src="images/search-icon.png" /></div>
                                            <h2 className="fact_text">Established Fact</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="project_section_2 layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="icon_1"><img src="images/icon-3.png" /></div>
                            <h3 className="accounting_text_1">1000+</h3>
                            <p className="yers_text">Years of Business</p>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="icon_1"><img src="images/icon-4.png" /></div>
                            <h3 className="accounting_text_1">20000+</h3>
                            <p className="yers_text">Projects Delivered</p>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="icon_1"><img src="images/icon-2.png" /></div>
                            <h3 className="accounting_text_1">10000+</h3>
                            <p className="yers_text">Satisfied Customers</p>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="icon_1"><img src="images/icon-1.png" /></div>
                            <h3 className="accounting_text_1">1500+</h3>
                            <p className="yers_text">Services</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="team_section layout_padding">
                <div className="container">
                    <h1 className="what_taital">Our Team and experts</h1>
                    <p className="what_text_1">It is a long established fact that a reader will be distracted by the readable content of a </p>
                    <div className="team_section_2 layout_padding">
                        <div className="row">
                            <div className="col-sm-3">
                                <img src="images/img-7.png" className="image_7" />
                                <p className="readable_text">Readable</p>
                                <p className="readable_text_1">Follow Us</p>
                                <div className="social_icon">
                                    <ul>
                                        <li><a href="#"><img src="images/fb-icon.png" /></a></li>
                                        <li><a href="#"><img src="images/twitter-icon.png" /></a></li>
                                        <li><a href="#"><img src="images/linkedin-icon.png" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <img src="images/img-8.png" className="image_7" />
                                <p className="readable_text">Content</p>
                                <p className="readable_text_1">Follow Us</p>
                                <div className="social_icon">
                                    <ul>
                                        <li><a href="#"><img src="images/fb-icon.png" /></a></li>
                                        <li><a href="#"><img src="images/twitter-icon.png" /></a></li>
                                        <li><a href="#"><img src="images/linkedin-icon.png" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <img src="images/img-9.png" className="image_7" />
                                <p className="readable_text">Readable</p>
                                <p className="readable_text_1">Follow Us</p>
                                <div className="social_icon">
                                    <ul>
                                        <li><a href="#"><img src="images/fb-icon.png" /></a></li>
                                        <li><a href="#"><img src="images/twitter-icon.png" /></a></li>
                                        <li><a href="#"><img src="images/linkedin-icon.png" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <img src="images/img-10.png" className="image_7" />
                                <p className="readable_text">Content</p>
                                <p className="readable_text_1">Follow Us</p>
                                <div className="social_icon">
                                    <ul>
                                        <li><a href="#"><img src="images/fb-icon.png" /></a></li>
                                        <li><a href="#"><img src="images/twitter-icon.png" /></a></li>
                                        <li><a href="#"><img src="images/linkedin-icon.png" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="client_section layout_padding">
                <div className="container">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <h1 className="what_taital">what is syas our clients</h1>
                                <div className="client_section_2 layout_padding">
                                    <ul>
                                        <li><img src="images/round-1.png" className="round_1" /></li>
                                        <li><img src="images/img-11.png" className="image_11" /></li>
                                        <li><img src="images/round-2.png" className="round_2" /></li>
                                    </ul>
                                    <p className="dummy_text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <h1 className="what_taital">what is syas our clients</h1>
                                <div className="client_section_2 layout_padding">
                                    <ul>
                                        <li><img src="images/round-1.png" className="round_1" /></li>
                                        <li><img src="images/img-11.png" className="image_11" /></li>
                                        <li><img src="images/round-2.png" className="round_2" /></li>
                                    </ul>
                                    <p className="dummy_text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <h1 className="what_taital">what is syas our clients</h1>
                                <div className="client_section_2 layout_padding">
                                    <ul>
                                        <li><img src="images/round-1.png" className="round_1" /></li>
                                        <li><img src="images/img-11.png" className="image_11" /></li>
                                        <li><img src="images/round-2.png" className="round_2" /></li>
                                    </ul>
                                    <p className="dummy_text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="footer_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <h4 className="about_text">About Financial</h4>
                            <div className="location_text"><img src="images/map-icon.png" /><span className="padding_left_15">Locations</span></div>
                            <div className="location_text"><img src="images/call-icon.png" /><span className="padding_left_15">+01 9876543210</span></div>
                            <div className="location_text"><img src="images/mail-icon.png" /><span className="padding_left_15">demo@gmail.com</span></div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <h4 className="about_text">About Financial</h4>
                            <p className="dolor_text">ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <h4 className="about_text">Instagram</h4>
                            <div className="footer_images">
                                <div className="footer_images_left">
                                    <div className="image_12"><img src="images/img-12.png" /></div>
                                    <div className="image_12"><img src="images/img-12.png" /></div>
                                    <div className="image_12"><img src="images/img-12.png" /></div>
                                </div>
                                <div className="footer_images_right">
                                    <div className="image_12"><img src="images/img-12.png" /></div>
                                    <div className="image_12"><img src="images/img-12.png" /></div>
                                    <div className="image_12"><img src="images/img-12.png" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <h4 className="about_text">Newsletter</h4>
                            <input type="text" className="mail_text" placeholder="Enter your email" name="Enter your email" />
                            <div className="subscribe_bt"><a href="#">Subscribe</a></div>
                            <div className="footer_social_icon">
                                <ul>
                                    <li><a href="#"><img src="images/fb-icon1.png" /></a></li>
                                    <li><a href="#"><img src="images/twitter-icon1.png" /></a></li>
                                    <li><a href="#"><img src="images/linkedin-icon1.png" /></a></li>
                                    <li><a href="#"><img src="images/youtub-icon1.png" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="copyright_section">
                        <div className="copyright_text">Copyright 2019 All Right Reserved By <a href="https://html.design">Free html  Templates</a></div>
                    </div>
                </div>
            </div>



        </div>

    )
}

export default Home
