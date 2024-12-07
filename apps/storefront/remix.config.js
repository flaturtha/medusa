/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverModuleFormat: "cjs",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["@medusajs/medusa-js"],
  watchPaths: ["../../packages/**/*"],
  alias: {
    "@app": "./app"
  }
}; 