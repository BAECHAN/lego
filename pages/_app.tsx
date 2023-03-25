import '../styles/globals.css'
import { ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CookiesProvider } from 'react-cookie'
import Scripts from '@components/script'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout): ReactElement {
  const getLayout = Component.getLayout || ((page: any) => page)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity }, // 데이터가 특정 시간보다 오래된 경우에만 가져오도록 지정합니다.
    },
  })

  return (
    <SessionProvider session={session}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RecoilRoot>
            {getLayout(
              <>
                <Scripts />
                <Component {...pageProps} />
              </>
            )}
          </RecoilRoot>
        </QueryClientProvider>
      </CookiesProvider>
    </SessionProvider>
  )
}
