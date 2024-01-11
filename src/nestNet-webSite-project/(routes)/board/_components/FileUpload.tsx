import { ChangeEventHandler, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { LiaFileUploadSolid } from 'react-icons/lia';

interface FileData {
    id: string | number;
    file: File | { name: string };
    isOriginal?: boolean;
}

interface Props {
    fileInformation: FileData[];

    onFileInputChange: ChangeEventHandler<HTMLInputElement>;

    onFileDeleteButtonClick(targetFileInfo: FileData): void;
}

export default function FileUpload({ fileInformation, onFileInputChange, onFileDeleteButtonClick }: Props) {
    const inputFileRef = useRef<HTMLInputElement>(null);

    return (
        <div className={'my-7 flex w-full flex-col'}>
            <span className={'mx-2.5 mb-2 font-bold text-slate-950'}>파일 첨부</span>
            <div className={'flex items-center'}>
                <input type={'file'} hidden ref={inputFileRef} onChange={onFileInputChange} multiple={true} />
                <button
                    type={'button'}
                    className={'mr-3 box-content rounded-full bg-slate-950 p-2 transition-all hover:scale-110'}
                    onClick={() => {
                        inputFileRef.current.value = null;
                        inputFileRef.current.click();
                    }}
                >
                    <LiaFileUploadSolid className={'h-7 w-7 text-white'} />
                </button>
                <div className={'flex h-16 w-[19.9rem] items-center'}>
                    {fileInformation.length === 0 ? (
                        <span className={'text-sm text-gray-500'}>첨부 파일이 없습니다.</span>
                    ) : (
                        <ul
                            className={
                                'flex w-full items-center overflow-x-scroll whitespace-nowrap p-1 scrollbar-hide'
                            }
                        >
                            {fileInformation.map(fileInfo => {
                                return (
                                    <li
                                        className={
                                            'mx-1 box-content flex items-center rounded-2xl border border-gray-300 bg-white p-1.5'
                                        }
                                        key={fileInfo.id}
                                    >
                                        <span className={'ml-2 text-sm'}>{fileInfo.file.name}</span>
                                        <button
                                            className={
                                                'ml-3 box-content p-1 duration-300 hover:rounded-full hover:bg-gray-100'
                                            }
                                            type={'button'}
                                            onClick={() => {
                                                onFileDeleteButtonClick(fileInfo);
                                            }}
                                        >
                                            <IoCloseOutline className={'h-6 w-6 '} />
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
