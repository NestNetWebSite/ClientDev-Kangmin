import { Link, } from "react-router-dom";

export default function SideNavBar()
{
    return (
        <nav>
            <ul>
                <li>
                    <Link to={"/board/unified"}>
                        통합 게시판
                    </Link>
                </li>
                <li>
                    <Link to={"/board/exam"}>
                        족보 게시판
                    </Link>
                </li>
                <li>
                    <Link to={"/board/gallery"}>
                        사진 게시판
                    </Link>
                </li>
            </ul>
        </nav>
    );
}