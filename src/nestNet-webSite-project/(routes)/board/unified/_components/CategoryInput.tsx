import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

interface Inputs {
    title: string;
    bodyContent: string;
    unifiedPostType: string;
}

const unifiedPostTypeOptions = [
    { value: 'FREE', label: '자유' },
    { value: 'DEV', label: '개발' },
    { value: 'CAREER', label: '진로' },
];

export default function CategoryInput() {
    const {
        control,
        formState: { errors },
        getValues,
    } = useFormContext<Inputs>();

    console.log(getValues());

    return (
        <div className={'flex w-full flex-col'}>
            <div className={'mb-2 flex items-center gap-x-1'}>
                <label className={'mx-2.5 font-bold text-slate-950'} htmlFor={'categoryInput'}>
                    카테고리
                </label>
                {errors?.unifiedPostType?.message && errors?.unifiedPostType?.type === 'required' && (
                    <span className={'text-sm text-red-500'}>※ {errors.unifiedPostType.message}</span>
                )}
            </div>
            <Controller
                control={control}
                name={'unifiedPostType'}
                rules={{ required: { value: true, message: '카테고리를 선택해주세요.' } }}
                render={({ field }) => {
                    return (
                        <Select
                            isSearchable={false}
                            placeholder={'필수 선택'}
                            defaultValue={field.value ? unifiedPostTypeOptions.find(option => option.value) : null}
                            options={unifiedPostTypeOptions}
                            onChange={option => {
                                field.onChange(option.value);
                            }}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            menuPlacement={'auto'}
                            classNames={{
                                control(state) {
                                    return `!px-2 !rounded-xl !h-[52px] !border !bg-white !text-sm !shadow-none !transition-all
                                    ${
                                        state.isFocused
                                            ? errors?.unifiedPostType?.message
                                                ? '!border-red-500'
                                                : '!border-blue-500'
                                            : errors?.unifiedPostType?.message
                                              ? '!border-red-500'
                                              : '!border-gray-300'
                                    }
                                    
                                   `;
                                },

                                option() {
                                    return '!text-sm';
                                },

                                placeholder() {
                                    return '!text-[#a9a9a9]';
                                },
                            }}
                        />
                    );
                }}
            />
        </div>
    );
}
