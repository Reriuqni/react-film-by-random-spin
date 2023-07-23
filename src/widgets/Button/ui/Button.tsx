import cls from './Button.module.scss'


export enum ButtonStyle {
    DARK = 'dark',
    // LIGHT = 'light',
}

export enum ButtonSize {
    MICRO = 'micro',
    // NORMAL = 'normal',
}

export interface ButtonType {
    onClick?: () => void,
    disabled?: boolean,
    label: string,
    size?: ButtonSize,
    buttonStyle?: ButtonStyle,
    isLablePrefix?: boolean
}

export const Button = ({
    onClick,
    disabled = false,
    label,
    size,
    buttonStyle,
    isLablePrefix = false,
}: ButtonType) => {
    return <>
        <button
            className={[
                cls.button,
                getClassStyle(buttonStyle),
                getSizeStyle(size)
            ].join(' ').trim()}
            onClick={onClick}
            disabled={disabled}
        >
            {isLablePrefix && <span className={cls.labelPrefix}></span>}
            {/* <span className={[isLablePrefix && cls.labelPrefix].join('')}>{label}</span> */}
            {label}
        </button>
    </>
}


// Logics
function getClassStyle(style: ButtonStyle | undefined): string {
    if (!style) return ''
    let r = ''
    switch (style) {
        case ButtonStyle.DARK: r = cls.dark; break;
        default: '';
    }
    return r
}

function getSizeStyle(size: ButtonSize | undefined): string {
    if (!size) return ''
    let r = ''
    switch (size) {
        case ButtonSize.MICRO: r = cls.micro; break;
        default: '';
    }
    return r
}    