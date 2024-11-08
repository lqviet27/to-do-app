const CategoryItem = ({ name, color }) => {
    return (
        <div className="category-containner">
            <div
                className="category-containner__color"
                style={{
                    display: 'inline-block',
                    backgroundColor: color,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    marginRight: '8px',
                }}
            ></div>
            <div className="category-containner__content">{name}</div>
        </div>
    );
};

export default CategoryItem;
