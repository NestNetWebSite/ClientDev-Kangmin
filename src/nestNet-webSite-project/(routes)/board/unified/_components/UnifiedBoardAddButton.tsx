import { useNavigate, } from "react-router-dom";
import { PiPlus, } from "react-icons/pi";

export default function UnifiedBoardAddButton()
{
    const navigate = useNavigate();
    return (
        <button
            onClick={(): void => { navigate("/board/unified/post")}}
        >
            <PiPlus/>
        </button>
    );
};