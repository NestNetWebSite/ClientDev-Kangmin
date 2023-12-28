import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ExamSearchFilterType {
    year: number;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

interface ExamSearchFilterState {
    examSearchFilter: ExamSearchFilterType;

    filterUpdate(newExamSearchFilter: ExamSearchFilterType): void;

    filterReset(): void;
}

const useExamSearchFilterStore = create<ExamSearchFilterState>()(
    persist(
        (setState) => ({
            examSearchFilter: { year: 0, semester: '0', examType: '', subject: '', professor: '' },
            filterUpdate(newSearchFilter) {
                setState({ examSearchFilter: newSearchFilter });
            },
            filterReset() {
                setState({ examSearchFilter: { year: 0, semester: '0', examType: '', subject: '', professor: '' } });
            },
        }),
        {
            name: 'examSearchFilter-storage',
            storage: createJSONStorage(() => window.sessionStorage),
        },
    ),
);

export default useExamSearchFilterStore;
