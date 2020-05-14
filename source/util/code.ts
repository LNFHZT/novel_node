import codeMap from './codeMap';
class Code {
    data: any
    code: number = 0;
    msg: string = "OK";
    success: boolean = true;
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
        this.code = obj.code;
        this.msg = obj.msg;
        this.success = obj.success;
        this.data = obj.data;
    }
}


export default Code;