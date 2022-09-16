import { Link } from "react-router-dom"

export const Nav = () => {

    return (
        <div className="absolute w-full">
            <nav className=" p-2 relative container rounded bg-blue-700 mx-auto ">
                <div className="flex text-center justify-between">
                    <div className="p-2 text-white px-4 font-bold text-lg "> LoGo</div>
                    <div className=" p-2 text-white space-x-5">
                        <Link to={'/'} className="NavBtn">Home</Link>
                        <Link to={'/edit'} className="NavBtn">Edit</Link>
                        <Link to={'/create'} className="NavBtn">Create</Link>
                    </div>

                </div>

            </nav>
        </div>
    )
}
