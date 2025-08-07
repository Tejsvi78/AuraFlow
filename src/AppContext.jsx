import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'
import { IoVideocam } from "react-icons/io5";
import { toast } from 'react-hot-toast'
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [type, setType] = useState("Images");
    const [category, setCategory] = useState("");
    const [orientation, setOrientation] = useState("all");
    const [pageNo, setPageNo] = useState(1);
    const [imgData, setImgData] = useState([]);
    const [mediaType, setMediaType] = useState('Image');
    const [downloadMediaType, setDownloadMediaType] = useState('');
    const [largeImageURL, setLargeImageURL] = useState("");
    const [posterUrl, setPosterUrl] = useState("");
    const [downloadURL, setDownloadURL] = useState("");
    const [likedItems, setLikedItems] = useState(() => {
        const stored = localStorage.getItem("likedItems");
        return stored ? JSON.parse(stored) : {};
    });
    let alldata = [];


    const BASE_IMAGE_URL = "https://pixabay.com/api/";
    const BASE_VIDEO_URL = "https://pixabay.com/api/videos/";
    const API_KEY = "50778325-8a9ba1f38abf343c0e0b1f85b";


    const fetchImages = ({ q = "", type = "all", categories = "", orient = "", pageno = 1 } = {}) =>
        `${BASE_IMAGE_URL}?key=${API_KEY}&q=${encodeURIComponent(q)}&image_type=${type}&category=${categories}&orientation=${orient}&safesearch=true&per_page=25&page=${pageno}`;

    const fetchVideos = ({ q = "", type = "all", categories = "", pageno = 1 }) =>
        `${BASE_VIDEO_URL}?key=${API_KEY}&q=${encodeURIComponent(q)}&video_type=${type}&category=${categories}&safesearch=true&per_page=25&page=${pageno}`;

    function changeHandler(event) {
        const value = event.target.value;
        const videoTypes = ['all', 'film', 'animation'];
        videoTypes.includes(value) ? (setMediaType('Video')) : (setMediaType('Image'));
        setType(value);
        navigate('/')

    }
    function buttonStyle(text) {
        return (
            <>
                <span className='pagetext'>{`${text}`}</span>
                <span className="pagebtn-background"></span>
                <span className="pagebtn-border"></span>


                <svg style={{ position: 'absolute' }} width="0" height="0">
                    <filter id="remove-black-pagebtn" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="matrix" values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                -1 -1 -1 0 1" result="black-pixels"></feColorMatrix>
                        <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                    </filter>
                </svg>
            </>
        )
    }
    function goTODownload(largeURL, posterurl = "", downloadURL = "") {

        // console.log('goToDownload function called...');
        setLargeImageURL(largeURL);
        setPosterUrl(posterurl)
        setDownloadURL(downloadURL)
        navigate('/download');
    }
    const toggleLike = (item) => {
        setLikedItems(prev => {
            const updated = { ...prev };

            if (updated[item.id]) {
                delete updated[item.id];
                toast.error('You unliked the post')

            } else {
                updated[item.id] = item;
                toast.success('You liked the post')
            }

            return updated;
        });
    };


    function showImageCard() {

        return (

            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 mt-[100px] w-[95vw] mx-auto cards '>
                {
                    imgData[0]?.hits?.map((img) => {
                        return <span className=" break-inside-avoid span_Image " key={img.id}>
                            <img
                                onClick={() => { setDownloadMediaType('Image'), goTODownload(img.largeImageURL) }}
                                src={img.webformatURL}
                                className="w-full h-auto rounded-xl shadow-md mt-5 media_card "
                            />
                            <button onClick={() => toggleLike(img)} className='like_icon'>
                                {likedItems[img.id] ? '❤' : '🤍'}
                            </button>

                        </span>

                    })
                }

            </div>
        )

    }

    function showVideoCard() {

        return (

            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-5 mt-[100px] w-[95vw] mx-auto cards'>
                {
                    imgData[0]?.hits?.map((vdo) => {
                        return <span className=" break-inside-avoid span_Image span_video" key={vdo.id}>
                            <video
                                mute loop
                                poster={vdo.videos?.tiny?.thumbnail}
                                onMouseEnter={e => { e.target.play(); e.target.muted = true; }}
                                onMouseLeave={(e) => {
                                    e.target.pause();
                                    e.target.currentTime = 0;
                                }}
                                onClick={() => { setDownloadMediaType('Video'), goTODownload(vdo.videos?.tiny?.url, vdo.videos?.tiny?.thumbnail, vdo.videos?.large?.url) }}
                                className="w-full h-auto rounded-xl shadow-md mt-5 media_card "
                            >
                                <source src={vdo.videos?.tiny?.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <button onClick={() => toggleLike(vdo)} className='like_icon'>
                                {likedItems[vdo.id] ? '❤' : '🤍'}
                            </button>
                            <IoVideocam className='video_icon' />
                        </span>
                    })
                }
            </div>
        )

    }

    async function fetchMediaCards() {

        setLoading(true);
        // console.log('entered in useeffect');
        const fetchImg = async () => {
            let URL = '';
            // console.log('entered in fetchImg');
            {
                URL = mediaType === 'Image' ? (fetchImages({ type: type, q: query, categories: category, pageno: pageNo, orient: orientation }))
                    : (fetchVideos({ type: type, q: query, categories: category, pageno: pageNo }));
            }

            try {
                alldata = [];
                // for fetch data parallelly with show cards
                // for (let i = 1; i < 11; i++) {
                //     // const response = await fetch(`${fetchDefaultImages}${i}`);
                //     const response = await fetch(`${URL}${i}`);
                //     const data = await response.json();
                //     alldata.push(data);
                //     if (i == 1) {
                //         setImgData(alldata);
                //         setLoading(false)
                //     }
                //     console.log(`imgData in ${i} itration...`, data);
                // }
                const response = await fetch(`${URL}`);
                const data = await response.json();
                alldata.push(data);
                // console.log('All data..', alldata);

                setImgData(alldata);


            } catch (err) {
                console.log("Data Not Found....", err);
            }
        }
        await fetchImg();
        setLoading(false)

    };

    useEffect(() => {
        localStorage.setItem("likedItems", JSON.stringify(likedItems));
    }, [likedItems]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                await fetchMediaCards();
            } catch (error) {
                console.error("Error fetching media cards:", error);
            }
        };
        fetchData();
        // console.log('final imgData data before show Cards..', imgData);

    }, [type, query, category, pageNo, orientation]);

    // console.log('final imgData data outside...', imgData);
    const value = {
        loading, setLoading,
        query, setQuery,
        type, setType,
        category, setCategory,
        orientation, setOrientation,
        pageNo, setPageNo, posterUrl, navigate, downloadURL, likedItems, goTODownload, setLikedItems, buttonStyle, downloadMediaType, setDownloadMediaType,
        imgData, mediaType, setMediaType, changeHandler, fetchMediaCards, showImageCard, showVideoCard, largeImageURL
    };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

