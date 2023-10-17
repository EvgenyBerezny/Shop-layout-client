import Layout from '@/app/components/layouts/Layout'
import Breadcrumbs from '@/app/components/modules/Breadcrumbs/Breadcrumbs'
import CatalogPage from '@/app/components/templates/CatalogPage/CatalogPage'
import useRedirectByUserCheck from '@/app/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/app/types/catalog'
import Head from 'next/head'
import { useCallback } from 'react'

function Catalog({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = useCallback(() => 'Каталог', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <div>
      <Head>
        <title>Бренд | {shouldLoadContent ? 'Каталог' : ''}</title>
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
            <CatalogPage query={query} />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </div>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  // query параметры с сервера для пагинации
  return {
    props: { query: { ...context.query } },
  }
}

export default Catalog
