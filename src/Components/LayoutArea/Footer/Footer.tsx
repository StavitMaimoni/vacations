import "./Footer.css";
import { MdOutlineTravelExplore } from "react-icons/md"


function Footer(): JSX.Element {
    return (
        <section className="footer">
            <div className="secContent container">
                <div className="Content container">
                    <div className="contactDiv flex">
                        <div className="text">
                            <small>KEEP IN TOUCH</small>
                            <h2>Travel with us</h2>
                            <div className="logoDiv">
                                <a href="#" className="logo flex">
                                    <MdOutlineTravelExplore className="icon" />  Travel.
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <p>All Rights Reserved &copy; </p>
            </div>
        </section>
    );
}

export default Footer;
