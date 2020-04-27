import React from 'react';
import Apartment from './Apartments';

export default function ApartmentsList({ apartments }) {
    if (apartments.length === 0) {
        return (
            <div className="empty-search">
                <h3>unfortunately no apartments matched your search</h3>
            </div>
        )
    }

    return (
        <section className='apartmentslist'>
            <div className="apartmentslist-center">
                {
                    apartments.map((item, index) => {
                        return <Apartment key={index} apartment={item} />
                    })
                }
            </div>
        </section>
    )
}