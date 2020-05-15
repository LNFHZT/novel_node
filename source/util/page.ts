export default class Page {
    page: any = {
        pageSize: 10,
        pageNo: 0,
        total: 0,
        totalPage: 0,
    }
    result: Array<any> = []
    constructor(data = {
        pageSize: 10,
        pageNo: 0,
        total: 0,
        data: []
    }) {
        this.page.pageSize = data.pageSize;
        this.page.pageNo = data.pageNo;
        this.page.total = data.total;
        this.page.totalPage = Math.ceil(data.total / data.pageSize);
        this.page.result = data.data;
    }
}