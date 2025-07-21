import React, { useContext } from 'react'
import Cards from './components/Cards'
import { AppContext } from './AppContext';
import Spinner from './components/Spinner';
import './App.css'
const Home = () => {
    const { loading } = useContext(AppContext);
    return (
        <div className='home_page'>

            {loading ? (<Spinner />) : (<Cards />)
            }

        </div>
    )
}

export default Home
