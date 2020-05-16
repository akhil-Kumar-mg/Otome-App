import { Item } from "native-base";

export const toUpperCase = (str) => {
    return str.toUpperCase();
}

export const toLowerCase = (str) => {
    if (str == undefined) return '';
    return str.toLowerCase();
}

export const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}