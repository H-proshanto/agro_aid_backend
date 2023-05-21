const { string, object, ref } = require('yup')

const createUserSchema = object().shape({
    firstName: string()
        .min(2, 'First name must be at least 2 characters long')
        .max(20, 'First name must be at most 20 characters long')
        .required('First name must not be empty'),
    lastName: string()
        .min(2, 'Last name must be at least 2 characters long')
        .max(20, 'Last name must be at most 20 characters long')
        .required('Last name must not be empty'),
    email: string()
        .email('This field should be a valid email address')
        .required('Email must not be empty'),
    dob: string()
        .required('Date of birth must not be empty'),
    gender: string(),
    profileImage: string(),
    address: string()
        .min(2, 'Address should be at lease 2 characters long')
        .required('Address must not be empty'),
    password: string()
        .min(8, 'Password must be at least 8 characters long')
        .max(50, 'Password must be at most 50 characters long')
        .required('Password is required'),
    confirmPassword: string()
        .required('Confirm password is required')
        .oneOf([ref('password'), null], 'Password and confirm password must match')
});

const updateUserSchema = object().shape({
    firstName: string()
        .min(2, 'First name must be at least 2 characters long')
        .max(20, 'First name must be at most 20 characters long')
        .required('First name must not be empty'),
    lastName: string()
        .min(2, 'Last name must be at least 2 characters long')
        .max(20, 'Last name must be at most 20 characters long')
        .required('Last name must not be empty'),
});

module.exports = { createUserSchema, updateUserSchema }
