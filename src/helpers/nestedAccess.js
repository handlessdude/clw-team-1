/**
    Accessing nested JavaScript objects by string path
*/
export default (object, path, defaultValue) => path
    .split('.')
    .reduce((o, p) => o ? o[p] : defaultValue, object)