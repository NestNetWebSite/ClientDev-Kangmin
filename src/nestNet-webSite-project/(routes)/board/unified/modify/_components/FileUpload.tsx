import { ChangeEvent, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';

interface FileInfo {
    id: string | number;
    file: File | { name: string };
    isOriginal?: boolean;
}

interface Props {
    fileInformation: FileInfo[];

    onFileInputChange(event: ChangeEvent<HTMLInputElement>): void;

    onFileDeleteButtonClick(targetFileInfo: FileInfo): void;
}

export default function FileUpload({ fileInformation, onFileInputChange, onFileDeleteButtonClick }: Props) {
    const inputFileRef = useRef<HTMLInputElement>(null);

    return (
        <div className={'my-7 flex flex-col'}>
            <span className={'mx-2.5 mb-2 font-semibold text-gray-600'}>아래 버튼을 눌러 파일을 첨부하세요.</span>
            <div className={'flex w-full items-center'}>
                <input
                    hidden
                    type={'file'}
                    ref={inputFileRef}
                    onChange={onFileInputChange}
                    multiple
                    className={'hidden'}
                />
                <button
                    className={'mr-4 box-content rounded-full bg-rose-800 p-2 shadow duration-300 hover:scale-110'}
                    type={'button'}
                    onClick={(): void => {
                        inputFileRef.current.value = null;
                        inputFileRef.current.click();
                    }}
                >
                    <MdOutlineFileUpload className={'h-7 w-7 text-white'} />
                </button>
                <div className={'flex h-16 flex-1 items-center overflow-x-scroll whitespace-nowrap p-1 scrollbar-hide'}>
                    {fileInformation.length === 0 ? (
                        <span className={'font-semibold text-gray-400'}>첨부 파일이 없습니다.</span>
                    ) : (
                        <ul className={'flex w-full flex-grow'}>
                            {fileInformation.map(fileInfo => {
                                return (
                                    <li
                                        className={'mx-1 box-content flex items-center rounded-2xl bg-gray-100 p-1.5'}
                                        key={fileInfo.id}
                                    >
                                        <span className={'ml-2'}>{fileInfo.file.name}</span>
                                        <button
                                            className={
                                                'ml-3 box-content p-1 duration-300 hover:rounded-full hover:bg-gray-200'
                                            }
                                            type={'button'}
                                            onClick={(): void => {
                                                onFileDeleteButtonClick(fileInfo);
                                            }}
                                        >
                                            <IoCloseOutline className={'h-6 w-6'} />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
