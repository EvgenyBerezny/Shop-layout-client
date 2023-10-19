import Layout from '@/app/components/layouts/Layout'
import DashboardPage from '@/app/components/templates/DashboardPage/DashboardPage'
// import useRedirectByUserCheck from '@/app/hooks/useRedirectByUserCheck'
import Head from 'next/head'

function Dashboard() {
  // const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <div>
      <Head>
        <title> Бренд | Главная</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="any" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <DashboardPage />
          <div className="overlay" />
        </main>
      </Layout>
    </div>
  )
}

export default Dashboard
