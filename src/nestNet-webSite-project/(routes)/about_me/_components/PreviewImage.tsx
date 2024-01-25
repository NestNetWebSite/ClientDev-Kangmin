import { memo } from 'react';

interface Props {
    previewImgSrc: string;
}

function PreviewImage({ previewImgSrc }: Props) {
    return (
        <div
            className={'h-full w-full rounded-3xl bg-cover bg-center bg-no-repeat'}
            style={{ backgroundImage: `url(${previewImgSrc})` }}
        />
    );
}

export default memo(PreviewImage);
