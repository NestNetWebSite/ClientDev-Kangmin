import SearchId from './SearchId';
import SearchPassword from './SearchPassword';

export default function Component() {
    return (
        <main className={'mx-auto w-[32rem] flex-col items-center p-3'}>
            <SearchId />
            <hr />
            <SearchPassword />
        </main>
    );
}
