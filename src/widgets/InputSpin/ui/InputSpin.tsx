import { SpinNumberConsumer } from "@/shared/context/SpinNumberContext"

export const InputSpin = () => {
    return (
        <label style={{ lineHeight: '40px', color: 'black' }}>
            <span style={{ paddingRight: '8px' }}>Number spin seconds</span>
            <SpinNumberConsumer>
                {value =>
                    <input
                        value={value.spinNumber}
                        onChange={e => value.setSpinNumber(Number(e.target.value))}
                    />
                }

            </SpinNumberConsumer>
        </label>
    )
}