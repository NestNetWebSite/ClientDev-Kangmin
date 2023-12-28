import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { BiFilter, BiSearch } from 'react-icons/bi';
import { debounce, isEqual } from 'lodash';
import useExamSearchFilterStore from '../../../../_stores/useExamSearchFilterStore';
import SearchFilterModal from './SearchFilterModal';
import type { ExamSearchFilterType } from './types';

interface Props {
    currentSearchFilter: ExamSearchFilterType;

    onSearchFilterSet(newSearchFilter: ExamSearchFilterType): void;
}

export default function SearchFilterArea({ currentSearchFilter, onSearchFilterSet }: Props) {
    const queryClient = useQueryClient();

    const { examSearchFilter } = useExamSearchFilterStore();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
                onSearchFilterSet(examSearchFilter);
                setSearchParams({ page: '1' });
            }
        }, 190),
        [examSearchFilter, currentSearchFilter, currentPage],
    );

    return (
        <div className={'px-4'}>
            <button
                onClick={(): void => {
                    setIsModalOpen(true);
                }}
                className={'mr-5 box-content rounded-full p-1 duration-300 hover:scale-105 hover:bg-gray-100'}
            >
                <BiFilter className={'h-10 w-10'} />
            </button>
            <button
                onClick={(): void => {
                    handleSearchButtonClick();
                }}
                className={'box-content rounded-full p-1 duration-300 hover:scale-105 hover:bg-gray-100'}
            >
                <BiSearch className={'h-9 w-9'} />
            </button>
            <SearchFilterModal
                isModalOpen={isModalOpen}
                onModalCloseButtonClick={(): void => {
                    setIsModalOpen(false);
                }}
                modalClose={(): void => {
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}
