import { useState } from 'react'
import './form.scss'
import Stepper from './components/Stepper'
import { headingMapping, schema, subHeadingMapping } from './data'
import Info from './components/FormSections/Info'
import Plan from './components/FormSections/Plan'
import { message } from 'antd'
import AddOns from './components/FormSections/AddOns'
import Finishing from './components/FormSections/Finishing'
import Success from './components/FormSections/Success'

const Form = () => {
    const [step, setStep] = useState(1)
    const [confirmed, setConfirmed] = useState(false)
    const [inputs, setInputs] = useState({
        fullName: '',
        email: '',
        phone: '',
        plan: '',
        billingCycle: 'Monthly',
        addOns: [
            {
                title: 'Online service',
                description: 'Access to multiplayer games',
                monthlyPrice: 1,
                yearlyPrice: 10,
                checked: false,
            },
            {
                title: 'Larger storage',
                description: 'Extra 1TB of cloud save',
                monthlyPrice: 2,
                yearlyPrice: 20,
                checked: false,
            },
            {
                title: 'Customizable profile',
                description: 'Custom theme on your profile',
                monthlyPrice: 2,
                yearlyPrice: 20,
                checked: false,
            },
        ],
    })
    const [errors, setErrors] = useState({})
    const [messageApi, contextHolder] = message.useMessage()
    const error = ({ content }) => {
        messageApi.open({
            type: 'error',
            content: content,
        })
    }

    const StepFourComponent = confirmed ? (
        <Success />
    ) : (
        <Finishing inputs={inputs} changePlan={() => setStep(2)} />
    )

    const formFieldsMapping = {
        1: <Info inputs={inputs} setInputs={setInputs} errors={errors} />,
        2: <Plan inputs={inputs} setInputs={setInputs} />,
        3: <AddOns inputs={inputs} setInputs={setInputs} />,
        4: StepFourComponent,
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

        if (step === 3) {
            setStep(4)
        }

        if (step === 4) {
            setConfirmed(true)
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
                        {!confirmed && (
                            <>
                                <h1 className="form-field-heading">
                                    {headingMapping[step]}
                                </h1>
                                <p className="form-field-subheading">
                                    {subHeadingMapping[step]}
                                </p>
                            </>
                        )}
                        <div className="form-fields">
                            {formFieldsMapping[step]}
                        </div>
                        <div className="form-buttons">
                            {step !== 1 && !confirmed && (
                                <button
                                    onClick={() => handlePrevClick()}
                                    className="prev-button"
                                >
                                    Go Back
                                </button>
                            )}
                            {!confirmed && (
                                <button
                                    onClick={() => handleNextClick()}
                                    className="next-button"
                                    style={
                                        step === 4
                                            ? { backgroundColor: '#483EFF' }
                                            : {}
                                    }
                                >
                                    {step === 4 ? 'Confirm' : 'Next Step'}
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Form
