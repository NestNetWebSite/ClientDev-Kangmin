import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import QuillToolbar, { formats, modules } from './QuillToolbar';
import 'react-quill/dist/quill.snow.css';

interface Inputs {
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
    title: string;
    bodyContent: string;
}

export default function PostInputs() {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<Inputs>();

    return (
        <>
            <div className={'mb-12 flex w-full flex-col'}>
                <div className={'mb-4 flex items-center gap-x-1'}>
                    <label className={'mx-2.5 text-2xl font-bold text-slate-950'} htmlFor={'titleInput'}>
                        제목
                    </label>
                    {errors?.title?.message && errors?.title?.type === 'required' && (
                        <span className={'m-1 text-sm text-red-500'}>※ {errors.title.message}</span>
                    )}
                    {errors?.title?.message && errors?.title?.type === 'maxLength' && (
                        <span className={'m-1 text-sm text-red-500'}>※ {errors.title.message}</span>
                    )}
                </div>
                <input
                    className={`${
                        errors?.title?.message ? 'outline-red-500' : 'outline-gray-300'
                    } w-full rounded-2xl bg-white px-5 py-4  outline outline-1 outline-gray-300 ${
                        errors?.title?.message ? 'focus:outline-red-500' : 'focus:outline-blue-500'
                    } transition-all placeholder:text-sm`}
                    id={'titleInput'}
                    type={'text'}
                    placeholder={'게시글 제목은 최대 40자까지 입력할 수 있어요.'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('title', {
                        required: { value: true, message: '게시글 제목을 입력해주세요.' },
                        maxLength: { value: 40, message: '최대 40자까지 입력 가능합니다.' },
                    })}
                />
            </div>
            <div className={'mb-8 flex w-full flex-col'}>
                <div className={'mb-4 flex items-center gap-x-1'}>
                    <span className={'mx-2.5 mb-2 text-2xl font-bold text-slate-950'}>내용</span>
                    {errors?.bodyContent?.message && errors?.bodyContent?.type === 'required' && (
                        <span className={'m-1 text-sm text-red-500'}>※ {errors.bodyContent.message}</span>
                    )}
                </div>
                <div
                    className={`rounded-2xl border ${
                        errors?.bodyContent?.message ? 'border-red-500' : 'border-gray-300'
                    } ${
                        errors?.bodyContent?.message ? 'focus-within:border-red-500' : 'focus-within:border-blue-500'
                    } transition-all`}
                >
                    <Controller
                        control={control}
                        name={'bodyContent'}
                        rules={{
                            validate: {
                                required(value) {
                                    return value.length !== 0 || '게시글 내용을 입력해주세요.';
                                },
                            },
                        }}
                        render={({ field }) => {
                            return (
                                <>
                                    <QuillToolbar />
                                    <ReactQuill
                                        theme={'snow'}
                                        modules={modules}
                                        formats={formats}
                                        placeholder={'게시글 내용을 입력해주세요.'}
                                        defaultValue={field.value}
                                        className={'h-[26rem] rounded-b-xl border-t border-t-gray-300'}
                                        onChange={(content: string) => {
                                            if (content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                                                field.onChange('');
                                            } else {
                                                field.onChange(content);
                                            }
                                        }}
                                        onBlur={field.onBlur}
                                    />
                                </>
                            );
                        }}
                    />
                </div>
            </div>
        </>
    );
}
