import Head from 'next/head'
import { useCallback } from 'react'
import Layout from '@/app/components/layouts/Layout'
import AboutPage from '@/app/components/templates/AboutPage/AboutPage'
import Breadcrumbs from '@/app/components/modules/Breadcrumbs/Breadcrumbs'

function About() {
  const getDefaultTextGenerator = useCallback(() => 'О компании', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Head>
        <title> Бренд | О компании</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="any" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <AboutPage />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default About
