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
  ]
})
