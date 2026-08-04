
export const toEnglishDigits = async (str: string = '') =>
    str
        .replace(/[۰-۹]/g, (d) => (d.charCodeAt(0) - 1776).toString())
        .replace(/[٠-٩]/g, (d) => (d.charCodeAt(0) - 1632).toString())
        .replace(/[\s\-()]/g, '');

