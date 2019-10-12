export const add = (...nums) => {
    return nums.reduce((prev, cur) => {
        return prev + cur
    }, 0)
}

export const multy = (...nums) => {
    console.log('11111')
    return nums.reduce((prev, cur) => {
        return prev * cur
    }, 0)
}