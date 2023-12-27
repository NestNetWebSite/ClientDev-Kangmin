import axios from 'axios';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from 'react-modal';
import router from './routes';

Modal.setAppElement('#root');

const queryClient: QueryClient = new QueryClient();

function Root() {
    // useQuery({
    //     queryKey: ['accessToken'],
    //     queryFn() {
    //         return axios
    //             .get('http://localhost:3001/users/aaaa1234')
    //             .then((response) => response.data.accessToken)
    //             .catch(() => '');
    //     },
    //     retry: false,
    //     refetchInterval: 7200000,
    // });

    return (
        <>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
        </>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Root />
        </QueryClientProvider>
    );
}
