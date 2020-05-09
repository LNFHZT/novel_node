import codeMap from './codeMap';
class Code {
    return: any
    static codeMap() {
        return codeMap;
    }
    constructor(options: any) {
        // @ts-ignore
        const defaultOptions: any = codeMap.map[codeMap.OK];
        let obj: any = {};
        if (!options.code) {
            obj = Object.assign(defaultOptions, options);
        } else {
            // @ts-ignore
            obj = Object.assign(codeMap.map[options.code], options);
        }
        if (!obj.data) {
            obj.data = {};
        }
        this.return = obj
    }
}


export default Code;