import { useState, useCallback, } from "react";
import { motion, } from "framer-motion";

export default function WithdrawCheck({ onModalClose, }: { onModalClose(): void; })
{
    const [isWithdrawCheckboxChecked, setIsWithdrawCheckboxChecked] = useState<boolean>(false);
    const handleButtonClick = useCallback(() =>
    {
        window.alert("회원 탈퇴");
        onModalClose();
    }, [onModalClose]);

    return (
        <div>
            <div>
                <input
                    defaultChecked={isWithdrawCheckboxChecked}
                    type={"checkbox"}
                    onChange={(): void => { setIsWithdrawCheckboxChecked(!isWithdrawCheckboxChecked); }}
                />
                <span>
                    위 내용을 전부 확인하였습니다.
                </span>
            </div>
            <div>
                <motion.button
                    disabled={!isWithdrawCheckboxChecked}
                    type={"button"}
                    whileHover={{ scale: !isWithdrawCheckboxChecked ? 1 : 1.15, }}
                    onClick={handleButtonClick}
                >
                    탈퇴하기
                </motion.button>
            </div>
        </div>
    );
};