import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'
import '../App.css'
const Pagination = () => {
    const { imgData, pageNo, setPageNo, buttonStyle } = useContext(AppContext);
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);

    useEffect(() => {

        const hasNext = pageNo < 21 && imgData[0]?.hits?.length > 0;
        const hasPrev = pageNo > 1;

        setShowNext(hasNext);
        setShowPrev(hasPrev);

        console.log("Page No:", pageNo);
        console.log("Next available:", hasNext);
        console.log("Previous available:", hasPrev);
    }, [imgData, pageNo]);
    return (
        <div className='flex  justify-evenly items-center bg-gray-900 w-screen h-20'>

            <div>
                {showPrev && (
                    <button onClick={() => setPageNo(pageNo - 1)} className='pagebtn' role="button">
                        {buttonStyle("Privious")}
                    </button>
                )}
            </div>
            <div>
                {showNext && (
                    <button onClick={() => setPageNo(pageNo + 1)}
                        className='pagebtn' role="button">
                        {buttonStyle("Next")}
                    </button>
                )}
                {console.log('Current Page NO......', pageNo)}
            </div>
        </div>
    )
}

export default Pagination
