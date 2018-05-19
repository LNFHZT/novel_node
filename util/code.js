const codeMap = require('./codeMap');
class Code {
    static codeMap() {
        return codeMap;
    }
    constructor(options) {
        const defaultOptions = Code.codeMap().map[Code.codeMap().OK];
        let obj = {};
        if (!options.code) {
            obj = Object.assign(defaultOptions, options);
        } else {
            obj = Object.assign(Code.codeMap().map[options.code], options);
        }
        if (!obj.data) {
            obj.data = {};
        }
        this.return = obj
    }
}


module.exports = Code;