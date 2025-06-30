/**
 * @file webpack.config.js
 * @description Configuração do Webpack com Module Federation para o microfrontend Password Validator.
 * Utiliza o plugin @angular-architects/module-federation para expor e compartilhar módulos Angular.
 */

const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

/**
 * Exporta a configuração do Webpack utilizando o plugin de Module Federation.
 * @see {@link https://www.npmjs.com/package/@angular-architects/module-federation}
 */
module.exports = withModuleFederationPlugin({
  /**
   * Nome do microfrontend para identificação no Module Federation.
   * @type {string}
   */
  name: "password-validator",

  /**
   * Módulos expostos para outros microfrontends consumirem.
   * @property {string} ./Component Caminho para o componente principal exposto.
   */
  exposes: {
    "./Component": "./src/app/app.ts",
  },

  /**
   * Compartilhamento de dependências entre microfrontends.
   * Utiliza singleton para evitar múltiplas instâncias e garantir compatibilidade de versão.
   */
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
