import React, { useRef } from 'react';

function App() {

    const menuOpenBtn = useRef(null)
    const menuCloseBtn = useRef(null)

    return (
        <>
            <button
                ref={menuOpenBtn}
                onClick={(event) => {
                    menuOpenBtn.current.classList.add('menu-open-btn-deactive')
                    menuCloseBtn.current.classList.remove('menu-close-btn-deactive')
                    sideMenu.current.classList.add('side-menu-active')
                }}
                className='menu-open-btn'
            >
                <i className="fa-solid fa-bars fa-xl"></i>
            </button>
            <button
                ref={menuCloseBtn}
                className='menu-close-btn'
                onClick={(event) => {
                    menuOpenBtn.current.classList.remove('menu-open-btn-deactive')
                    menuCloseBtn.current.classList.add('menu-close-btn-deactive')
                    sideMenu.current.classList.remove('side-menu-active')
                }}
            >
                <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
        </>
    );
}

export default App;