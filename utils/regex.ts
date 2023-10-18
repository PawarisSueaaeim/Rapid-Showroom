export const isThaiText = (inputText: string): boolean => {
    const regexPattern = /^[ก-ฮะ-ไ่-๋์\s]*$/;
    return regexPattern.test(inputText);
};

export const isPlateId = (inputText: string): boolean => {
    const regexPattern = /^\d?[ก-ฮ]{2}\d{1,4}$/;
    return regexPattern.test(inputText);
}

export const isMileage = (inputText: string): boolean => {
    const regexPattern = /^[1-9]\d*$/;
    return regexPattern.test(inputText);
}

export const isPhoneNumber = (inputText: string): boolean => {
    const regexPattern = /^[0-9]{0,10}$/;
    return regexPattern.test(inputText);
}

export const isEmail = (inputText: string): boolean => {
    const regexPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regexPattern.test(inputText);
}