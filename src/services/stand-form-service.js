import axios from 'axios'
import {formDataFrom}  from '../helpers/form-data-helper'

export function sendForm(values, url) {
  values._subject = `${values.first_name} ${values.last_name}`
  values.work_as = values.work_as.map((item) => item.label).join(', ')
  values.experience = values.experience.label

  return axios({
    method: 'post',
    url: url,
    data: formDataFrom(values),
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then(response => {
    if (response.status !== 200) {
      console.error(response.data)
      throw new Error('Ups! algo salio mal, vuelve a interntalo por favor.')
    }
  })
  .catch( error => {
    console.error(error)
    throw new Error('Ups! algo salio mal, vuelve a interntalo por favor.')
  })
}