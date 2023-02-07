import { useState } from 'react'
import './form.scss'
import Stepper from './components/Stepper'
import { headingMapping, schema, subHeadingMapping } from './data'
import Info from './components/FormSections/Info'
import Plan from './components/FormSections/Plan'
import { message } from 'antd'
import AddOns from './components/FormSections/AddOns'

const Form = () => {
    const [step, setStep] = useState(1)
    const [inputs, setInputs] = useState({
        fullName: '',
        email: '',
        phone: '',
        plan: '',
        billingCycle: 'Monthly',
        addOns: [],
    })
    const [errors, setErrors] = useState({})
    const [messageApi, contextHolder] = message.useMessage()
    const error = ({ content }) => {
        messageApi.open({
            type: 'error',
            content: content,
        })
    }

    const formFieldsMapping = {
        1: <Info inputs={inputs} setInputs={setInputs} errors={errors} />,
        2: <Plan inputs={inputs} setInputs={setInputs} />,
        3: <AddOns inputs={inputs} setInputs={setInputs} />,
    }

    const handlePrevClick = () => {
        if (step !== 1) {
            setStep(step - 1)
        }
    }

    const validatePersonalInfo = () => {
        schema
            .validate(inputs, { abortEarly: false })
            .then(() => {
                setErrors({})
                setStep(2)
            })
            .catch(err => {
                let errors = {}
                err.inner.forEach(error => {
                    errors[error.path] = error.message
                })
                setErrors(errors)
            })
    }

    const validatePlanSelection = () => {
        if (inputs.plan === '') {
            error({ content: 'Please select a plan to continue' })
        } else {
            setStep(3)
        }
    }

    const handleNextClick = () => {
        if (step === 1) {
            validatePersonalInfo()
        }

        if (step === 2) {
            validatePlanSelection()
        }
    }
    return (
        <>
            {contextHolder}
            <div className="form-wrapper">
                <div className="form">
                    {/*stepper section*/}
                    <section>
                        <Stepper step={step} />
                    </section>
                    {/*form fields section*/}
                    <section className="input-and-select-section">
                        <h1 className="form-field-heading">
                            {headingMapping[step]}
                        </h1>
                        <p className="form-field-subheading">
                            {subHeadingMapping[step]}
                        </p>
                        <div className="form-fields">
                            {formFieldsMapping[step]}
                        </div>
                        <div className="form-buttons">
                            {step !== 1 && (
                                <button onClick={() => handlePrevClick()}>
                                    Go Back
                                </button>
                            )}
                            <button
                                onClick={() => handleNextClick()}
                                className="next-button"
                            >
                                Next Step
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Form
