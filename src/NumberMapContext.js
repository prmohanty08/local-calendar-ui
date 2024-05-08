import React, { useState, useEffect, createContext } from 'react';

export const NumberMapContext = createContext();

export const NumberMapProvider = ({ children }) => {
    const [numberMap, setNumberMap] = useState(null);

    useEffect(() => {
        setNumberMap({
            '0': '୦',
            '1': '୧',
            '2': '୨',
            '3': '୩',
            '4': '୪',
            '5': '୫',
            '6': '୬',
            '7': '୭',
            '8': '୮',
            '9': '୯'
        });
    }, []);

    const convertToOdia = (num) => {
        if (num === null || num === undefined) return '';
        const numString = num.toString();
        let result = '';
        for (let i = 0; i < numString.length; i++) {
            result += numberMap[numString.charAt(i)];
        }
        return result;
    };

    const composeItemsByIndex = (item, itemIndex, itemsLength) => {
        let result = ((itemIndex === itemsLength - 1 && itemsLength > 1) ? ' ଓ ' : '') +
            item +
            ((itemIndex !== itemsLength - 2 && itemIndex < itemsLength - 2) ? ', ' : '');
        return result;
    };

    return (
        <NumberMapContext.Provider value={{ convertToOdia, composeItemsByIndex }}>
            {children}
        </NumberMapContext.Provider>
    );
};