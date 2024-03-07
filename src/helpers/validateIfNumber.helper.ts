export const validateIfNumber = (value: string) => {
    if (value === '') return true;
    const reg = new RegExp('^[0-9]+$');
    return reg.test(value);
}