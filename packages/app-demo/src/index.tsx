import * as React from 'react'
import { useRouter as useNextRouter } from 'next/router'
import { useRouter } from '@phala/nng-router'

import { Block } from 'baseui/block'
import { Tabs, Tab } from 'baseui/tabs-motion'

import PageIndex from './pages/PageIndex'
import PageMetadata from './pages/PageMetadata'

const RedirectToIndex = () => {
  const router = useNextRouter()

  React.useEffect(() => {
    router.push('/apps/dev/metadata')
  }, [])

  return <>Redirecting...</>
}

const appRouter = [
  {
    rule: '/metadata',
    render: function Metadata () {
      return <PageMetadata />
    }
  },
  {
    rule: '/fake-wallet',
    render: function FakeWallet () {
      return <PageIndex />
    }
  },
  {
    rule: '*',
    render: function Redirect () {
      return <RedirectToIndex />
    }
  }
]

const Main = () => {
  const router = useNextRouter()
  const { matchCurrent } = useRouter(appRouter, { base: '/apps/dev' })

  const routerMatch = matchCurrent()

  const headerLinks = {
    '/metadata': 0,
    '/fake-wallet': 1
  }
  const headerMatch = headerLinks[routerMatch?.rule]

  return (
    <Block>
      <Block>
        <Tabs
          activeKey={headerMatch?.toString()}
          onChange={({ activeKey }) => {
            router.push(`/apps/dev${Object.keys(headerLinks)[activeKey]}`)
          }}
          activateOnFocus
        >
          <Tab title="Metadata"></Tab>
          <Tab title="Fake Wallet"></Tab>
        </Tabs>
      </Block>
      <Block>{routerMatch?.rendered}</Block>
    </Block>
  )
}

export default Main
