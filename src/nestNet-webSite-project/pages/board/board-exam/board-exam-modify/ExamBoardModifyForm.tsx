import axios from "axios";
import { nanoid, } from "nanoid";
import { pick, } from "lodash";
import { ChangeEvent, FormEvent, useCallback, useState, } from "react";
import { useLoaderData, useNavigate, useSearchParams, } from "react-router-dom";
import { LiaCalendarAlt, LiaChalkboardTeacherSolid, } from "react-icons/lia";
import { MdTitle, } from "react-icons/md";
import { PiBooks, PiExam, PiListNumbers, } from "react-icons/pi";
import QuillToolbar, { formats, modules, } from "../../board-common-components/quill-toolbar/QuillToolbar";
import ReactQuill from "react-quill";
import isQuillEmpty from "../../../../utils/isQuillEmpty";
import FileUpload from "./FileUpload";
import { BoardInfoResponse, } from "../../board-common-components/board-info/types";

interface ExistingBoardInfo
{
    title: string;
    bodyContent: string;
    subject: string;
    professor: string;
    year: number;
    semester: number;
    examType: string;
    existingFileData: { id: number; originalFileName: string; saveFileName: string; }[];
}

interface Board
{
    title: string;
    bodyContent: string;
    subject: string;
    professor: string;
    year: number;
    semester: number;
    examType: string;
}

interface FileInfo
{
    id: string | number;
    file: File | { name: string; };
    isOriginal?: boolean;
}

const response: BoardInfoResponse =
    {
        "response": {
            "is-member-liked": false,
            "file-data": [
                {
                    "id": 31,
                    "originalFileName": "수료증명서.pdf",
                    "saveFileName": "2643e73e-b978-429c-b7d9-c8f6e09876de_수료증명서.pdf"
                }
            ],
            "comment-data": [
                {
                    "id": 3,
                    "username": "테스트",
                    "content": "테스트로 작성한 댓글1",
                    "createdTime": [
                        2023,
                        7,
                        31,
                        21,
                        22,
                        57,
                        981096000
                    ],
                    "modifiedTime": null,
                    "memberWritten": false
                },
                {
                    "id": 4,
                    "username": "테스트",
                    "content": "테스트로 작성한 댓글2",
                    "createdTime": [
                        2023,
                        7,
                        31,
                        21,
                        23,
                        1,
                        469345000
                    ],
                    "modifiedTime": null,
                    "memberWritten": false
                },
                {
                    "id": 5,
                    "username": "테스트",
                    "content": "테스트로 작성한 댓글3",
                    "createdTime": [
                        2023,
                        7,
                        31,
                        21,
                        23,
                        5,
                        192934000
                    ],
                    "modifiedTime": null,
                    "memberWritten": false
                }
            ],
            "post-data": {
                "id": 47,
                "title": "2023년도 1학기 자료구조 이의종",
                "bodyContent": "test",
                "viewCount": 49,
                "likeCount": 1,
                "subject": "자료구조",
                "professor": "이의종",
                "year": 2023,
                "semester": 1,
                "examType": "MID",
                "userName": "테스트",
                "createdTime": [
                    2023,
                    7,
                    31,
                    20,
                    22,
                    24,
                    936258000
                ],
                "modifiedTime": null,
                "memberWritten": false
            }
        },
        "error": null
    };

export async function examBoardDataLoader()
{
    try
    {
        return await new Promise(resolve =>
        {
            setTimeout(() =>
            {
                resolve({ ...pick(response.response["post-data"], ["title", "bodyContent", "subject", "professor", "year", "semester", "examType"]), existingFileData: response.response["file-data"], });
            });
        });
    }
    catch(error)
    {
        return null;
    }
}

