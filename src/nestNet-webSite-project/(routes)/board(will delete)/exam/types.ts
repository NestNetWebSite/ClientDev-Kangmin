export interface ExamBoardListResponse {
    response: Response;
    error: any;
}

export interface Response {
    totalSize: number;
    posts: Post[];
}

export interface Post {
    id: number;
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
    userName: string;
}
