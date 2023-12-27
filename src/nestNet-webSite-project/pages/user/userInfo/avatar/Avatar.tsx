import getAvatarStyle from '../../../../utils/getAvatarStyle';

interface Props {
    name: string;
    memberAuthority: string;
}

export default function Avatar({ name, memberAuthority }: Props) {
    const avatarStyle = getAvatarStyle(memberAuthority);
    return (
        <div
            className={'mt-6 flex h-[7rem] w-[7rem] items-center justify-center rounded-full text-3xl shadow-md'}
            style={avatarStyle}
        >
            {name}
        </div>
    );
}
