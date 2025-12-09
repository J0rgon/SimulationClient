import { Link } from "react-router";

function MenuPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h1 className="text-5xl font-bold my-4 leading-tight">Simulations</h1>
            <p>Here you can find a collection of visual simulations on an ideally expanding catalog</p>
            <hr></hr>
            <h2 className="my-8 text-3xl">Numerical Integrals</h2>
            <div className="grid grid-cols-2">
                <Link to={"/"} className="bg-cyan-500 p-2 m-1 rounded-xs">Trapezoid</Link>
                <Link to={"/"} className="bg-cyan-500 p-2 m-1 rounded-xs">Simpson's Rule</Link>
            </div>
            <h2 className="my-8 text-3xl">Numerical Solves</h2>
            <div className="grid grid-cols-2">
                <Link to={"/simulations/bisection"} className="bg-cyan-500 p-2 m-1 rounded-xs">Bisection</Link>
                <Link to={"/"} className="bg-cyan-500 p-2 m-1 rounded-xs">Fixed point</Link>
                <Link to={"/"} className="bg-cyan-500 p-2 m-1 rounded-xs">Aitken</Link>
                <Link to={"/"} className="bg-cyan-500 p-2 m-1 rounded-xs">Steffensen</Link>
            </div>
        </div>
    );
}

export default MenuPage;