import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import Categories from './Categories';
import Pagination from './Pagination';

const Cards = () => {
    const { showImageCard, showVideoCard, mediaType } = useContext(AppContext);

    return (
        <div>
            <Categories />
            {
                mediaType === 'Image' ? showImageCard() : showVideoCard()
            }

            < Pagination />

        </div>
    )
}

export default Cards
