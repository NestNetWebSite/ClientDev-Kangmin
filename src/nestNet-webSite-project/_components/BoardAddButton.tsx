import { useNavigate } from 'react-router-dom';

interface Props {
    content: string;
    href: string;
}

export default function BoardAddButton({ content, href }: Props) {
    const navigate = useNavigate();
    return (
        <button
            className={'rounded-2xl bg-black px-3 py-2.5 text-white transition-all hover:bg-black/[.85]'}
            onClick={() => {
                navigate(href);
            }}
        >
            {content}
        </button>
    );
}
