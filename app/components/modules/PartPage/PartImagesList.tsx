/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'
import { $goodsPart } from '@/app/context/goodsPart'
import { useMediaQuery } from '@/app/hooks/useMediaQuery'
import PartImagesItem from './PartImagesItem'
import PartSlider from './PartSlider'
import styles from '@/app/styles/part/index.module.scss'

const PartImagesList = () => {
  const goodsPart = useStore($goodsPart)
  const isMobile = useMediaQuery(850)
  const images = goodsPart.images
    ? (JSON.parse(goodsPart.images) as string[])
    : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={goodsPart.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList
