import React from 'react';
import Title from '../components/Title';
//get all unique values
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function ApartmentFilter({ 
    apartments,
    handleChange,
    roomCount,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize
 }) {
    let count = getUnique(apartments, 'roomCount').sort((a,b)=>a-b);
    count = count.map((item, index) => {
        return <option value={item} key={index}>{item}</option>;
    })

    return (
        <section className='filter-container'>
            <Title title='filter search' />
            <form className='filter-form'>
                {/* end select type */}
                {/* guests */}
                <div className="form-group">
                    <label htmlFor="roomCount">Number of rooms</label>
                    <select
                        name="roomCount"
                        id="roomCount"
                        value={roomCount}
                        className='form-control'
                        onChange={handleChange}
                    >
                        <option value='all'>All</option>
                        {count}
                    </select>
                </div>
                {/* end guests */}
                {/* Apartment price */}
                <div className="form-group">
                    <label htmlFor="price">
                        apartment price up to ${price}
                    </label>
                    <input
                        type="range"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        onChange={handleChange}
                        className="form-control" />
                </div>
                {/* end apartment price */}
                {/* size */}
                <div className="form-group">
                    <label htmlFor="size">apartment size</label>
                    <div className="size-inputs">
                        <input
                            type="number"
                            name="minSize"
                            id="size"
                            value={minSize}
                            onChange={handleChange}
                            className="size-input" />
                        <input
                            type="number"
                            name="maxSize"
                            id="size"
                            value={maxSize}
                            onChange={handleChange}
                            className="size-input" />
                    </div>
                </div>
                {/* end of size */}
            </form>
        </section >
    )
}
