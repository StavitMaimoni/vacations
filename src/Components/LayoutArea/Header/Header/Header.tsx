import "./Header.css";
import video from "../../../../Assets/Videos/video.mp4"

function Header(): JSX.Element {

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); // Scrolls the window smoothly to a set position.

    return (
            <section className="header">
                <div className="headerVideo">
                    <video src={video} muted autoPlay loop typeof="video/mp4"></video>
                </div>
                <div className="headerContent container">
                    <div className="textDiv">
                        <h1 className="headerTitle">
                            Find your best holiday here..
                        </h1>
                    </div>
                </div>
            </section >
    )
}

export default Header;