import React, { useState, useEffect, useRef } from 'react';
import './DisclaimerBanner.css';

const DisclaimerBanner = ({ texts, separator, spaceCount = 3 }) => {
    const bannerTextRef = useRef(null);
    const [status, setStatus] = useState('hidden');
    const [isScrolling, setIsScrolling] = useState(false);

    const whiteSpaces = new Array(spaceCount + 1).join(' ');

    useEffect(() => {
        setStatus('show');
        const bannerTextElement = document.querySelector(".horizontal-banner-text span");
        const bannerParent = document.querySelector(".horizontal-banner-text");

        if (bannerTextElement && bannerParent) {
            const bannerTextWidth = bannerTextElement.getBoundingClientRect().width;
            const bannerParentWidth = bannerParent.getBoundingClientRect().width;
            if (bannerTextWidth > bannerParentWidth) {
                setIsScrolling(true);
            }
        }
    }, []);

    const closeBanner = () => {
        setStatus('hidden');
    };

    return (texts &&
        <div className={`horizontal-banner ${status}`}>
            <div className='work-in-progress '></div>
            <div className="horizontal-banner-text">
                <span ref={bannerTextRef} className={isScrolling ? "scroll" : ""}>
                    {separator}
                    {texts.map((text, index) =>
                        <span className='text-with-whitespace' key={index}>{whiteSpaces}{text}{whiteSpaces}{separator}</span>
                    )}
                </span>
            </div>
            <button className='close-button' onClick={closeBanner}></button>
        </div>
    )
}

export default DisclaimerBanner;