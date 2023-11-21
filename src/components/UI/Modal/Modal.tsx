import React, {Dispatch, FC, SetStateAction, MouseEvent, memo} from 'react';
import cn from "classnames";

import CrossIcon from "../../../icons/CrossIcon";

import styles from './Modal.module.scss';

interface IModalProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode | string;
}

const Modal:FC<IModalProps> = ({
    active,
    setActive,
    children
}) => {
    const closeModalHandler = () => setActive(false);
    const stopPropagationHandler = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

    return (
        <div
            className={cn(styles['modal'], {[styles['active']]: active})}
            onClick={closeModalHandler}
        >
            <div
                className={cn(styles['modal__content'], {[styles['active']]: active})}
                onClick={stopPropagationHandler}
            >
                <CrossIcon className={styles['cross']} onClick={() => setActive(false)}/>

            {children}
        </div>
    </div>
    )
};

export default memo(Modal);
