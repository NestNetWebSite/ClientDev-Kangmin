import { useLocation, useParams } from 'react-router-dom';
import UnifiedBoardPage from '../../(routes)/board/[boardId]/page';
import PedigreeBoardPage from '../../(routes)/pedigree/[boardId]/page';
import NoticeBoardPage from '../../(routes)/board/[boardId]/page';
import Error404Page from '../../(routes)/_errors/http404/page';

export default function ValidateBoardId() {
    const { boardId } = useParams();
    const { pathname } = useLocation();

    if (!/^[0-9]*$/.test(boardId)) {
        return <Error404Page />;
    }

    const boardType = pathname.split('/')[1];
    console.log(boardType);

    if (boardType === 'board') {
        return <UnifiedBoardPage boardId={boardId} />;
    }

    if (boardType === 'pedigree') {
        return <PedigreeBoardPage boardId={boardId} />;
    }

    if (boardType === 'notice') {
        return <NoticeBoardPage boardId={boardId} />;
    }

    return <></>;
}
