import _ from 'lodash';
export const add = (...nums) => {
    return nums.reduce((prev, cur) => {
        return prev + cur;
    }, 0);
}

export const multy = (...nums) => {
    return nums.reduce((prev, cur) => {
        return prev * cur;
    }, 1);
}   

export const test = () => {
    _.reduce([1,2,3,4], (data) => {
        console.log(data)
    })
}