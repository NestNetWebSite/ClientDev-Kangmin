import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import useExamSearchFilterStore from '../../../../_stores/useExamSearchFilterStore';
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
    //             queryClient.invalidateQueries({ queryKey: ['examList'] }).catch(error => window.alert(error));
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
        <div
            className={
                'sticky top-0 z-[1] flex w-full items-center gap-x-1 border-b border-gray-200 bg-white/30 px-6 py-4 backdrop-blur-md '
            }
        >
            <div className={'relative'}>
                <button
                    onClick={event => {
                        event.stopPropagation();
                        setIsModalOpen(true);
                    }}
                    className={
                        'mr-5 box-content rounded-3xl bg-slate-950 px-4 py-3 text-sm text-white transition-all hover:bg-slate-950/[.85]'
                    }
                >
                    검색 필터
                </button>
            </div>
            <span
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
                className={'cursor-pointer rounded-3xl p-2 font-bold transition-all hover:bg-black/[.05]'}
            >
                검색 필터 초기화
            </span>
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
