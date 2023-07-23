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
}

export const Button = ({
    onClick = () => { },
    disabled = false,
    label,
    size,
    buttonStyle,
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
            {label}
        </button>
    </>
}


// Logic
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