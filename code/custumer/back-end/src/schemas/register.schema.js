import { object, string, email, maxLength, minLength } from 'valibot'

const registerSchema = object({
  name: string('Name must be a string', [
    minLength(2, 'Name must be at least 2 characters'),
    maxLength(64, 'Name must be less than 64 characters')
  ]),

  email: string('Email must be a string', [
    email('Email must be a valid email address'),
    maxLength(64, 'Email must be less than 100 characters')
  ]),

  password: string('Password must be a string', [
    minLength(8, 'Password must be at least 8 characters'),
    maxLength(124, 'Password must be less than 124 characters')
  ]),

  confirmPassword: string('Confirm Password must be a string', [
    minLength(8, 'Confirm Password must be at least 8 characters'),
    maxLength(124, 'Confirm Password must be less than 124 characters')
  ])
})

export { registerSchema }
