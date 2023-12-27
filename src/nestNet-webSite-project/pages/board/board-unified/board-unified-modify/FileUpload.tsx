import { ChangeEvent, useRef, } from "react";
import { IoCloseOutline, } from "react-icons/io5";
import { MdOutlineFileUpload, } from "react-icons/md";

interface FileInfo
{
    id: string|number;
    file: File | { name: string; }
    isOriginal?: boolean;
}

interface Props
{
    fileInformation: FileInfo[],
    onFileInputChange(event: ChangeEvent<HTMLInputElement>): void;
    onFileDelete(targetFileInfo: FileInfo): void;
}

export default function FileUpload({ fileInformation, onFileInputChange, onFileDelete, }: Props)
{
    const inputFileRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <span>
                아래 버튼을 눌러 파일을 첨부하세요.
            </span>
            <div>
                <input
                    type={"file"}
                    ref={inputFileRef}
                    onChange={onFileInputChange}
                    multiple
                    className={"hidden"}
                />
                <button
                    type={"button"}
                    onClick={(): void =>
                    {
                        inputFileRef.current.value = null;
                        inputFileRef.current.click();
                    }}
                >
                    <MdOutlineFileUpload/>
                </button>
                <div>
                    {
                        fileInformation.length === 0 ?
                        <p>
                            첨부 파일이 없습니다.
                        </p>
                        :
                        <ul>
                            {
                                fileInformation.map(fileInfo =>
                                {
                                    return (
                                        <li
                                            key={fileInfo.id}
                                        >
                                            <span>
                                                {fileInfo.file.name}
                                            </span>
                                            <button
                                                type={"button"}
                                                onClick={(): void => { onFileDelete(fileInfo); }}
                                            >
                                                <IoCloseOutline/>
                                            </button>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
        </div>
    );
};