export default function getProfilePreviewImgSrc(fileList: FileList | null | undefined) {
    if (!fileList) {
        return '';
    }

    if (fileList.length === 0) {
        return '';
    }

    const file = fileList[0];
    const fileType = file.type;

    if (fileType.includes('jpg') || fileType.includes('jpeg') || fileType.includes('png')) {
        return URL.createObjectURL(file);
    }

    return '';
}
