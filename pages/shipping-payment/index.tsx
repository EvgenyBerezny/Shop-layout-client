import Head from 'next/head'
import ShippingPayment from '@/app/components/templates/ShippingPayment/ShippingPayment'
import Breadcrumbs from '@/app/components/modules/Breadcrumbs/Breadcrumbs'
import { useCallback } from 'react'
import Layout from '@/app/components/layouts/Layout'

function ShippingPaymentPage() {
  const getDefaultTextGenerator = useCallback(() => 'Доставка и оплата', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Head>
        <title> Бренд | Доставка и оплата</title>
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
          <ShippingPayment />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default ShippingPaymentPage
