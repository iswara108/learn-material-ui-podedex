declare module 'path-match' {
  import { ParseOptions, Path, TokensToRegexpOptions } from 'path-to-regexp'

  function match(
    path: Path
  ): (
    pathname: string,
    params: { [key: string]: any }
  ) => { [key: string]: any }

  function path_match(
    options: TokensToRegexpOptions & ParseOptions
  ): typeof match

  export = path_match
}
