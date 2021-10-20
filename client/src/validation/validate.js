import Joi from 'joi-browser'

export default (data, schema) => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(data, schema, options);

    if(!error) return null;

    console.log(error)

    // Map the array and create error object
    const errors = {}

    error.details.map(item => (
        errors[item.path[0]] = item.message
    ))

    console.log(errors)
    return errors;
}