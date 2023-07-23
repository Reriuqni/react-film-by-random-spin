import cls from './Checkbox.module.scss'

interface CheckboxMovieType {
    label: string,
    value: boolean,
    onChange: () => void,
    disabled: boolean,
}

export const Checkbox = ({ label, value, onChange, disabled }: CheckboxMovieType) => {
    return <>
        <label className={[cls.checkbox, cls.blue].join(' ')}>
            <input type="checkbox" checked={value} onChange={onChange} disabled={disabled} />
            <span className={cls.indicator}></span>
            {label}
        </label>
    </>
}