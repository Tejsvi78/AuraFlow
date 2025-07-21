import { useContext } from 'react'
import { AppContext } from '../AppContext';
import '../App.css'

const Categories = () => {
    const { category, setCategory } = useContext(AppContext)
    const categoriesData = [
        "backgrounds", "fashion", "nature", "science", "education", "feelings",
        "health", "people", "religion", "places", "animals", "industry", "computer",
        "food", "sports", "transportation", "travel", "buildings", "business", "music"
    ];
    return (
        <div className='category_div'>
            <button
                onClick={() => setCategory("")}
                className={`${category === ""
                    ? 'bg-[#000000d3] text-white text-shadow-amber-500 text-7xl scale-[1.1]'
                    : ''} category_btn`}
            >All</button>
            {
                categoriesData.map((categ) => (
                    <button
                        key={categ}
                        onClick={() => setCategory(categ)}
                        className={`${categ === category
                            ? 'bg-[#000000c0] text-white text-shadow-amber-800'
                            : ''} category_btn`}
                    >{categ}</button>
                ))
            }
        </div>
    )
}

export default Categories
