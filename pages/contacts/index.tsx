import Head from 'next/head'
import { useCallback } from 'react'
import Layout from '@/app/components/layouts/Layout'
import ContactsPage from '@/app/components/templates/ContactsPage/ContactsPage'
import Breadcrumbs from '@/app/components/modules/Breadcrumbs/Breadcrumbs'

function Contacts() {
  const getDefaultTextGenerator = useCallback(() => 'Контакты', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Head>
        <title> Бренд | Контакты</title>
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
          <ContactsPage />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default Contacts
