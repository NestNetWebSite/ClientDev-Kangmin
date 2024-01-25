import { useParams } from 'react-router-dom';
import BoardInfoPage from '../page';
import Error404Page from '../../../_errors/http404/page';

export default function ValidateBoardId() {
    const { id: boardId } = useParams();

    if (!/^[0-9]*$/.test(boardId)) {
        return <Error404Page />;
    }

    return <BoardInfoPage boardId={boardId} />;
}
