import React, { useContext } from 'react'
import { AppContext } from './AppContext';
import { toast } from 'react-hot-toast'

const Gallery = () => {
    const { likedItems, goTODownload, setLikedItems, buttonStyle } = useContext(AppContext);
    const likedList = Object.values(likedItems);
    const removeFromLike = (item) => {
        setLikedItems(prev => {
            const updated = { ...prev };
            delete updated[item.id];
            toast.error('Removed From Gallery')
            return updated;
        });
    };
    return (
        <div >
            <p className='pagebtn w-[150px] h-[50px] mx-auto mt-[20px]'>{buttonStyle("Gallery")}</p>

            {likedList.length === 0 ? (
                <p className="text-center mt-4 text-gray-500">No liked items yet.</p>
            ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 mt-[100px] w-[95vw] mx-auto cards'">
                    {likedList.map((item) => (
                        <div key={item.id} >
                            {item.largeImageURL ? (
                                <span className=" break-inside-avoid span_Image " >

                                    <img
                                        src={item.largeImageURL}
                                        alt="liked"
                                        onClick={() => goTODownload(item.largeImageURL)}
                                        className="w-full h-auto rounded-xl shadow-md mt-5 media_card "
                                    />
                                    <button onClick={() => removeFromLike(item)} className='like_icon'>
                                        ❤
                                    </button>
                                </span>

                            ) : item.videos?.tiny?.url ? (
                                <span className=" break-inside-avoid span_Image span_video" >
                                    <video
                                        src={item.videos.tiny.url}
                                        controls
                                        onClick={() => goTODownload(item.videos?.tiny?.url, item.videos?.tiny?.thumbnail, item.videos?.large?.url)}
                                        className="w-full h-auto rounded-xl shadow-md mt-5 media_card "
                                    />
                                    <button onClick={() => removeFromLike(item)} className='like_icon'>
                                        ❤
                                    </button>

                                </span>
                            ) : (
                                <p>Unsupported media type</p>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery
