import Modal from "react-modal";
import { IoCloseOutline, } from "react-icons/io5";
import WithdrawInstruction from "./WithdrawInstruction";
import WithdrawCheck from "./WithdrawCheck";

interface Props
{
    isModalOpen: boolean;
    onModalClose(): void;
}

export default function WithdrawModal({ isModalOpen, onModalClose, }: Props)
{
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onModalClose}
            style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 50%)", zIndex: 10, }}}
            closeTimeoutMS={280}
        >
            <button
                type={"button"}
                onClick={onModalClose}
            >
                <IoCloseOutline/>
            </button>
            <div>
                <WithdrawInstruction/>
                <WithdrawCheck
                    onModalClose={onModalClose}
                />
            </div>
        </Modal>
    );
}