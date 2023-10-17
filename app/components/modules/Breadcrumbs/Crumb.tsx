/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { $mode } from '@/app/context/mode'
import CrumbArrowSvg from '../../elements/CrumbArrowSvg/CrumbArrowSvg'
import { ICrumbProps } from '@/app/types/common'
import styles from '@/app/styles/breadcrumbs/index.module.scss'

const Crumb = ({
  text: defaultText,
  textGenerator,
  href,
  last = false,
}: ICrumbProps) => {
  const [text, setText] = useState(defaultText)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    handleTextGenerate()
  }, [textGenerator])

  const handleTextGenerate = async () => {
    if (!Boolean(textGenerator)) {
      return
    }

    const finalText = await textGenerator()
    setText(finalText)
  }

  if (last) {
    return (
      <a>
        <span
          className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
          style={{ marginRight: 13 }}
        >
          <CrumbArrowSvg />
        </span>
        <span className={`last-crumb ${styles.breadcrumbs__item__text}`}>
          {text}
        </span>
      </a>
    )
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <a>
        <span
          className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
          style={{ marginRight: 13 }}
        >
          <CrumbArrowSvg />
        </span>
        <span className={styles.breadcrumbs__item__text}>{text}</span>
      </a>
    </Link>
  )
}

export default Crumb
