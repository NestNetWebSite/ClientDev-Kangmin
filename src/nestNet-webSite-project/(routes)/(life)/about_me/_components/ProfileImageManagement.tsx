import { useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import getProfilePreviewImgSrc from '../_lib/getProfilePreviewImgSrc';
import ProfilePreviewImage from './ProfilePreviewImage';
import ProfileImageModal from './ProfileImageModal';

interface Inputs {
    title: string;
    bodyContent: string;
    profileImage: FileList;
}

export default function ProfileImageManagement() {
    const {
        control,
        formState: { errors },
        resetField,
        watch,
    } = useFormContext<Inputs>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const profileImageInputRef = useRef<HTMLInputElement>(null);

    const imageFileList = watch('profileImage');
    const profilePreviewImgSrc = useMemo(() => {
        return getProfilePreviewImgSrc(imageFileList);
    }, [imageFileList]);

    return (
        <div className={'flex flex-col'}>
            <div className={'flex w-full flex-col'}>
                <Controller
                    control={control}
                    name={'profileImage'}
                    rules={{
                        validate: {
                            invalidFileExtension(value) {
                                if (!value) {
                                    return true;
                                }

                                if (value.length === 0) {
                                    return true;
                                }

                                const fileType = value[0].type;
                                return (
                                    fileType.includes('jpg') ||
                                    fileType.includes('jpeg') ||
                                    fileType.includes('png') ||
                                    '.jpg 또는 .jpeg 또는 .png 파일만 첨부할 수 있어요.'
                                );
                            },
                        },
                    }}
                    render={({ field }) => {
                        return (
                            <input
                                type={'file'}
                                multiple={false}
                                hidden
                                accept={'image/jpeg,image/jpg,image/png'}
                                onChange={event => {
                                    field.onChange(event.target.files);
                                    field.onBlur();
                                }}
                                ref={profileImageInputRef}
                            />
                        );
                    }}
                />
                <div className={'mb-2 flex flex-col gap-y-1'}>
                    <span className={'mx-2.5 font-bold text-slate-950'}>프로필 이미지 설정</span>
                </div>
                {profilePreviewImgSrc !== '' ? (
                    <>
                        <div
                            className={'flex h-[23.43rem] w-full flex-col items-center justify-center rounded-3xl'}
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        >
                            <ProfilePreviewImage profilePreviewImgSrc={profilePreviewImgSrc} />
                        </div>
                        <span className={'my-3 inline-block text-center text-sm text-gray-500'}>
                            ※ 이미지 클릭시 전체 이미지를 볼 수 있어요.
                        </span>
                        <div className={'flex w-full gap-x-2'}>
                            <button
                                className={
                                    'box-content rounded-3xl bg-slate-950 px-3 py-2 text-sm text-white transition-all hover:bg-slate-950/[.85]'
                                }
                                type={'button'}
                                onClick={() => {
                                    profileImageInputRef.current.click();
                                }}
                            >
                                재업로드
                            </button>
                            <button
                                className={
                                    'box-content rounded-3xl bg-slate-950 px-3 py-2 text-sm text-white transition-all hover:bg-slate-950/[.85]'
                                }
                                type={'button'}
                                onClick={() => {
                                    resetField('profileImage');
                                }}
                            >
                                사진 삭제
                            </button>
                        </div>
                    </>
                ) : (
                    <div
                        className={`relative h-[23.4286rem] w-full rounded-3xl border-2 border-dotted text-center ${
                            errors?.profileImage?.message ? 'border-red-500' : 'border-gray-300'
                        } transition-all`}
                    >
                        {errors?.profileImage?.message ? (
                            errors?.profileImage?.type === 'invalidFileExtension' && (
                                <div
                                    className={
                                        'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-0.5 text-sm text-red-500'
                                    }
                                >
                                    <span>※ {errors.profileImage.message}</span>
                                    <div>
                                        <span
                                            className={
                                                'inline-block cursor-pointer rounded-2xl px-2 py-1 transition-all hover:bg-red-100'
                                            }
                                            onClick={() => {
                                                profileImageInputRef.current.value = null;
                                                profileImageInputRef.current.click();
                                            }}
                                        >
                                            재업로드
                                        </span>
                                        &nbsp;/&nbsp;
                                        <span
                                            className={
                                                'inline-block cursor-pointer rounded-2xl px-2 py-1 transition-all hover:bg-red-100'
                                            }
                                            onClick={() => {
                                                resetField('profileImage');
                                            }}
                                        >
                                            프로필 사진 사용 안하기
                                        </span>
                                    </div>
                                </div>
                            )
                        ) : (
                            <span
                                className={
                                    'absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-sm text-gray-500'
                                }
                                onClick={() => {
                                    profileImageInputRef.current.value = null;
                                    profileImageInputRef.current.click();
                                }}
                            >
                                프로필 이미지가 없습니다.
                                <br />
                                여기를 눌러 프로필 이미지를 설정해 보세요.
                            </span>
                        )}
                    </div>
                )}
            </div>
            <ProfileImageModal
                isModalOpen={isModalOpen}
                profileImageSrc={profilePreviewImgSrc}
                onModalCloseButtonClick={() => {
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}
