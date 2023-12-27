import { FaRegUser } from 'react-icons/fa';
import getAvatarStyle from '../../../utils/getAvatarStyle';

interface Props {
    userName: string;
    memberAuthority: string;
}

export default function WriterAvatar({ userName, memberAuthority }: Props) {
    const avatarStyle = getAvatarStyle(memberAuthority);
    return (
        <div className='flex items-center'>
            <FaRegUser className='mr-2 h-5 w-5 text-gray-500' />
            <div style={avatarStyle} className='flex h-10 w-10 items-center justify-center rounded-full'>
                <span className='text-xs'>{userName.slice(0, 3)}</span>
            </div>
        </div>
    );
}
