import { useStore } from 'effector-react/effector-react.mjs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getGoodsPartFx } from '@/app/api/goodsParts'
import Layout from '@/app/components/layouts/Layout'
import PartPage from '@/app/components/templates/PartPage/PartPage'
import { $goodsPart, setGoodsPart } from '@/app/context/goodsPart'
import useRedirectByUserCheck from '@/app/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/app/types/catalog'
import Custom404 from '../404'
import Breadcrumbs from '@/app/components/modules/Breadcrumbs/Breadcrumbs'

function CatalogPartPage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const goodsPart = useStore($goodsPart)
  const [error, setError] = useState(false)
  const router = useRouter()
  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Каталог'),
    []
  )
  const getTextGenerator = useCallback((param: string) => ({})[param], [])
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  useEffect(() => {
    loadGoodsPart()
  }, [router.asPath])

  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = goodsPart.name
    }
  }, [lastCrumb, goodsPart])

  const loadGoodsPart = async () => {
    try {
      const data = await getGoodsPartFx(`/goods-parts/find/${query.partId}`)

      if (!data) {
        setError(true)
        return
      }

      setGoodsPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <div>
      <Head>
        <title>Бренд | {shouldLoadContent ? goodsPart.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="any" href="/favicon.ico" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
              />
              <PartPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </div>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogPartPage
