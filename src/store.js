// import React from 'react'
// import Navbar from './components/Navbar'
// import Searchbar from './components/Searchbar'

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Searchbar />


//     </div>
//   )
// }

// export default App

// className={`w-[${img.previewWidth}px] h-[${img.previewHeight}px] `}


import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const BASE_IMAGE_URL = "https://pixabay.com/api/";
    const BASE_VIDEO_URL = "https://pixabay.com/api/videos/";
    const API_KEY = "50778325-8a9ba1f38abf343c0e0b1f85b";

    // 🔄 Default fetch (on page load)
    const fetchDefaultImages = `${BASE_IMAGE_URL}?key=${API_KEY}&q=&image_type=all&safesearch=true&per_page=50&page=`;
    const fetchDefaultVideos = () => `${BASE_VIDEO_URL}?key=${API_KEY}&q=&safesearch=true&per_page=50&page=`;

    // 🔍 Search fetch
    const fetchImages = ({ q = "", type = "all", category = "", orientation = "", page = 1 } = {}) =>
        `${BASE_IMAGE_URL}?key=${API_KEY}&q=${q}&image_type=${type}&category=${category}&orientation=${orientation}&safesearch=true&per_page=50&page=${page}`;

    const fetchVideos = (q, category, page = 1) =>
        `${BASE_VIDEO_URL}?key=${API_KEY}&q=${q}&category=${category}&safesearch=true&per_page=50&page=${page}`;

    const [imgData, setImgData] = useState([null]);
    useEffect(() => {
        console.log('entered in useeffect');
        const fetchImg = async () => {
            console.log('entered in fetchImg');

            try {
                let alldata = [];
                for (let i = 1; i < 11; i++) {
                    // const response = await fetch(`${fetchDefaultImages}${i}`);
                    const response = await fetch(fetchImages({ page: i, q: "space", category: "science" }));
                    const data = await response.json();
                    alldata.push(data);
                    console.log(`imgData in ${i} itration...`, data);
                }
                console.log('All data..', alldata);
                setImgData(alldata);
                console.log('final imgData data', imgData);

            } catch (err) {
                console.log("Data Not Found....", err);
            }
        }
        fetchImg();
    }, []);
    return (
        <div className='main_app'>
            <div className="bg_img"></div>
            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 mt-[100px] w-[95vw] mx-auto cards'>
                {
                    imgData[8]?.hits.map((img) => {
                        return <span className=" break-inside-avoid span_Image " key={img.id}>
                            <img
                                src={img.largeImageURL}
                                className="w-full h-auto rounded-xl shadow-md mt-5"
                            />

                        </span>
                    })
                }
            </div>

        </div>
    )
}

export default App

// className={`w-[${img.previewWidth}px] h-[${img.previewHeight}px] `}