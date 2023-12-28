import axios from "axios";
import { useCallback, useState, } from "react";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { FaHeart, FaRegHeart, } from "react-icons/fa";
import { debounce } from "lodash";

interface Props
{
    boardId: string;
    isMemberLiked: boolean;
}

export default function BoardLikeButton({ boardId, isMemberLiked, }: Props)
{
    const queryClient = useQueryClient();

    // state 상태인 쿼리의 데이터를 queryClient.set 하면 컴포넌트 리렌더링됨
    // 반면에 inactive 상태인 쿼리의 데이터를 queryClient.set 해도 컴포넌트 리렌더링 안됨
    // (둘다 테스트해봄)
    const [oldData, setOldData] = useState<boolean|undefined>(undefined);
    const { data, } = useQuery(
        {
            queryKey: ["test"],
            queryFn()
            {
                return (
                    axios.get("http://localhost:3001/users/aaaa1234")
                        .then(response =>
                        {
                            setOldData(response.data.isMemberLiked);
                            return response.data.isMemberLiked;
                        })
                );
            },
            retry: 0,
            refetchOnWindowFocus: false,
            gcTime: 0,
        }
    );

    const { mutate, } = useMutation(
        {
            mutationFn()
            {
                const likeState = queryClient.getQueryData(["test"]);
                return axios.patch("http://localhost:3001/users/aaaa1234", { isMemberLiked: likeState, }, { withCredentials: true, });
            },

            onSuccess()
            {
                return queryClient.invalidateQueries({ queryKey: ["test"], });
            },

            onError()
            {
                queryClient.setQueryData(["test"], oldData);
                return queryClient.invalidateQueries({ queryKey: ["test"], });
            }
        }
    );

    const debouncedMutate = debounce(mutate, 1000);

    const handleButtonClick = useCallback(async (): Promise<void> =>
    {
        await queryClient.cancelQueries({ queryKey: ["test"], });
        const previousLikeState = queryClient.getQueryData(["test"]);
        queryClient.setQueryData(["test"], !previousLikeState);
        debouncedMutate();
    }, []);

    if(data === undefined)
    {
        return <></>;
    }

    return (
        <button
            type={"button"}
            onClick={(): void => { handleButtonClick().catch(reason => console.error(reason)); }}
        >
            {
                data ?
                    <FaHeart/>
                    :
                    <FaRegHeart/>
            }
        </button>
    );
};