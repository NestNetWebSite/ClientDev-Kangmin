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
import BoardPage from './(routes)/board/page';
import ValidateBoardId from './(routes)/board/info/_components/ValidateBoardId';
import UnifiedBoardListPage from './(routes)/board/unified/page';
import UnifiedBoardPostPage from './(routes)/board/unified/post/page';
import UnifiedBoardModifyPage, { unifiedBoardDataLoader } from './(routes)/board/unified/modify/page';
import ExamBoardPage from './(routes)/board/exam/page';
import ExamBoardPostPage from './(routes)/board/exam/post/page';
import ExamBoardModifyPage, { examBoardDataLoader } from './(routes)/board/exam/modify/page';
import AboutMePostPage from './(routes)/(life)/about_me/post/page';
import NoticePostPage from './(routes)/(life)/notice/post/page';
import UserActivityPage from './(routes)/user/activity/page';
import Error404Page from './(routes)/_errors/http404/page';

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
        errorElement: <Error404Page />,
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                element: <UserPage />,
                children: [
                    { path: '/user/:userId?', element: <UserActivityPage /> },
                    { path: '/user/:userId?/activity', element: <UserActivityPage /> },
                    { path: '/user/:userId?/study', element: <>스터디 관리</> },
                ],
            },
            {
                element: <BoardPage />,
                children: [
                    { path: '/board/unified', element: <UnifiedBoardListPage /> },
                    { path: '/board/exam', element: <ExamBoardPage /> },
                    { path: '/board/gallery', element: <>Board Gallery</> },
                ],
            },
            { path: '/board/unified/post', element: <UnifiedBoardPostPage /> },
            {
                path: '/board/unified/modify/:boardId',
                element: <UnifiedBoardModifyPage />,
                loader: unifiedBoardDataLoader,
            },
            { path: '/board/unified/:id', element: <ValidateBoardId /> },
            { path: '/board/exam/post', element: <ExamBoardPostPage /> },
            { path: '/board/exam/modify/:boardId', element: <ExamBoardModifyPage />, loader: examBoardDataLoader },
            { path: '/board/exam/:id', element: <ValidateBoardId /> },
            { path: '/about_me/post', element: <AboutMePostPage /> },
            { path: '/notice/post', element: <NoticePostPage /> },
        ],
        errorElement: <Error404Page />,
    },
]);

export default router;
