import React, { useState } from 'react'
import '../App.css'
import { useContext } from 'react'
import { AppContext } from '../AppContext'
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
    const { setQuery, navigate } = useContext(AppContext)
    const [searchValue, setSearchValue] = useState("")
    function searchHandler(e) {
        setQuery(searchValue);
        navigate('/')
    }
    function enterSearch(e) {
        if (e.key === 'Enter' && searchValue !== "") {
            searchHandler();
        }
    }
    return (
        <div className='search_bar'>
            <input
                type="text" placeholder='Explore..'
                name='search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={enterSearch}
            />
            <button onClick={searchHandler} ><FaSearch className='Search_icon' /></button>
        </div>
    )
}
export default Searchbar