export default function ExamBoardModifyForm()
{
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();

    const boardId = searchParam.get("boardId");

    // @ts-ignore
    const { title, bodyContent, subject, professor, year, semester, examType, existingFileData, }: ExistingBoardInfo = useLoaderData();

    const [values, setValues] = useState<Board>(
        {
            title,
            bodyContent,
            subject,
            professor,
            year,
            semester,
            examType,
        }
    );
    const [fileInformation, setFileInformation] = useState<FileInfo[]>(existingFileData.map(file => ({ file: { name: file.originalFileName, }, id: file.id, isOriginal: true, })));
    const [existingFileIdList, setExistingFileIdList] = useState<number[]>(existingFileData.map(file => file.id))

    const checkButtonDisabled = useCallback((): boolean =>
    {
        let { title, bodyContent, subject, professor, year, semester, examType, } = values;

        title = title.trim();
        subject = subject.trim();
        professor = professor.trim();

        return (
            title.length === 0 || isQuillEmpty(bodyContent) || subject.length === 0 || professor.length === 0 || !Number.isFinite(year) || year < 0 || year > new Date().getFullYear() || semester === 0 || examType === ""
        );
    }, [values]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) =>
    {
        switch(event.target.id)
        {
            case "1stSemesterRadioButton":
            {
                setValues({ ...values, semester: 1, });
                break;
            }
            case "2ndSemesterRadioButton":
            {
                setValues({ ...values, semester: 2, });
                break;
            }
            case "midtermRadioButton":
            {
                setValues({ ...values, examType: "MID", });
                break;
            }
            case "finalRadioButton":
            {
                setValues({ ...values, examType: "FINAL", });
                break;
            }
            default:
            {
                const key = event.target.id.replace("Input", "");
                const value = (key === "year") ? Number(event.target.value) : event.target.value;
                setValues({ ...values, [key]: value, });
            }
        }
    }, [values]);

    const handleContentChange = useCallback((content: string) =>
    {
        setValues({ ...values, bodyContent: content, });
    }, [values]);

    const handleFileInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) =>
    {
        const newFileInformation: FileInfo[] = Array.from(event.target.files).map(file => ({ id: nanoid(), file, }));
        setFileInformation([...fileInformation, ...newFileInformation]);
    }, [fileInformation]);

    const handleFileDelete = useCallback((targetFileInfo: FileInfo) =>
    {
        if("isOriginal" in targetFileInfo)
        {
            setExistingFileIdList(existingFileIdList.filter(id => id !== targetFileInfo.id));
        }
        setFileInformation(fileInformation.filter(fileInfo => fileInfo.id !== targetFileInfo.id));
    }, [fileInformation]);

    const handleFormSubmit = useCallback((event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        const formData = new FormData();
        const blob = new Blob([JSON.stringify({ ...values, postCategory: "EXAM", id: boardId, })], { type: "application/json", });
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

        axios.post(`${process.env.BACKEND_URL}/exam-collection-post/modify`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data", }})
            .then(() => navigate(-1))
            .catch(reason => window.alert(reason));
    }, [values, fileInformation, existingFileIdList]);

    return (
        <form
            onSubmit={handleFormSubmit}
        >
            <div>
                <div>
                    <label
                        htmlFor={"subjectInput"}
                    >
                        과목명을 입력해주세요.
                    </label>
                    <div>
                        <PiBooks/>
                        <input
                            id={"subjectInput"}
                            type={"text"}
                            value={values.subject}
                            onChange={handleInputChange}
                            autoComplete={"off"}
                            autoCapitalize={"off"}
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor={"professorInput"}
                    >
                        교수명을 입력해주세요.
                    </label>
                    <div>
                        <LiaChalkboardTeacherSolid/>
                        <input
                            id={"professorInput"}
                            type={"text"}
                            value={values.professor}
                            onChange={handleInputChange}
                            autoComplete={"off"}
                            autoCapitalize={"off"}
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor={"yearInput"}
                    >
                        연도를 입력해주세요.
                    </label>
                    <div>
                        <LiaCalendarAlt/>
                        <input
                            id={"yearInput"}
                            type={"number"}
                            value={values.year === 0 ? "" : values.year}
                            onChange={handleInputChange}
                            autoComplete={"off"}
                            autoCapitalize={"off"}
                        />
                    </div>
                </div>
                <div>
                    <PiListNumbers/>
                    <div>
                        <div>
                            <span>
                                학기를 선택해주세요.
                            </span>
                            <input
                                id={"1stSemesterRadioButton"}
                                type={"radio"}
                                name={"semesterCheckRadioButton"}
                                defaultChecked={values.semester === 1}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor={"1stSemesterRadioButton"}
                            >
                                1학기
                            </label>
                            <input
                                id={"2ndSemesterRadioButton"}
                                type={"radio"}
                                name={"semesterCheckRadioButton"}
                                defaultChecked={values.semester === 2}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor={"2ndSemesterRadioButton"}
                            >
                                2학기
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <PiExam/>
                    <div>
                        <div>
                            <span>
                                시험 종류를 선택해주세요.
                            </span>
                            <input
                                id={"midtermRadioButton"}
                                type={"radio"}
                                name={"examTypeCheckRadioButton"}
                                defaultChecked={values.examType === "MID"}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor={"midtermRadioButton"}
                            >
                                중간고사
                            </label>
                            <input
                                id={"finalRadioButton"}
                                type={"radio"}
                                name={"examTypeCheckRadioButton"}
                                defaultChecked={values.examType === "FINAL"}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor={"finalRadioButton"}
                            >
                                기말고사
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label
                        htmlFor={"titleInput"}
                    >
                        게시글 제목을 입력해주세요.
                    </label>
                    <div>
                        <MdTitle/>
                        <input
                            id={"titleInput"}
                            type={"text"}
                            value={values.title}
                            onChange={handleInputChange}
                            autoComplete={"off"}
                            autoCapitalize={"off"}
                        />
                    </div>
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
            </div>
            <div>
                <FileUpload
                    fileInformation={fileInformation}
                    onFileInputChange={handleFileInputChange}
                    onFileDelete={handleFileDelete}
                />
                <div>
                    <button
                        type={"submit"}
                        disabled={checkButtonDisabled()}
                    >
                        게시글 수정
                    </button>
                </div>
            </div>
        </form>
    );
}