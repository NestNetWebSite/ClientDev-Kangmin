import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import useExamSearchFilterStore from '../../../_stores/useExamSearchFilterStore';
import SearchFilterModal from './SearchFilterModal';

interface ExamSearchFilter {
    year: string;
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

    const { filterReset } = useExamSearchFilterStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [_1, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [isModalOpen]);

    // const handleSearchButtonClick = useCallback(
    //     debounce(() => {
    //         if (isEqual(examSearchFilter, currentSearchFilter) && currentPage === 1) {
    //             queryClient.invalidateQueries({ queryKey: ['examList'] }).catch(_errors => window.alert(_errors));
    //         } else if (isEqual(examSearchFilter, currentSearchFilter) && currentPage !== 1) {
    //             setSearchParams({ page: '1' });
    //         } else {
    //             updateCurrentSearchFilter(examSearchFilter);
    //             setSearchParams({ page: '1' });
    //         }
    //     }, 190),
    //     [examSearchFilter, currentSearchFilter, currentPage],
    // );

    return (
        <div>
            <button
                onClick={event => {
                    event.stopPropagation();
                    setIsModalOpen(true);
                }}
                className={
                    'mr-5 box-content rounded-xl border border-rose-800 bg-rose-800 px-4 py-3 text-sm text-white transition-all  hover:bg-rose-900'
                }
            >
                검색 필터
            </button>
            <button
                type={'button'}
                onClick={event => {
                    event.stopPropagation();
                    if (
                        isEqual(
                            {
                                examType: '',
                                year: '0',
                                semester: '0',
                                subject: '',
                                professor: '',
                            },
                            currentSearchFilter,
                        )
                    ) {
                        return;
                    }
                    setSearchParams({ page: '1' });
                    filterReset();
                    updateCurrentSearchFilter({
                        examType: '',
                        year: '0',
                        semester: '0',
                        subject: '',
                        professor: '',
                    });
                }}
                className={
                    'cursor-pointer rounded-xl border border-rose-800 px-4 py-3 text-sm font-bold text-rose-800 transition-all hover:bg-rose-50'
                }
            >
                검색 필터 초기화
            </button>
            <SearchFilterModal
                isModalOpen={isModalOpen}
                onModalCloseButtonClick={() => {
                    setIsModalOpen(false);
                }}
                closeModal={() => {
                    setIsModalOpen(false);
                }}
                updateCurrentSearchFilter={updateCurrentSearchFilter}
            />
        </div>
    );
}
