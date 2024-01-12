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
import BoardInfoPage from './(routes)/board/info/page';
import UnifiedBoardListPage from './(routes)/board/unified/page';
import UnifiedBoardPostPage from './(routes)/board/unified/post/page';
import UnifiedBoardModifyPage, { unifiedBoardDataLoader } from './(routes)/board/unified/modify/page';
import ExamBoardPage from './(routes)/board/exam/page';
import ExamBoardPostPage from './(routes)/board/exam/post/page';
import ExamBoardModifyPage, { examBoardDataLoader } from './(routes)/board/exam/modify/page';
import AboutMePostPage from './(routes)/(life)/about_me/post/page';
import UserActivityPage from './(routes)/user/activity/page';
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
                    { path: '/user/:userId?', element: <UserActivityPage /> },
                    { path: '/user/:userId?/activity', element: <UserActivityPage /> },
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
            { path: '/board/unified/:id', element: <BoardInfoPage /> },
            { path: '/board/unified/post', element: <UnifiedBoardPostPage /> },
            {
                path: '/board/unified/modify/:boardId',
                element: <UnifiedBoardModifyPage />,
                loader: unifiedBoardDataLoader,
            },
            { path: '/board/exam/:id', element: <BoardInfoPage /> },
            { path: '/board/exam/post', element: <ExamBoardPostPage /> },
            { path: '/board/exam/modify/:boardId', element: <ExamBoardModifyPage />, loader: examBoardDataLoader },
            { path: '/about_me/post', element: <AboutMePostPage /> },
            { path: '/error/unauthorized', element: <ErrorPage403 /> },
        ],
    },
]);

export default router;
