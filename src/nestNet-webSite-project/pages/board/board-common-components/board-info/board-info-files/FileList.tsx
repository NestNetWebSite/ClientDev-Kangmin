import axios from 'axios';
import { useCallback } from 'react';
import File from './File';
import type { FileData } from '../types';

export default function FileList({ files }: { files: FileData[] }) {
    const handleFileDownloadButtonClick = useCallback(async (originalFileName: string, saveFileName: string) => {
        const boardId = window.location.pathname.split('/')[3];
        const result = await axios
            .get(`${process.env.BACKEND_URL}/file/${boardId}/${saveFileName}`, { responseType: 'blob' })
            .then((response) => response.data);
        const blob = new Blob([result], {
            type: 'application/octet-stream',
        });
        const objectUrl = URL.createObjectURL(blob);
        const $aElement = document.createElement('a');

        $aElement.download = originalFileName;
        $aElement.href = objectUrl;
        $aElement.className = 'hidden';

        $aElement.click();
        $aElement.remove();

        URL.revokeObjectURL(objectUrl);
    }, []);

    return (
        <>
            {files.length !== 0 && (
                <ul className='mb-5'>
                    <h1 className='text-base font-bold'>첨부파일 목록</h1>
                    {files.map((file) => {
                        return (
                            <File
                                key={file.id}
                                originalFileName={file.originalFileName}
                                saveFileName={file.saveFileName}
                                onFileDownloadButtonClick={handleFileDownloadButtonClick}
                            />
                        );
                    })}
                </ul>
            )}
        </>
    );
}
