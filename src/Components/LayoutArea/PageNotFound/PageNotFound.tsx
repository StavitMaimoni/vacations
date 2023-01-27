import "./PageNotFound.css";
import imageNotFound from "../../../Assets/Images/pageNotFound.jpg"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={imageNotFound} />
        </div>
    );
}

export default PageNotFound;
