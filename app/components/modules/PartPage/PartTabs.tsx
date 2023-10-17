import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from 'effector-react'
import { $goodsPart } from '@/app/context/goodsPart'
import { $mode } from '@/app/context/mode'
import styles from '@/app/styles/part/index.module.scss'

const PartTabs = () => {
  const mode = useStore($mode)
  const goodsPart = useStore($goodsPart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [showDescription, setShowDescriprion] = useState(true)
  const [showCompatibility, setShowCompatibility] = useState(false)

  const handleShowDescription = () => {
    setShowDescriprion(true)
    setShowCompatibility(false)
  }

  const handleShowCompatibility = () => {
    setShowDescriprion(false)
    setShowCompatibility(true)
  }

  return (
    <div className={styles.part__tabs}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Описание
        </button>
        <button
          className={showCompatibility ? styles.active : ''}
          onClick={handleShowCompatibility}
        >
          Совместимость
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <h3
            className={`${styles.part__tabs__content__title} ${darkModeClass}`}
          >
            {goodsPart.name}
          </h3>
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {goodsPart.description}
          </p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {goodsPart.compatibility}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default PartTabs
