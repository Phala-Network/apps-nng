import * as React from 'react'
import { useApiPromise } from '@phala/react-hooks'
import { useStyletron } from 'baseui'
import { Card } from 'baseui/card'
import { Block } from 'baseui/block'
import { Label1 } from 'baseui/typography'

const boldTextStyle = {
  fontWeight: 'bold' as const
}

const PageMetadata = () => {
  const [css] = useStyletron()
  const { api } = useApiPromise()
  const [chainName, setChainName] = React.useState<string>('')
  const [lastBlock, setLastBlock] = React.useState<string>('')
  const [lastHash, setLastHash] = React.useState<string>('')

  React.useEffect(() => {
    api?.rpc.system.chain().then((x) => setChainName(x.toString()))
    const ubsubscribe = api?.rpc.chain.subscribeNewHeads((lastHeader) => {
      setLastBlock(lastHeader.number.toString())
      setLastHash(lastHeader.hash.toString())
    })

    return () => {
      ubsubscribe?.then((cb) => {
        cb()
      })
    }
  }, [api])

  return (
    <Card>
      <Label1>Chain Information</Label1>
      <Block className={css({ marginTop: '12px' })}>
        <span className={css(boldTextStyle)}>Chain Name: </span> { chainName }
      </Block>
      <Block>
        <span className={css(boldTextStyle)}>Last Block: </span> #{ lastBlock }
      </Block>
      <Block>
        <span className={css(boldTextStyle)}>Last Hash: </span> { lastHash }
      </Block>
    </Card>
  )
}

export default PageMetadata
