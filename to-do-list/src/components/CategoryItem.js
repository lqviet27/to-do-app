const CategoryItem = ({ name, color }) => {
    return (
        <div className="category-item-containner">
            <div
                className="category-item-containner__color"
                style={{
                    backgroundColor: color,
                    
                }}
            ></div>
            <div className="category-item-containner__content">{name}</div>
        </div>
    );
};

export default CategoryItem;
