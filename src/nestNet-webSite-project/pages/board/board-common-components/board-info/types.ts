export interface BoardInfoResponse
{
    response: Response;
    error: any;
}

export interface Response
{
    "is-member-liked": boolean;
    "file-data"?: FileData[];
    "comment-data"?: CommentData[];
    "post-data": PostData;
}

export interface FileData
{
    id: number;
    originalFileName: string;
    saveFileName: string;
}

export interface CommentData
{
    id: number;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}

export interface PostData
{
    id: number;
    title: string;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    unifiedPostType?: string;
    subject?: string;
    professor?: string;
    year?: number;
    semester?: number;
    examType?: string;
    userName: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}