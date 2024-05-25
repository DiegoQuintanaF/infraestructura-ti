import { parse, safeParse } from 'valibot'
export { userSchema } from './user.schema.js'
export { registerSchema } from './register.schema.js'

const isValidSchema = (schema, data) => {
  return parse(schema, data)
}

const isSafeValidSchema = (schema, data) => {
  const result = safeParse(schema, data)
  if (result.success) {
    const email = result.output
    console.log(email)
  } else {
    console.log('->', result.issues)
  }
}

export { isValidSchema, isSafeValidSchema }
