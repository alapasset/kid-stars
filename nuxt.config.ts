/* eslint-disable @typescript-eslint/naming-convention */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: { typeCheck: true },
  runtimeConfig: {
    public: {
      LOGIN_REDIRECT_URL: '',
      DEPLOY_PRIME_URL : process.env.DEPLOY_PRIME_URL,
    },
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
  ],
  colorMode: {
    preference: 'light', // default theme
    dataValue: 'theme', // activate data-theme in <html>
  },
  supabase: {
    redirect: false,
  },
  tailwindcss: {
    configPath: './tailwind.config.ts',
    editorSupport: { autocompleteUtil: { as: 'tailwindClasses' }, generateConfig: true },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-EN',
        dir: 'ltr',
        file: 'en-EN.json',
      },
      {
        code: 'fr',
        name: 'Français',
        iso: 'fr-FR',
        dir: 'ltr',
        file: 'fr-FR.json',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'fr',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },
})
