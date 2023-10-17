import { toast } from 'react-toastify'
import { $mode } from '@/app/context/mode'
import { useStore } from 'effector-react'
import emailjs from '@emailjs/browser'
import NameInput from './NameInput'
import { useForm } from 'react-hook-form'
import { FeedbackInputs } from '@/app/types/feedbackForm'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import MessageInput from './MessageInput'
import { MutableRefObject, useRef, useState } from 'react'
import spinnerStyles from '@/app/styles/spinner/index.module.scss'
import styles from '@/app/styles/feedbackForm/index.module.scss'

const FeedbackForm = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const submitForm = () => {
    setSpinner(true)
    emailjs
      .sendForm(
        'service_c67d2e7',
        'template_fgwn4ab',
        formRef.current,
        'sggHlklYPzFCdsAmG'
      )
      .then((result) => {
        setSpinner(false)
        toast.success(`Сообщение отправлено! ${result.text}`)
      })
      .catch((error) => {
        setSpinner(false)
        toast.error(`Что-то пошло не так! ${error.text}`)
      })

    formRef.current.reset()
  }

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
        Форма обратной связи
      </h3>
      <form
        ref={formRef}
        className={styles.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <div className={styles.feedback_form__form__btn}>
          <button>
            {spinner ? (
              <span
                className={spinnerStyles.spinner}
                style={{ top: '6px', left: '47%' }}
              />
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
