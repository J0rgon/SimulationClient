import { Link } from "react-router";
import logo from "../../logo.svg";

function MainNavBar() {
    return (
        <div className="bg-cyan-500 shadow-2xl flex w-full top-0 z-50 fixed gap-4 left-0 h-20 items-center justify-center">
            <Link to={"/"} className="px-8 py-4 hover:bg-blue-100 hover:text-cyan-500 hover:cursor-pointer transition-colors duration-300">
                Home
            </Link>
            <Link to={"/menu"} className="px-8 py-4 hover:bg-blue-100 hover:text-cyan-500 hover:cursor-pointer transition-colors duration-300">
                Menu
            </Link>
            <Link to={"/about"} className="px-8 py-4 hover:bg-blue-100 hover:text-cyan-500 hover:cursor-pointer transition-colors duration-300">
                About
            </Link>
        </div>
    );
}

export default MainNavBar;