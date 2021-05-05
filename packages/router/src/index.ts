import * as React from 'react'
import { useRouter as useNextRouter } from 'next/router'
import Route from 'route-parser'

export interface IRouterDefinition<T extends {} = {}> {
    id?: string;
    rule: string;
    render?: (match: T) => React.ReactNode;
}

export interface IRouterConfig {
    base?: string;
}

const pathJoin = (parts: string[], separator = '/') => {
  const replace = new RegExp(separator + '{1,}', 'g')
  return parts.join(separator).replace(replace, separator)
}

interface IMatchResult<T> extends IRouterDefinition<T> {
    match: T;
    rendered: React.ReactNode;
}

export const useRouter = (x: IRouterDefinition[], config: IRouterConfig) => {
  const notInBrowser = typeof globalThis.Window === 'undefined'

  const router = useNextRouter()
  const [url, setUrl] = React.useState(router.asPath)

  React.useEffect(() => {
    const handleRouteChange = (url: string) => setUrl(url)

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  const routerMatchers = React.useMemo(() => {
    return x.map((x) => {
      const rule = config.base ? pathJoin([config.base, x.rule]) : x.rule

      return new Route(rule)
    })
  }, [])

  type MatchFn = (url: string) => (IMatchResult<{}> | null)
  const match = React.useCallback<MatchFn>((url) => {
    let routerIndex = -1
    let match: Record<string, string> | null = null

    for (let i = 0; i < routerMatchers.length; i++) {
      const routerMatcher = routerMatchers[i]
      const routerMatch = routerMatcher.match(url)

      if (routerMatch) {
        routerIndex = i
        match = routerMatch
        break
      }
    }

    if (routerIndex === -1) return null

    const definition = x[routerIndex]

    return {
      ...definition,
      match: match!,
      rendered: definition.render?.(match)
    } as IMatchResult<{}>
  }, [])

  type MatchCurrentFn = () => (IMatchResult<{}> | null)
  const matchCurrent = React.useCallback<MatchCurrentFn>(() => {
    if (notInBrowser) return null

    return match(url)
  }, [url])

  return {
    match, matchCurrent
  }
}
