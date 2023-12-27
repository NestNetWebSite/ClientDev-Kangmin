import { ChangeEvent, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';

interface FileInfo {
    id: string;
    file: File;
}

interface Props {
    fileInformation: FileInfo[];

    onFileInputChange(event: ChangeEvent<HTMLInputElement>): void;

    onFileDelete(targetFileInfo: FileInfo): void;
}

export default function FileUpload({ fileInformation, onFileInputChange, onFileDelete }: Props) {
    const inputFileRef = useRef<HTMLInputElement>();

    return (
        <div className='flex w-4/5 flex-col'>
            <span className='mx-2.5 mb-2 font-semibold text-gray-600'>파일 첨부</span>
            <div className='flex items-center'>
                <input
                    type={'file'}
                    className={'hidden'}
                    ref={inputFileRef}
                    onChange={onFileInputChange}
                    multiple={true}
                />
                <button
                    type={'button'}
                    className='mr-4 box-content rounded-full bg-orange-400 p-2 shadow duration-300 hover:scale-110'
                    onClick={(): void => {
                        inputFileRef.current.value = null;
                        inputFileRef.current.click();
                    }}
                >
                    <MdOutlineFileUpload className='h-7 w-7 text-white' />
                </button>
                <div className='flex h-16 w-[32.7rem] items-center'>
                    {fileInformation.length === 0 ? (
                        <span className='font-semibold text-gray-400'>첨부 파일이 없습니다.</span>
                    ) : (
                        <ul className='flex items-center overflow-scroll whitespace-nowrap p-1 scrollbar-hide'>
                            {fileInformation.map((fileInfo) => {
                                return (
                                    <li
                                        className='mx-1 box-content flex items-center rounded-2xl bg-gray-100 p-1.5'
                                        key={fileInfo.id}
                                    >
                                        <span className='ml-2'>{fileInfo.file.name}</span>
                                        <button
                                            className='ml-3 box-content p-1 duration-300 hover:rounded-full hover:bg-gray-200'
                                            type={'button'}
                                            onClick={(): void => {
                                                onFileDelete(fileInfo);
                                            }}
                                        >
                                            <IoCloseOutline className='h-6 w-6 ' />
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
