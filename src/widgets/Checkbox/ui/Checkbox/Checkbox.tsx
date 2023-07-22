import cls from './Checkbox.module.scss'

interface CheckboxMovieType {
    label: string,
    value: boolean,
    onChange: () => void,
}

export const Checkbox = ({ label, value, onChange }: CheckboxMovieType) => {
    return <>
        <label className={[cls.checkbox, cls.blue].join(' ')}>
            <input type="checkbox" checked={value} onChange={onChange} />
            <span className={cls.indicator}></span>
            {label}
        </label>
    </>
}