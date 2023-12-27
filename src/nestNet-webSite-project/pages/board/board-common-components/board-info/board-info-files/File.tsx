import { PiFile, PiDownloadSimple } from 'react-icons/pi';

interface Props {
    originalFileName: string;
    saveFileName: string;
    onFileDownloadButtonClick(originalFileName: string, saveFileName: string): Promise<void>;
}

export default function File({ originalFileName, saveFileName, onFileDownloadButtonClick }: Props) {
    return (
        <li className='my-4 flex w-[27rem] items-center rounded-lg border border-slate-300 px-3 py-3'>
            <PiFile className='mx-1.5 h-6 w-6' />
            <p className='flex-grow text-base font-semibold text-gray-600'>{originalFileName}</p>
            <button
                className='mx-3 p-2 duration-300 hover:rounded-full hover:bg-slate-100'
                type={'button'}
                onClick={() => {
                    onFileDownloadButtonClick(originalFileName, saveFileName).catch((error) => window.alert(error));
                }}
            >
                <PiDownloadSimple className='h-7 w-7' />
            </button>
        </li>
    );
}
