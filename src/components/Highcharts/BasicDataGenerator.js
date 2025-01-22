// export const generateMockData = (days = 100, minVolume = 1000, maxVolume = 2000, minPL = -5, maxPL = 20) => {
//     const categories = Array.from({ length: days }, (_, i) => `Day ${i + 1}`);
//     const tradingVolume = Array.from({ length: days }, () =>
//         Math.floor(Math.random() * (maxVolume - minVolume + 1)) + minVolume
//     );
//     const profitLossPercentage = Array.from({ length: days }, () =>
//         parseFloat((Math.random() * (maxPL - minPL) + minPL).toFixed(2))
//     );

//     return {
//         categories,
//         seriesData: [
//             {
//                 name: 'Trading Volume',
//                 type: 'column',
//                 data: tradingVolume,
//                 tooltipSuffix: ' units',
//             },
//             {
//                 name: 'Profit/Loss',
//                 type: 'spline',
//                 data: profitLossPercentage,
//                 tooltipSuffix: '%',
//             },
//         ],
//     };
// };


export const generateMockData = (days = 30, minVolume = 1000, maxVolume = 2000, amplitude = 5, frequency = 0.2) => {
    const categories = Array.from({ length: days }, (_, i) => `Day ${i + 1}`);
    const tradingVolume = Array.from({ length: days }, () =>
        Math.floor(Math.random() * (maxVolume - minVolume + 1)) + minVolume
    );
    const profitLossPercentage = Array.from({ length: days }, (_, i) =>
        parseFloat((amplitude * Math.sin(frequency * i) + Math.random() * 0.5).toFixed(2))
    );

    return {
        categories,
        seriesData: [
            {
                name: 'Trading Volume',
                type: 'column',
                data: tradingVolume,
                tooltipSuffix: ' units',
            },
            {
                name: 'Profit/Loss',
                type: 'spline',
                data: profitLossPercentage,
                tooltipSuffix: '%',
            },
        ],
    };
};
