import { Link, Outlet, RouterProvider, createBrowserRouter, ActionFunction, redirect } from 'react-router-dom';
import TeamLayout from './react-router-study-data-api/routes/TeamLayout';
import Team from './react-router-study-data-api/routes/Team';
import TeamError from './react-router-study-data-api/routes/TeamError';

let teams = [
    { id: '1', name: 'Red' },
    { id: '2', name: 'Blue' },
    { id: '3', name: 'Green' },
];

async function teamsLoader() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
        teams,
    };
}

async function teamLoader({ params }: { params: { id: string } }) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const team = teams.find((team) => team.id === params.id);
    return {
        team,
    };
}

const teamsAction: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case 'POST': {
            const team = { id: String(teams.length + 1), name: `Team ${teams.length + 1}` };
            teams.push(team);
            return team;
        }
        case 'DELETE': {
            const formData = await request.formData();
            const id = formData.get('id');

            teams = teams.filter((team) => team.id !== id);
            return redirect('/team');
        }
        default: {
            throw new Response('', { status: 405 });
        }
    }
};

// const teamAction: ActionFunction = ({ request, params, }) =>
// {
//     switch(request.method)
//     {
//         case "DELETE":
//         {
//             teams = teams.filter(team => team.id !== params.id);
//             return redirect("/team");
//         }
//         default:
//         {
//             throw new Response("", { status: 405, });
//         }
//     }
// }

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/about'}>About</Link>
                </li>
                <li>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li>
                    <Link to={'/team'}>Team</Link>
                </li>
                <li>
                    <Link to={'/nothing-here'}>Nothing-Here</Link>
                </li>
            </ul>
        </nav>
    );
}

function Layout() {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    );
}

// @ts-ignore
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <>Layout Error</>,
        children: [
            {
                index: true,
                async lazy() {
                    const { loader, default: Component } = await import('./react-router-study-data-api/routes/Home');
                    return {
                        loader,
                        element: <Component />,
                    };
                },
            },

            // @ts-ignore
            { path: 'about', lazy: () => import('./react-router-study-data-api/routes/About') },
            { path: 'dashboard', element: <>Dashboard</> },
            {
                path: 'team',
                element: <TeamLayout />,
                errorElement: <>Team Layout Error</>,
                loader: teamsLoader,
                action: teamsAction,
                children: [
                    { index: true, element: <>Team Index</> },
                    {
                        path: ':id',
                        element: <Team />,
                        errorElement: <TeamError />,

                        // @ts-ignore
                        loader: teamLoader,
                        // action: teamAction,
                    },
                ],
            },
            { path: 'nothing-here', element: <>Nothing Here</> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
