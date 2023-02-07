import './stepper.scss'
import bg from '../../assets/stepper-bg-desktop.png'
import { stepperData } from '../data'
const Stepper = ({ step }) => {
    return (
        <div className="stepper" style={{ backgroundImage: `url(${bg})` }}>
            <div className="stepper-items-wrapper">
                {stepperData.map((item, i) => (
                    <div key={i} className="stepper-item">
                        <div
                            className="stepper-item-number"
                            style={{
                                backgroundColor:
                                    step === item?.index ? '#BEE2FD' : '',
                                border:
                                    step === item?.index
                                        ? '1px solid #BEE2FD'
                                        : '',
                            }}
                        >
                            <span
                                style={{
                                    color:
                                        step === item?.index
                                            ? '#022959'
                                            : '#FFFFFF',
                                }}
                            >
                                {item?.index}
                            </span>
                        </div>
                        <div className="stepper-item-text">
                            <p>STEP {item?.index}</p>
                            <span>{item?.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Stepper
