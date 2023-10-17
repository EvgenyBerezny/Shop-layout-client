import { IAuthPageInput } from '@/app/types/auth'
import styles from '@/app/styles/authPage/index.module.scss'

const NameInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('name', {
        required: 'Введите имя!',
        minLength: 2,
        maxLength: 16,
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ]*$/,
          message: 'Недопустимое значение!',
        },
      })}
      className={styles.form__input}
      type="text"
      placeholder="Name"
    />
    {errors.name && (
      <span className={styles.error_alert}>{errors.name?.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 2 символа</span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 16 символов</span>
    )}
  </label>
)

export default NameInput
