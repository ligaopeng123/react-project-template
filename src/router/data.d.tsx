export interface TableListItem {
    updatedAt?: Date;
    createdAt?: Date;
}

export interface TableListPagination {
    total: number;
    pageSize: number;
    pageNumber: number;
}

export interface TableListParams {
    pageSize?: number;
    pageNumber?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };
}

export interface MutateResponse {
    code: number,
    message: string
}

