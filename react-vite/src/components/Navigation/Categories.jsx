import { FaBars } from "react-icons/fa";

export default function Categories() {
    return (
        <div onClick={() => window.alert("Feature coming soon...")} className="categories-container" style={{fontSize: "12px"}}>
            <FaBars />
            Categories
        </div>
    )
}
