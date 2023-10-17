import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/app/types/auth'
import { signUpFx } from '@/app/api/auth'
import { showAuthError } from '@/app/utils/errors'
import { useStore } from 'effector-react'
import { $mode } from '@/app/context/mode'
import EmailInput from '../../elements/AuthPage/EmailInput'
import PasswordInput from '../../elements/AuthPage/PasswordInput'
import spinnerStyles from '@/app/styles/spinner/index.module.scss'
import styles from '@/app/styles/authPage/index.module.scss'
import NameInput from '../../elements/AuthPage/NameInput'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const userData = await signUpFx({
        url: '/users/signup',
        username: data.name,
        password: data.password,
        email: data.email,
      })

      if (!userData) {
        return
      }

      resetField('name')
      resetField('email')
      resetField('password')
      switchForm()
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form
      className={`${styles.form} ${darkModeClass}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'SIGN UP'}
      </button>
    </form>
  )
}

export default SignUpForm
