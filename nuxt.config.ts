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
    `@hebilicious/vue-query-nuxt`,
    `@nuxtjs/i18n`,
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
  },
  i18n: {
    locales: [
      {
        code: `en`,
        name: `English`,
        iso: `en-EN`,
        dir: `ltr`,
        file: `en-EN.json`,
      },
      {
        code: `fr`,
        name: `Français`,
        iso: `fr-FR`,
        dir: `ltr`,
        file: `fr-FR.json`,
      },
    ],
    lazy: true,
    langDir: `lang`,
    defaultLocale: `fr`,
    detectBrowserLanguage: false,
    vueI18n: `./i18n.config.ts`,
  }
})
