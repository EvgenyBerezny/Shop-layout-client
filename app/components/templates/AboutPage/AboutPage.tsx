/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $mode } from '@/app/context/mode'
import styles from '@/app/styles/about/index.module.scss'

const AboutPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>
          О компании
        </h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
              sed velit dignissim sodales ut eu sem integer. Et egestas quis
              ipsum suspendisse ultrices gravida. Potenti nullam ac tortor vitae
              purus faucibus ornare suspendisse. Lacus viverra vitae congue eu
              consequat ac felis donec. Ut faucibus pulvinar elementum integer
              enim neque volutpat ac tincidunt. Proin libero nunc consequat
              interdum varius sit amet mattis. Sit amet risus nullam eget felis
              eget nunc lobortis mattis. Sodales ut etiam sit amet nisl purus
              in. Massa placerat duis ultricies lacus sed turpis tincidunt.
            </p>
            <p>
              Vitae purus faucibus ornare suspendisse. Pellentesque habitant
              morbi tristique senectus. Lacinia at quis risus sed vulputate.
              Facilisis sed odio morbi quis commodo odio aenean. Neque ornare
              aenean euismod elementum nisi. Suscipit tellus mauris a diam
              maecenas sed enim ut. Augue ut lectus arcu bibendum. Ultrices
              tincidunt arcu non sodales neque sodales ut etiam. Sed vulputate
              odio ut enim blandit volutpat maecenas volutpat blandit. Mattis
              nunc sed blandit libero volutpat sed. Amet dictum sit amet justo
              donec enim diam vulputate. Sollicitudin aliquam ultrices sagittis
              orci a scelerisque. Bibendum enim facilisis gravida neque
              convallis a. Bibendum neque egestas congue quisque egestas diam in
              arcu cursus. Quam quisque id diam vel quam elementum pulvinar
              etiam. Arcu bibendum at varius vel. In hendrerit gravida rutrum
              quisque non tellus orci ac.
            </p>
          </div>
          <div className={`${styles.about__img} ${styles.about__img__top}`}>
            <img src="/img/about-img.png" alt="image-1" />
          </div>
          <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
            <img src="/img/about-img-2.png" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
