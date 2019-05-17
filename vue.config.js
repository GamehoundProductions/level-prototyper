// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
// }
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../../firebase/level-designer/public/"),
  assetsDir: "../../firebase/level-designer/public/"
}