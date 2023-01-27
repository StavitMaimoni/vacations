import "./Navbar.css";
import { MdOutlineTravelExplore } from 'react-icons/md';
import AuthMenu from "../../../AuthArea/AuthMenu/AuthMenu";


function Navbar(): JSX.Element {

    return (
        <section className="navBarSection">
            <div className="navbar flex">
                <div className="logoDiv">
                    <a href="#" className="logo flex">
                        <h1> <MdOutlineTravelExplore className="icon" />Travel.</h1>
                    </a>
                </div>

                <AuthMenu />
            </div>
        </section>
    )
}

export default Navbar;