export const isThaiText = (inputText: string): boolean => {
    const regexPattern = /^[ก-ฮะ-ไ่-๋์]*$/;
    return regexPattern.test(inputText);
};

export const isPhoneNumber = (inputText: string): boolean => {
    const regexPattern = /^[0-9]*$/;
    return regexPattern.test(inputText);
}

export const isEmail = (inputText: string): boolean => {
    const regexPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexPattern.test(inputText);
}