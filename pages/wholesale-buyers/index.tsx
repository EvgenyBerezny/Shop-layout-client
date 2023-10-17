import Head from 'next/head'
import { useCallback } from 'react'
import ContactsPage from '@/app/components/templates/ContactsPage/ContactsPage'
import Layout from '@/app/components/layouts/Layout'
import Breadcrumbs from '@/app/components/modules/Breadcrumbs/Breadcrumbs'

function WholesaleBuyers() {
  const getDefaultTextGenerator = useCallback(() => 'Оптовым покупателям', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Head>
        <title> Бренд | Оптовым покупателям</title>
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
          <ContactsPage isWholesaleBuyersPage={true} />
        </main>
        <div className="overlay" />
      </Layout>
    </>
  )
}

export default WholesaleBuyers
