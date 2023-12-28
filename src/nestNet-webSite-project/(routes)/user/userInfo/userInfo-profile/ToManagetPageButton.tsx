import { Link, } from "react-router-dom";
import { motion, } from "framer-motion";

export default function ToManagerPageButton()
{
    return (
        <motion.button
            type={"button"}
            whileHover={{ scale: 1.1, }}
            whileTap={{ scale: 0.9, }}
            transition={{ type: "linear", ease: "easeInOut", }}
        >
            <Link
                to={"/user/manager"}
            >
                <span>
                    회원관리
                </span>
            </Link>
        </motion.button>
    );
};