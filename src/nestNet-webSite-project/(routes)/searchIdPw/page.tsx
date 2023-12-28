import SearchId from './_components/SearchId';
import SearchPassword from './_components/SearchPassword';

export default function Component() {
    return (
        <main className={'mx-auto w-[32rem] flex-col items-center p-3'}>
            <SearchId />
            <hr />
            <SearchPassword />
        </main>
    );
}
