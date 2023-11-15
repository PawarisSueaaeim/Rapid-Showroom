// ใส่ภาษาไทย จะ return true ................................
export const isThaiText = (inputText: string): boolean => {
    const regexPattern = /^[ก-ฮะ-ไ่-๋์\s]*$/;
    return regexPattern.test(inputText);
};

// ใส่ ตัวเลขก่อน1 ตัวหรือไม่ใส่ก็ได้ ตามด้วยตัวอักษรไทย 2 ตัว และตัวเลข 1-4 ตัว จะ return true ................................
export const isPlateId01 = (inputText: string): boolean => {
    const regexPattern = /^[1-9]{0,1}$/;
    return regexPattern.test(inputText);
}
export const isPlateId02 = (inputText: string): boolean => {
    const regexPattern = /^[ก-ฮ]{0,2}$/;
    return regexPattern.test(inputText);
}
export const isPlateId03 = (inputText: string): boolean => {
    const regexPattern = /^[1-9]\d{0,3}$/;
    return regexPattern.test(inputText);
}

// ใส่ได้แค่ตัวเลข จะ return true ................................
export const isMileage = (inputText: string): boolean => {
    const regexPattern = /^[1-9][0-9]*$/;
    return regexPattern.test(inputText);
}

// ใส่ได้แค่ เลขจำนวนไม่เกิน 10 ตัว จะ return true ................................
export const isPhoneNumber = (inputText: string): boolean => {
    const regexPattern = /^[0-9]{0,10}$/;
    return regexPattern.test(inputText);
}

// ใส่รูปแบบ email จะ return true ................................
export const isEmail = (inputText: string): boolean => {
    const regexPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regexPattern.test(inputText);
}

export const passwordValidation = (inputText: string) => {
    const regexPattern = /^(?=.*[A-Za-z])(?=.*\d{2,}).{6,}$/;
    return regexPattern.test(inputText);
};