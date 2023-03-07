import React, { memo } from "react";
import "./style.scss";

type CategoriesProps = {
    activeIndex: number,
    setActiveIndex: (id: number) => void
}

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

const Categories: React.FC<CategoriesProps> = memo(({ activeIndex, setActiveIndex }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li
                        onClick={() => setActiveIndex(index)}
                        className={activeIndex === index ? "active" : ""}
                        key={index + 1}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;
