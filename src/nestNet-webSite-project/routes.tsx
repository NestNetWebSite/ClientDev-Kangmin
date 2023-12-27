import { createBrowserRouter } from 'react-router-dom';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';
import MainHome from './pages/mainHome/index';
import IntroductionPage from './pages/introduction/index';
import History from './pages/introduction/History';
import Rules from './pages/introduction/Rules';
import Executives from './pages/introduction/Executives';
import FormerExecutives from './pages/introduction/FormerExecutives';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import SearchIdPw from './pages/searchIdPw/index';
import UserPage from './pages/user/index';
import ManagerPage from './pages/manager/index';
import MemberInquiry from './pages/manager/manager-member-inquiry/MemberInuqiry';
import BoardPage from './pages/board/index';
import BoardInfo from './pages/board/board-common-components/board-info/BoardInfo';
import UnifiedBoardPage from './pages/board/board-unified/index';
import UnifiedBoardPostForm from './pages/board/board-unified/board-unified-post/UnifiedBoardPostForm';
import UnifiedBoardModifyForm, {
    unifiedBoardDataLoader,
} from './pages/board/board-unified/board-unified-modify/UnifiedBoardModifyForm';
import ExamBoardPage from './pages/board/board-exam/index';
import ExamBoardPostForm from './pages/board/board-exam/board-exam-post/ExamBoardPostForm';
import ExamBoardModifyForm, {
    examBoardDataLoader,
} from './pages/board/board-exam/board-exam-modify/ExamBoardModifyForm';
import ErrorPage403 from './pages/error/HTTP 403/index';

const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            { path: '/', element: <MainHome /> },
            {
                path: '/introduction',
                element: <IntroductionPage />,
                children: [
                    { path: '/introduction/history', element: <History /> },
                    { path: '/introduction/rules', element: <Rules /> },
                    { path: '/introduction/executives', element: <Executives /> },
                    { path: '/introduction/former-executives', element: <FormerExecutives /> },
                ],
            },
            { path: '/signin', element: <SignIn />, caseSensitive: true },
            { path: '/signup', element: <SignUp />, caseSensitive: true },
            { path: '/idpw-search', element: <SearchIdPw />, caseSensitive: true },
        ],
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                element: <UserPage />,
                children: [
                    { path: '/user/:userId?', element: <>나의 활동</> },
                    { path: '/user/:userId?/activity', element: <>나의 활동</> },
                    { path: '/user/:userId?/study', element: <>스터디 관리</> },
                ],
            },
            {
                element: <ManagerPage />,
                children: [{ path: '/manager/member-inquiry', element: <MemberInquiry /> }],
            },
            {
                element: <BoardPage />,
                children: [
                    { path: '/board/unified', element: <UnifiedBoardPage /> },
                    { path: '/board/exam', element: <ExamBoardPage /> },
                    { path: '/board/gallery', element: <>Board Gallery</> },
                ],
            },
            { path: '/board/unified/:id', element: <BoardInfo /> },
            { path: '/board/unified/post', element: <UnifiedBoardPostForm /> },
            { path: '/board/unified/modify', element: <UnifiedBoardModifyForm />, loader: unifiedBoardDataLoader },
            { path: '/board/exam/:id', element: <BoardInfo /> },
            { path: '/board/exam/post', element: <ExamBoardPostForm /> },
            { path: '/board/exam/modify', element: <ExamBoardModifyForm />, loader: examBoardDataLoader },
            { path: '/error/unauthorized', element: <ErrorPage403 /> },
        ],
    },
]);

export default router;
