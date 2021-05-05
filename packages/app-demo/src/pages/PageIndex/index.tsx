import * as React from 'react'
import { Block } from 'baseui/block'
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid'
import AssetTitle from './AssetTitle'
import AssetItem from './AssetItem'

const MOCK_DATA = [
  {
    title: 'PHA',
    description: 'Phala',
    amount: 124.12,
    asUsd: 78.9112
  },
  {
    title: 'pPHA',
    description: 'Private PHA',
    amount: 124.12,
    asUsd: 78.9112
  },
  {
    title: 'ePHA',
    description: 'ERC20 PHA',
    amount: 124.12,
    asUsd: 78.9112
  }
]

const PageIndex = () => {
  return (
    <Block>
      <AssetTitle title="Phala" amount={372.36} unit="PHA" />
      <FlexGrid
        flexGridColumnCount={3}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
      >
        {MOCK_DATA.map((asset, index) => (
          <FlexGridItem key={index}>
            <AssetItem {...asset} />
          </FlexGridItem>
        ))}
      </FlexGrid>

      <AssetTitle title="Parallel Chain" />
      <FlexGrid
        flexGridColumnCount={3}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
      >
        {MOCK_DATA.map((asset, index) => (
          <FlexGridItem key={index}>
            <AssetItem {...asset} />
          </FlexGridItem>
        ))}
      </FlexGrid>

      <AssetTitle title="Bridged Chain" />
      <FlexGrid
        flexGridColumnCount={3}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
      >
        {MOCK_DATA.map((asset, index) => (
          <FlexGridItem key={index}>
            <AssetItem {...asset} />
          </FlexGridItem>
        ))}
      </FlexGrid>
    </Block>
  )
}

export default PageIndex
