// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  typescript: { typeCheck: true },
  modules: [
    `@nuxtjs/tailwindcss`,
    `@nuxtjs/supabase`,
    `vuetify-nuxt-module`,
    `@vee-validate/nuxt`,
    `@hebilicious/vue-query-nuxt`
  ],
  runtimeConfig: {
    public: {
      LOGIN_REDIRECT_URL: ``,
      DEPLOY_PRIME_URL : process.env.DEPLOY_PRIME_URL,
    },
  },
  supabase: {
    redirect: false
  },
  tailwindcss: {
    editorSupport: { autocompleteUtil: { as: `tailwindClasses` }, generateConfig: true }
  }
})
