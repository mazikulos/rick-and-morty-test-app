export interface IPagination {
    currentPage: number
    count: number | null
    pages: number | null
    next: string | null
    prev: string | null
}
