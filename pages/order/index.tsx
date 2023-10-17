import Head from 'next/head'
import { useCallback } from 'react'
import OrderPage from '@/app/components/templates/OrderPage/OrderPage'
import Layout from '@/app/components/layouts/Layout'
import useRedirectByUserCheck from '@/app/hooks/useRedirectByUserCheck'
import Breadcrumbs from '@/app/components/modules/Breadcrumbs/Breadcrumbs'

function Order() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = useCallback(() => 'Оформление заказа', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Head>
        <title>Бренд | {shouldLoadContent ? 'Оформление заказа' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="any" href="/favicon.ico" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            />
            <OrderPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Order
