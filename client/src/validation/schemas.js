import Joi from 'joi-browser'

export const vocabularyForm = {
    title: Joi.string().required().label('List name')
}

export const wordForm = {
    foreign: Joi.string().required().label('Foreign word'),
    native: Joi.string().required().label('Native word'),
    phrases: Joi.array()
}