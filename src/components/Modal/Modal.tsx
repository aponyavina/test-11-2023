import React, {Dispatch, FC, SetStateAction, memo} from 'react';
import cn from "classnames";

import CrossIcon from "../../icons/CrossIcon";

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
    return (
        <div
            className={cn(styles['modal'], {[styles['active']]: active})}
            onClick={() => setActive(false)}
        >
            <div
                className={cn(styles['modal__content'], {[styles['active']]: active})}
                onClick={e => e.stopPropagation()}
            >
                <CrossIcon className={styles['cross']} onClick={() => setActive(false)}/>

                {children}
            </div>
        </div>
    );
};

export default memo(Modal);
