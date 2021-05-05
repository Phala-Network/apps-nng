import * as React from 'react'
import { useStyletron } from 'baseui'
import { Label1, Label3 } from 'baseui/typography'

export interface IAssetTitleProps {
  title: string;
  amount?: number;
  unit?: string;
}

const AssetTitle = (x: IAssetTitleProps) => {
  const [css] = useStyletron()

  return (
    <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
      <Label1>{x.title}</Label1>
      <Label3>{!!x.amount && (<>Total {x.amount} {x.unit ?? 'PHA'}</>)}</Label3>
    </div>
  )
}

export default AssetTitle
