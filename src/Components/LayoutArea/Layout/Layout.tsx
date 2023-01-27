import Footer from "../Footer/Footer";
import Header from "../Header/Header/Header";
import Navbar from "../Header/Navbar/Navbar";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Navbar />
                <Header />
            </header>
            <main>
                <Routing />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
