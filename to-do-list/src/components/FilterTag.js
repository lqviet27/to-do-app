const FilterTag = ({ name, active }) => {
    return (
        <div className={`filter-tag ${active ? 'active' : ''}`}>
            <div className={`filter-tag__name ${active ? 'active' : ''}`}>{name}</div>
        </div>
    );
};

export default FilterTag;
