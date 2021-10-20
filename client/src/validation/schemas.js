import Joi from 'joi-browser'

export const vocabularyForm = {
    title: Joi.string().required().label('List name')
}