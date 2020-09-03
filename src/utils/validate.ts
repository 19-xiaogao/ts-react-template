// 验证是否存在数字和字符串
export const validateNumStr: RegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,20})$/;

// 验证邮箱正则
export const ValidateEmail: RegExp = /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;