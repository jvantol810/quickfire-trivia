import React from 'react'
import './CategoryButton.css'

const CategoryButton = (props) => {

    const handleClick = () => {
        props.handleClick(props.triviaCategory)
    }

    return props.triviaCategory ? (
        <div className='category-button-container'>
            <button className={`category-button ${"category-" + props.triviaCategory.id}`} onClick={handleClick}>{props.triviaCategory.label}</button>
        </div>
    ) : <div></div>
}

export default CategoryButton