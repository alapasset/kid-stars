/* eslint-disable @typescript-eslint/naming-convention */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    dataValue: 'theme', // activate data-theme in <html>
    preference: 'light', // default theme
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  i18n: {
    defaultLocale: 'fr',
    detectBrowserLanguage: false,
    langDir: 'lang',
    lazy: true,
    locales: [
      {
        code: 'en',
        dir: 'ltr',
        file: 'en-EN.json',
        iso: 'en-EN',
        name: 'English',
      },
      {
        code: 'fr',
        dir: 'ltr',
        file: 'fr-FR.json',
        iso: 'fr-FR',
        name: 'Français',
      },
    ],
    vueI18n: './i18n.config.ts',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@vee-validate/nuxt',
    '@hebilicious/vue-query-nuxt',
    '@nuxtjs/i18n',
    'nuxt-svgo',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      DEPLOY_PRIME_URL : process.env.DEPLOY_PRIME_URL,
      LOGIN_REDIRECT_URL: '',
    },
  },
  supabase: {
    redirect: false,
  },
  tailwindcss: {
    configPath: './tailwind.config.ts',
    editorSupport: { autocompleteUtil: { as: 'tailwindClasses' }, generateConfig: true },
  },
  typescript: { typeCheck: true },
})
