import React, { useContext } from 'react'
import { AppContext } from './AppContext'
import './App.css'
import { toast } from 'react-hot-toast'
const Download = () => {
    const { largeImageURL, downloadMediaType, posterUrl, navigate, downloadURL, buttonStyle } = useContext(AppContext)


    function imgForDownload() {
        return (
            <img src={largeImageURL} alt=""
                className='rounded-xl  mx-auto' k
            />
        )
    }
    function videoForDownload() {
        return (
            <video
                controls
                poster={posterUrl}
                className='rounded-xl  mx-auto'
            >
                <source src={largeImageURL} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )
    }
    const handleDownload = async () => {
        try {
            const saveURL = downloadMediaType === 'Image' ? (largeImageURL) : (downloadURL);
            const response = await fetch(saveURL, { mode: 'cors' }); // Ensure CORS allowed
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const fileName = largeImageURL.split('/').pop();

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName || 'downloaded-image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);

        } catch (error) {
            console.error("Download failed:", error);
            toast.error('Failed to download')
            alert("Failed to download.");
        }
    };
    return (
        <div className='w-screen h-screen'>

            <div className='flex justify-between items-center overflow-y-hidden sticky top-[100px] bg-amber-100 w-[90vw] h-auto mx-auto my-auto
            flex-col rounded-xl mt-5' >

                <div className='flex justify-between w-[90%] mx-auto'>
                    <button onClick={() => navigate(-1)} className='pagebtn w-[150px] h-[50px]' role="button">
                        {buttonStyle("←Back")}
                    </button>

                    <button onClick={handleDownload} className='pagebtn w-[200px] h-[50px] text-[10px] download-btn' role="button">
                        {buttonStyle("HD Download ↡")}
                    </button>
                </div>
                <div className=' mt-[20px] mb-[20px] mx-[5px] shadow-[0px_0px_4px_black] rounded-xl'>
                    {
                        downloadMediaType === "Image" ? imgForDownload() : videoForDownload()
                    }
                </div>
            </div>
        </div>
    )
}

export default Download
