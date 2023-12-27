import axios from "axios";
import { nanoid, } from "nanoid";
import { pick, } from "lodash";
import { ChangeEvent, FormEvent, useCallback, useState, } from "react";
import { useLoaderData, useNavigate, useSearchParams, } from "react-router-dom";
import Select from "react-select";
import QuillToolbar, { formats, modules, } from "../../board-common-components/quill-toolbar/QuillToolbar";
import ReactQuill from "react-quill";
import isQuillEmpty from "../../../../utils/isQuillEmpty";
import "react-quill/dist/quill.snow.css";
import FileUpload from "./FileUpload";
import type { BoardInfoResponse, } from "../../board-common-components/board-info/types";

interface ExistingBoardInfo
{
    title: string;
    unifiedPostType: string;
    bodyContent: string;
    existingFileData: { id: number; originalFileName: string; saveFileName: string; }[];
}

interface Board
{
    title: string;
    bodyContent: string;
    unifiedPostType: string;
}

interface FileInfo
{
    id: string|number;
    file: File | { name: string; }
    isOriginal?: boolean;
}

const response: BoardInfoResponse =
    {
        "response": {
            "is-member-liked": false,
            "file-data": [
                {
                    "id": 44,
                    "originalFileName": "개발 게시판 테스트 이미지.png",
                    "saveFileName": "c4a59409-cc6d-4e9e-84fe-3c2c9affff8f_개발 게시판 테스트 이미지.png"
                }
            ],
            "comment-data": [],
            "post-data": {
                "id": 63,
                "title": "도커 이미지가 뭔가요",
                "bodyContent": "testtesttesttest",
                "viewCount": 1,
                "likeCount": 0,
                "unifiedPostType": "DEV",
                "userName": "테스트2",
                "createdTime": [
                    2023,
                    8,
                    7,
                    22,
                    59,
                    2,
                    606474000
                ],
                "modifiedTime": null,
                "memberWritten": true
            }
        },
        "error": null
    };

const boardCategorySelectOptions =
    [
        { value: "FREE", label: "자유", },
        { value: "DEV", label: "개발", },
        { value: "CAREER", label: "진로", },
    ];

export async function unifiedBoardDataLoader()
{
    try
    {
         return await new Promise(resolve =>
         {
             setTimeout(() =>
             {
                 resolve({ ...pick(response.response["post-data"], ["title", "bodyContent", "unifiedPostType"]), existingFileData: response.response["file-data"], });
             })
         });
    }
    catch(error)
    {
        return null;
    }
}

export default function UnifiedBoardModifyForm()
{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const boardId = searchParams.get("boardId");

    // @ts-ignore
    const { title, unifiedPostType, bodyContent, existingFileData }: ExistingBoardInfo = useLoaderData();

    const [values, setValues] = useState<Board>(
        {
            title,
            bodyContent,
            unifiedPostType,
        }
    );
    const [fileInformation, setFileInformation] = useState<FileInfo[]>(existingFileData.map(file => ({ file: { name: file.originalFileName, }, id: file.id, isOriginal: true, })));
    const [existingFileIdList, setExistingFileIdList] = useState<number[]>(existingFileData.map(file => file.id));

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) =>
    {
        const key = event.target.id.replace("Input", "");
        const value = event.target.value;
        setValues({ ...values, [key]: value, });
    }, [values]);

    const handleContentChange = useCallback((content: string) =>
    {
        setValues({ ...values, bodyContent: content, });
    }, [values]);

    const handleSelectChange = useCallback((event: any) =>
    {
        if(event === null)
        {
            return;
        }
        setValues({ ...values, unifiedPostType: event.value, });
    }, [values]);

    const handleFileInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) =>
    {
        const newFileInformation: FileInfo[] = Array.from(event.target.files).map(file => ({ id: nanoid(), file, }));
        setFileInformation([...fileInformation, ...newFileInformation]);
    }, [fileInformation]);

    const handleFileDelete = useCallback((targetFileInfo: FileInfo) =>
    {
        if("isOriginal" in targetFileInfo.file)
        {
            setExistingFileIdList(existingFileIdList.filter(id => id !== targetFileInfo.id));
        }
        setFileInformation(fileInformation.filter(fileInfo => fileInfo.id !== targetFileInfo.id));
    }, [fileInformation, existingFileIdList]);

    const handleFormSubmit = useCallback((event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        const formData = new FormData();
        const blob = new Blob([JSON.stringify({ ...values, id: boardId, })], { type: "application/json", });
        formData.append("data", blob);

        const addedFileInformation = fileInformation.filter(fileInfo => !("isOriginal" in fileInfo));
        if(addedFileInformation.length === 0)
        {
            formData.append("file", JSON.stringify([]));
        }
        else
        {
            addedFileInformation.forEach(fileInfo =>
            {
                if(fileInfo.file instanceof File)
                {
                    formData.append("file", fileInfo.file);
                }
            });
        }

        const fileIdListBlob = new Blob([JSON.stringify(existingFileIdList)], { type: "application/json", });
        formData.append("file-id", fileIdListBlob);
        axios.post(`${process.env.BACKEND_URL}/?/modify`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data", }})
            .then(() => navigate(-1))
            .catch(reason => window.alert(reason));
    }, [values, fileInformation, existingFileIdList]);


    return (
        <form
            onSubmit={handleFormSubmit}
        >
            <div>
                <p>
                    카테고리를 선택해주세요.
                </p>
                <Select
                    defaultValue={boardCategorySelectOptions.find(option => option.value === unifiedPostType)}
                    placeholder={"카테고리 선택"}
                    options={boardCategorySelectOptions}
                    onChange={handleSelectChange}
                    menuPlacement={"auto"}
                />
            </div>
            <div>
                <label
                    htmlFor={"titleInput"}
                >
                    제목을 입력해주세요.
                </label>
                <input
                    id={"titleInput"}
                    type={"text"}
                    value={values.title}
                    onChange={handleInputChange}
                    maxLength={30}
                    autoComplete={"off"}
                    autoCapitalize={"off"}
                />
            </div>
            <div>
                <p>
                    내용을 입력해주세요.
                </p>
                <div>
                    <QuillToolbar/>
                    <ReactQuill
                        theme={"snow"}
                        modules={modules}
                        formats={formats}
                        value={values.bodyContent}
                        onChange={handleContentChange}
                    />
                </div>
            </div>
            <FileUpload
                fileInformation={fileInformation}
                onFileInputChange={handleFileInputChange}
                onFileDelete={handleFileDelete}
            />
            <div>
                <button
                    disabled={values.unifiedPostType.trim().length === 0 || values.title.trim().length === 0 || isQuillEmpty(values.bodyContent)}
                    type={"submit"}
                >
                    게시글 수정
                </button>
            </div>
        </form>
    );
};