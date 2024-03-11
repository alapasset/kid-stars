# Lint

## Eslint

Note 1 : to show time taken by rules : `TIMING=1 npx eslint --ext .ts,.vue .`

Note 2 : to view final config : `npx eslint --print-config app.vue > eslint-vue.config.json && npx eslint --print-config composables/family.ts > eslint-ts.config.json`

Note 3 : to list eslint scanned files : `DEBUG=eslint:cli-engine npx eslint --ext .ts,.vue .`
