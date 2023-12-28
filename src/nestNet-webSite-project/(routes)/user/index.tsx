import axios from 'axios';
import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UserInfo from './userInfo/UserInfo';
import SideNavbar from './SideNavbar';

interface UserInfo {
    loginId: string;
    name: string;
    emailAddress: string;
    studentId: string;
    memberAuthority: string;
    grade: number;
    graduateYear: number;
    loginMember: boolean;
}

export default function Component() {
    const userId = useParams().userId ?? '';
    const { data: userInformation, isLoading } = useQuery<UserInfo>({
        queryKey: ['user information'],
        queryFn() {
            console.log('in query');
            return axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:8080/member-profile/member-info${
                        userId === '' ? '' : `/${userId}`
                    }`,
                    {
                        headers: { Authorization: localStorage.getItem('access_token') },
                    },
                )
                .then((response) => response.data.response);
        },
        retry: false,
        refetchOnMount: false,
        gcTime: 0,
    });

    if (isLoading) {
        return <></>;
    }

    console.log(JSON.stringify(userInformation));

    return (
        <>
            <main className={'mx-auto mt-8 flex w-[74rem] gap-x-6 p-4'}>
                <UserInfo
                    name={userInformation.name}
                    emailAddress={userInformation.emailAddress}
                    grade={userInformation.grade}
                    loginId={userInformation.loginId}
                    memberAuthority={userInformation.memberAuthority}
                    graduateYear={userInformation.graduateYear}
                    studentId={userInformation.studentId}
                />
                <div className={'flex flex-1 flex-col gap-y-2 rounded-3xl border border-gray-200 p-4 shadow-lg'}>
                    <SideNavbar />
                    <hr />
                    <Outlet />
                </div>
            </main>
        </>
    );
}
