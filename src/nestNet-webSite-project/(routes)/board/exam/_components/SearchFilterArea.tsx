import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { BiFilter, BiSearch } from 'react-icons/bi';
import { debounce, isEqual } from 'lodash';
import useExamSearchFilterStore from '../../../../_stores/useExamSearchFilterStore';
import SearchFilterModal from './SearchFilterModal';

interface ExamSearchFilter {
    year: number;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

interface Props {
    currentSearchFilter: ExamSearchFilter;

    updateCurrentSearchFilter(newSearchFilter: ExamSearchFilter): void;
}

export default function SearchFilterArea({ currentSearchFilter, updateCurrentSearchFilter }: Props) {
    const queryClient = useQueryClient();

    const { examSearchFilter } = useExamSearchFilterStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? 1);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    }, [isModalOpen]);

    const handleSearchButtonClick = useCallback(
        debounce(() => {
            if (isEqual(examSearchFilter, currentSearchFilter) && currentPage === 1) {
                queryClient.invalidateQueries({ queryKey: ['examList '] }).catch(error => window.alert(error));
            } else if (isEqual(examSearchFilter, currentSearchFilter) && currentPage !== 1) {
                setSearchParams({ page: '1' });
            } else {
                updateCurrentSearchFilter(examSearchFilter);
                setSearchParams({ page: '1' });
            }
        }, 190),
        [examSearchFilter, currentSearchFilter, currentPage],
    );

    return (
        <div className={'mx-8'}>
            <button
                onClick={() => {
                    setIsModalOpen(true);
                }}
                className={'mr-5 box-content rounded-full p-1 duration-300 hover:scale-105 hover:bg-gray-100'}
            >
                <BiFilter className={'h-10 w-10'} />
            </button>
            <button
                onClick={() => {
                    handleSearchButtonClick();
                }}
                className={'box-content rounded-full p-1 duration-300 hover:scale-105 hover:bg-gray-100'}
            >
                <BiSearch className={'h-9 w-9'} />
            </button>
            <SearchFilterModal
                isModalOpen={isModalOpen}
                onModalCloseButtonClick={() => {
                    setIsModalOpen(false);
                }}
                closeModal={() => {
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}
