export interface UnifiedBoardListResponse {
    response: Response;
    error: any;
}

export interface Response {
    totalSize: number;
    posts: Post[];
}

export interface Post {
    id: string | number;
    username: string;
    title: string;
    createdTime: number[];
    viewCount: number;
    likeCount: number;
}
