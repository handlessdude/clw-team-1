/**
 * examine if given value is empty string, null or undefined
 * */
export const isRequired = val => (!(val===undefined))
                                &&(!(val===null))
                                &&(!!val)

/**
 * examine if given value has at least minLen elements
 * */
export const isMinLength = minLen =>
                            val => (val.length >= minLen)
