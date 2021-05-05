import * as React from 'react'
import { useStyletron } from 'baseui'
import {
  Card,
  StyledBody,
  StyledAction
} from 'baseui/card'
import { Button } from 'baseui/button'
import { Block } from 'baseui/block'
import { ArrowUp, ArrowDown, ArrowLeft } from 'baseui/icon'
import {
  Label1,
  Label3
} from 'baseui/typography'

interface IAssetItemProps {
  title: string;
  description: string;
  amount: number;
  asUsd: number;
}

const AssetItem = (x: IAssetItemProps) => {
  const [css] = useStyletron()

  return (
    <Card>
      <StyledBody>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between'
          })}
        >
          <Block>
            <Block><Label1>{x.title}</Label1></Block>
            <Block><Label3>{x.description}</Label3></Block>
          </Block>
          <Block>
            <Block><Label1>{x.amount}</Label1></Block>
            <Block><Label3>{x.asUsd}</Label3></Block>
          </Block>
        </div>
      </StyledBody>
      <StyledAction>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'flex-end'
          })}
        >
          <Block>
            <Button><ArrowUp /></Button>
          </Block>
          <Block>
            <Button><ArrowDown /></Button>
          </Block>
          <Block>
            <Button><ArrowLeft /></Button>
          </Block>
        </div>
      </StyledAction>
    </Card>
  )
}

export default AssetItem
