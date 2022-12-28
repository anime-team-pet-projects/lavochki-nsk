import type { AppProps } from 'next/app'

import DefaultLayout from "@/app/layouts/DefaultLayout";

import { requireSvg } from "@/app/utils/reqireSvg";

import 'swiper/css';
import '@/app/styles/main.scss'
import {
    QueryClient,
    QueryClientProvider,
    Hydrate,
    DehydratedState,
    useQuery,
    dehydrate,
    QueryCache,
    QueryClientConfig, MutationCache
} from "react-query";
import {useRef, useState} from "react";
import {SnackbarProvider} from 'notistack';
import {ErrorType} from "@/app/types/common.type";
import CommonSnackbar from "@/app/components/Common/CommonSnackbar";
import {ReactQueryDevtools} from "react-query/devtools";
requireSvg()

const queryClientOptions: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
        mutations: {
            retry: false
        }
    },
}

const BenchesApp = ({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>)  => {
    const [snackbarOptions, setSnackbarOptions] = useState<{ isVisible: boolean } & ErrorType>({
        isVisible: false,
        message: '',
        details: ['']
    })
    const mutationCache = new MutationCache({
        onError: (error) => {
            const errorData = error as ErrorType

            setSnackbarOptions({...errorData, isVisible: true})

            return
        }
    });

    const handleSnackbarClose = (): void => {
        setSnackbarOptions({
            isVisible: false,
            message: '',
            details: ['']
        })
    }

    const queryClient = useRef(new QueryClient({
        ...queryClientOptions,
        mutationCache,
        queryCache: new QueryCache({
            onError: (error) => {
                const errorData = error as ErrorType

                setSnackbarOptions({...errorData, isVisible: true})

                return
            }
        }),
    }))

  return (
          <QueryClientProvider client={queryClient.current}>
              <Hydrate state={pageProps.dehydratedState}>
                  <DefaultLayout>
                      <Component {...pageProps} />
                  </DefaultLayout>

                  <CommonSnackbar isOpen={snackbarOptions.isVisible} onClose={handleSnackbarClose} message={snackbarOptions.message} />
                <ReactQueryDevtools initialIsOpen={false} />
              </Hydrate>
          </QueryClientProvider>
  )
}

export default BenchesApp
