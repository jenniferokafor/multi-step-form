import './styles.scss'

const Input = ({
    label,
    type,
    name,
    placeholder,
    value,
    handleChange,
    error,
}) => {
    return (
        <label className="info-form-label">
            <span className="info-form-label-text">
                {label}
                {error && (
                    <span className="info-form-label-error">{error}</span>
                )}
            </span>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                style={{ border: error ? '1px solid #EE374A' : '' }}
            />
        </label>
    )
}

const Info = ({ inputs, setInputs, errors }) => {
    const handleChange = e => {
        const { name, value } = e.target
        setInputs(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    return (
        <div className="info-section-wrapper">
            <Input
                type="text"
                name="fullName"
                label="Name"
                placeholder="e.g. Stephen King"
                value={inputs.fullName}
                handleChange={handleChange}
                error={errors.fullName}
            />

            <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="e.g. stephenking@lorem.com"
                value={inputs.email}
                handleChange={handleChange}
                error={errors.email}
            />

            <Input
                type="tel"
                name="phone"
                label="Phone Number"
                placeholder="e.g. +1 234 567 890"
                value={inputs.phone}
                handleChange={handleChange}
                error={errors.phone}
            />
        </div>
    )
}
export default Info
