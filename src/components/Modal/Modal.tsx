import React, {Dispatch, FC, SetStateAction, memo} from 'react';

import './Modal.scss';

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
            className={`modal ${active ? 'active' : ''}`}
            onClick={() => setActive(false)}
        >
            <div
                className={`modal__content ${active ? 'active' : ''}`}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default memo(Modal);
