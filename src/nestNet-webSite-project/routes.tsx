import { createBrowserRouter } from 'react-router-dom';

import PublicRoute from './_routers/PublicRoute';
import PrivateRoute from './_routers/PrivateRoute';

import GlobalNavbar from './_components/globalNavbar/GlobalNavbar';
import MainHome from './(routes)/mainHome/index';

import IntroductionPage from './(routes)/introduction/index';
import History from './(routes)/introduction/History';
import Rules from './(routes)/introduction/Rules';
import Executives from './(routes)/introduction/Executives';
import FormerExecutives from './(routes)/introduction/FormerExecutives';

import SignInPage from './(routes)/signIn/page';
import SignUpPage from './(routes)/signUp/page';
import SearchIdPwPage from './(routes)/searchIdPw/page';

import UserPage from './(routes)/user/page';

import ValidateBoardId from './_components/boardInfo/ValidateBoardId';

import UnifiedBoardListPage from './(routes)/board/page';
import UnifiedBoardPostPage from './(routes)/board/post/page';
import UnifiedBoardModifyPage, { unifiedBoardDataLoader } from './(routes)/board/modify/page';

import PedigreeBoardListPage from './(routes)/pedigree/page';
import PedigreeBoardPostPage from './(routes)/pedigree/post/page';
import PedigreeBoardModifyPage, { pedigreeBoardDataLoader } from './(routes)/pedigree/modify/page';

import AboutMePostPage from './(routes)/about_me/post/page';

import NoticeBoardListPage from './(routes)/notice/page';
import NoticeBoardPostPage from './(routes)/notice/post/page';
import NoticeBoardModifyPage, { noticeBoardLoader } from './(routes)/notice/modify/page';

import UserActivityPage from './(routes)/user/activity/page';
import Error404Page from './(routes)/_errors/http404/page';

const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            { path: '/', element: <MainHome /> },
            {
                element: <IntroductionPage />,
                children: [
                    { path: '/history', element: <History /> },
                    { path: '/rules', element: <Rules /> },
                    { path: '/executives', element: <Executives /> },
                    { path: '/former-executives', element: <FormerExecutives /> },
                ],
            },
            { path: '/signin', element: <SignInPage />, caseSensitive: true },
            { path: '/signup', element: <SignUpPage />, caseSensitive: true },
            { path: '/idpw-search', element: <SearchIdPwPage />, caseSensitive: true },
        ],
        errorElement: (
            <>
                <GlobalNavbar />
                <Error404Page />
            </>
        ),
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

            /*
                <통합 게시판 관련>
                /board -> 통합 게시판 조회
                /board/:boardId -> 통합 게시판 조회 (1개)
                /board/post -> 통합 게시판 작성
                /board/modify/:boardId -> 통합 게시판 수정
            */
            {
                path: '/board',
                element: <UnifiedBoardListPage />,
            },
            {
                path: '/board/:boardId',
                element: <ValidateBoardId />,
            },
            {
                path: '/board/post',
                element: <UnifiedBoardPostPage />,
            },
            {
                path: '/board/modify/:boardId',
                element: <UnifiedBoardModifyPage />,
                loader: unifiedBoardDataLoader,
            },

            /*
                <족보 게시판 관련>
                /pedigree -> 족보 게시판 조회
                /pedigree/:boardId -> 족보 게시판 조회 (1개)
                /pedigree/post -> 족보 게시판 작성
                /pedigree/modify/:boardId -> 족보 게시판 수정
            */
            { path: '/pedigree', element: <PedigreeBoardListPage /> },
            { path: '/pedigree/:boardId', element: <ValidateBoardId /> },
            { path: '/pedigree/post', element: <PedigreeBoardPostPage /> },
            {
                path: '/pedigree/modify/:boardId',
                element: <PedigreeBoardModifyPage />,
                loader: pedigreeBoardDataLoader,
            },

            { path: '/notice', element: <NoticeBoardListPage /> },
            { path: '/notice/:boardId', element: <ValidateBoardId /> },
            { path: '/notice/post', element: <NoticeBoardPostPage /> },
            {
                path: '/notice/modify/:boardId',
                element: <NoticeBoardModifyPage />,
                loader: noticeBoardLoader,
            },

            { path: '/about_me/post', element: <AboutMePostPage /> },
        ],
        errorElement: (
            <>
                <GlobalNavbar />
                <Error404Page />
            </>
        ),
    },
]);

export default router;
