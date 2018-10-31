class Page {
    constructor(
        data = [],
        page = {
            pageSiz: 10,
            pageCount: 1,
            pageNo: 1,
        }, filter = {}
    ) {
        if (page && page.pageNo <= 0) {
            console.warn('警告分页对象从1开始');
            page.pageNo = 1;
        }
        this.data = {
            pageSiz: 10,
            pageCount: 0,
            pageNo: 1,
            filter: {
                ...filter,
            },
            result: data,
            ...page,
        }
    }

}