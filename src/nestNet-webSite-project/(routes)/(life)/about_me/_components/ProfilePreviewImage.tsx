import { memo } from 'react';

interface Props {
    profilePreviewImgSrc: string;
}

function ProfilePreviewImage({ profilePreviewImgSrc }: Props) {
    return (
        <div
            className={'h-full w-full rounded-3xl bg-cover bg-center bg-no-repeat'}
            style={{ backgroundImage: `url(${profilePreviewImgSrc})` }}
        />
    );
}

export default memo(ProfilePreviewImage);
