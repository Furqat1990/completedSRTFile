exports.arrayArg = function(arr) {
    if (!arr) throw new Error('Array should not be undefined');
    if (!Array.isArray(arr)) throw new Error('Argument must be an array');
    if (arr.length === 0) throw new Error('Array should not be an empty'); 
}

exports.objectArg = function(obj) {
    if (!obj) throw new Error('Object should not be undefined');
    if (Object.keys(obj).length === 0) throw new Error('Object should not be an empty');
}

exports.textArg = function(text) {
    if (text === '') throw new Error('Text should not be an empty');
    if (!text) throw new Error('Text should not be undefined');
    if (typeof text !== 'string') throw new Error('Argument must be a string');
}