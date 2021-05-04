import emailjs from 'emailjs-com'

/**
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 * @description {a mailsender using emailjs. Used to do mailconfirmation for the bookings}
 * @param {is a template for how the text is structures, @see {https://www.emailjs.com/docs/}} template
 */

const Emailer = (template, type) => {
  const data = {
    type: type,
    start_time: template.start_time,
    end_time: template.end_time,
    apartmentNo: template.apartmentNo
  }
  console.log('EMAIL METHOD CALLED')
  const userID = 'user_yt3PHm0dipxjfiKd0eHF2'
  const serviceID = 'service_w58wos9'
  const templateId = 'template_8yxr5ck'
  emailjs.send(serviceID, templateId, data, userID)
    .then((respons) => {
      console.log('Email sent', respons.status, respons.text)
    }, (err) => {
      console.log('Failed to send email', err)
    })
}
export default Emailer
