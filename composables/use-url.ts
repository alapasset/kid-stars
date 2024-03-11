
export function useGetTokens () {
  const route = useRoute()
  const hashString = toRef(() => route.hash)

  function getParameter (searchParameters: string): string | undefined {
    if(!hashString.value) return undefined
    const hashParameters = hashString.value.split('#')[1]?.split('&')
    if (!hashParameters) return undefined
    for (const parameter of hashParameters) {
      const [key, value] = parameter.split('=')
      if (key === searchParameters) return value
    }
    return undefined
  }

  return {
    accessToken: getParameter('access_token'),
    refreshToken: getParameter('refresh_token'),
  }
}
