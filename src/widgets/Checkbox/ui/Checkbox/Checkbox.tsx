// import cls from './Checkbox.module.scss'

interface CheckboxMovieType {
    label: string,
    value: boolean,
    onChange: () => void
}

export const Checkbox = ({ label, value, onChange }: CheckboxMovieType) => {
    return <>
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    </>
}
