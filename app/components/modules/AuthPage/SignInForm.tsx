import { useForm } from 'react-hook-form'
import { IInputs } from '@/app/types/auth'
import { signInFx } from '@/app/api/auth'
import { showAuthError } from '@/app/utils/errors'
import { useState } from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/app/context/mode'
import { useRouter } from 'next/router'
import NameInput from '../../elements/AuthPage/NameInput'
import PasswordInput from '../../elements/AuthPage/PasswordInput'
import styles from '@/app/styles/authPage/index.module.scss'
import spinnerStyles from '@/app/styles/spinner/index.module.scss'
const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      await signInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })
      resetField('name')
      resetField('password')
      route.push('/dashboard')
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
        Войти на сайт
      </h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'SIGN IN'}
      </button>
    </form>
  )
}

export default SignInForm
