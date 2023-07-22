import cls from './Button.module.scss'

export interface ButtonType {
    onClick: () => void,
    disabled: boolean,
    label: string,
}

export const Button = ({
    onClick,
    disabled,
    label,
}: ButtonType) => {
    return <>
        <button
            className={cls.button}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    </>
}