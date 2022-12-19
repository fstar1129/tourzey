
// export const TitleCase = (str) => {
//     if (str !== undefined && str !== null && str !== '') {
//         return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
//     }
//     if (str === undefined || str === null || (str === '')) {
//         return str;
//     }
//  };

// Captial letters of each words ->salem tamilnadu ->Salem Tamilnadu
 export const TitleCase = (str) => {
    if (str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }
    if (!str) {
        return str;
    }
 };

 export const Capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
 