import * as yup from 'yup'
import arcade from '../assets/arcade.svg'
import advanced from '../assets/advanced.svg'
import pro from '../assets/pro.svg'

export const stepperData = [
    { index: 1, title: 'YOUR INFO' },
    { index: 2, title: 'SELECT PLAN' },
    { index: 3, title: 'ADD-ONS' },
    { index: 4, title: 'SUMMARY' },
]

export const headingMapping = {
    1: 'Personal Info',
    2: 'Select your plan',
    3: 'Pick add-ons',
    4: 'Finishing up',
}

export const subHeadingMapping = {
    1: 'Please provide your name, email address, and phone number.',
    2: 'You have the option of monthly or yearly billing.',
    3: 'Add-ons help enhance your gaming experience.',
    4: 'Double-check everything looks OK before confirming.',
}

export const schema = yup.object().shape({
    fullName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup
        .string()
        .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number/int. code')
        .required('Phone is required'),
})

export const planData = [
    { icon: arcade, title: 'Arcade', monthlyPrice: 9, yearlyPrice: 90 },
    {
        icon: advanced,
        title: 'Advanced',
        monthlyPrice: 12,
        yearlyPrice: 120,
    },
    { icon: pro, title: 'Pro', monthlyPrice: 15, yearlyPrice: 150 },
]
