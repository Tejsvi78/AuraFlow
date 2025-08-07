import React, { useContext } from 'react'
import '../App.css'
import { AppContext } from '../AppContext';

const Navbar = () => {
    const { changeHandler, type, navigate, orientation, setOrientation, mediaType } = useContext(AppContext);

    return (
        <nav className='navbar' >
            <div className='navbar_bg'></div>
            {console.log('Entered in Navbar')}
            <span className='apptext'>
                <p
                    onClick={() => { navigate('/'), window.location.reload() }}
                    className='cursor-pointer p-0'
                >AuraFlow</p>
                <div className='Page_btn'>
                    <p onClick={() => navigate('/')}>Home</p>
                    <p onClick={() => navigate('/gallery')}>Gallery</p>
                </div>
            </span>
            <div className='z-9'>

                <select name="mediaType" id="mediaType" onChange={changeHandler} value={type}>
                    <optgroup label='Images'>
                        <option value="">Images</option>
                        <option value="photo">Photo</option>
                        <option value="illustration">Illustrations</option>
                        <option value="vector">Vectors</option>
                    </optgroup>
                    <optgroup label='Videos'>
                        <option value="all">Videos</option>
                        <option value="film">Film</option>
                        <option value="animation">Animation</option>
                    </optgroup>
                </select>
                <select
                    id="mediaType"
                    onChange={(e) => { setOrientation(e.target.value), navigate('/') }}
                    value={orientation}
                    className={`${mediaType === 'Image' ? 'scale-[1]' : 'scale-[0]'} transition-transform duration-300 `}
                >
                    <optgroup lable='Orientation' >
                        <option value="all">All</option>
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </optgroup>
                </select>
            </div>
        </nav>
    )
}

export default Navbar;
