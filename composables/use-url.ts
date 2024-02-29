
export function useGetTokens() {
  const route = useRoute()
  const hashString = toRef(() => route.hash)

  function getParam (searchParams: string) {
    if(!hashString.value) return
    const hashParams = hashString.value.split(`#`)[1].split(`&`)
    for (const param of hashParams) {
      const [key, value] = param.split(`=`)
      if (key === searchParams) {
        return value
      }
    }
  }

  return {
    accessToken: getParam(`access_token`),
    refreshToken: getParam(`refresh_token`)
  }
}
