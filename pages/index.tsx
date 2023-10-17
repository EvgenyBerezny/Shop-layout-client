import useRedirectByUserCheck from '@/app/hooks/useRedirectByUserCheck'
import AuthPage from '../app/components/templates/AuthPage/AuthPage'
import Head from 'next/head'

export default function Auth() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)

  return (
    <div>
      <Head>
        <title>Бренд | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="any" href="/favicon.ico" />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </div>
  )
}
