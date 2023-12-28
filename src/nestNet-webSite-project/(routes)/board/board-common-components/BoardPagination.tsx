import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import queryString from 'query-string';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { RiSkipRightLine, RiSkipLeftLine } from 'react-icons/ri';

export default function BoardPagination({ totalItemsCount }: { totalItemsCount: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');

    return (
        <div>
            <Pagination
                totalItemsCount={totalItemsCount}
                onChange={(targetPage: number) => {
                    const parsed = queryString.parse(window.location.search);
                    setSearchParams({ ...parsed, page: String(targetPage) });
                }}
                activePage={currentPage}
                itemsCountPerPage={10}
                pageRangeDisplayed={Math.ceil(totalItemsCount / 10)}
                prevPageText={<AiOutlineLeft />}
                firstPageText={<RiSkipLeftLine />}
                nextPageText={<AiOutlineRight />}
                lastPageText={<RiSkipRightLine />}
            />
        </div>
    );
}
