import { createBrowserRouter } from 'react-router-dom';
import PublicRoute from './_routers/PublicRoute';
import PrivateRoute from './_routers/PrivateRoute';
import MainHome from './(routes)/mainHome/index';
import IntroductionPage from './(routes)/introduction/index';
import History from './(routes)/introduction/History';
import Rules from './(routes)/introduction/Rules';
import Executives from './(routes)/introduction/Executives';
import FormerExecutives from './(routes)/introduction/FormerExecutives';
import SignInPage from './(routes)/signIn/page';
import SignUpPage from './(routes)/signUp/page';
import SearchIdPwPage from './(routes)/searchIdPw/page';
import UserPage from './(routes)/user/index';
import ManagerPage from './(routes)/manager/index';
import MemberInquiry from './(routes)/manager/manager-member-inquiry/MemberInuqiry';
import BoardPage from './(routes)/board/page';
import BoardInfo from './(routes)/board/board-common-components/board-info/BoardInfo';
import UnifiedBoardListPage from './(routes)/board/unified/page';
import UnifiedBoardPostPage from './(routes)/board/unified/post/page';
import UnifiedBoardModifyPage, { unifiedBoardDataLoader } from './(routes)/board/unified/modify/page';
import ExamBoardPage from './(routes)/board/board-exam/index';
import ExamBoardPostForm from './(routes)/board/board-exam/board-exam-post/ExamBoardPostForm';
import ExamBoardModifyForm, {
    examBoardDataLoader,
} from './(routes)/board/board-exam/board-exam-modify/ExamBoardModifyForm';
import ErrorPage403 from './(routes)/error/HTTP 403/index';

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
            { path: '/signin', element: <SignInPage />, caseSensitive: true },
            { path: '/signup', element: <SignUpPage />, caseSensitive: true },
            { path: '/idpw-search', element: <SearchIdPwPage />, caseSensitive: true },
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
                    { path: '/board/unified', element: <UnifiedBoardListPage /> },
                    { path: '/board/exam', element: <ExamBoardPage /> },
                    { path: '/board/gallery', element: <>Board Gallery</> },
                ],
            },
            { path: '/board/unified/:id', element: <BoardInfo /> },
            { path: '/board/unified/post', element: <UnifiedBoardPostPage /> },
            { path: '/board/unified/modify', element: <UnifiedBoardModifyPage />, loader: unifiedBoardDataLoader },
            { path: '/board/exam/:id', element: <BoardInfo /> },
            { path: '/board/exam/post', element: <ExamBoardPostForm /> },
            { path: '/board/exam/modify', element: <ExamBoardModifyForm />, loader: examBoardDataLoader },
            { path: '/error/unauthorized', element: <ErrorPage403 /> },
        ],
    },
]);

export default router;
