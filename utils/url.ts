export const checkPathname = (pathname: string) => {
  const pathRegex = /^\/[a-zA-Z0-9-._~/]*$/

  return pathRegex.test(pathname)
}

export const getSecondLevelPathname = (pathname: string) => {
  const pathnameParts = pathname.split("/")
  const targetIndex = pathname.startsWith("/") ? 2 : 1
  const secondLevelPathname = pathnameParts[targetIndex]

  return secondLevelPathname
}
