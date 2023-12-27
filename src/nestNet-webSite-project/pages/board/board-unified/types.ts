export interface UnifiedBoardListResponse
{
    response: Response;
    error: any;
}

export interface Response
{
    totalSize: number;
    posts: Post[];
}

export interface Post
{
    id: string;
    username: string;
    title: string;
    createdTime: number[];
    viewCount: number;
    likeCount: number;
}
