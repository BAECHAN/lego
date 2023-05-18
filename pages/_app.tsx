import '../styles/globals.scss'
import { ReactElement, useCallback, useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CookiesProvider } from 'react-cookie'
import Scripts from '@components/script'
import { useRouter } from 'next/router'
import Head from 'next/head'

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

  const router = useRouter()

  const storePathValues = useCallback(() => {
    const storage = globalThis?.sessionStorage

    if (storage) {
      const prevPath = storage.getItem('currentPath') as string
      storage.setItem('prevPath', prevPath)
      storage.setItem('currentPath', globalThis.location.pathname)
    }
  }, [])

  useEffect(() => {
    storePathValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

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
