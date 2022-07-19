/*
* @Author: Just be free
* @Date:   2021-05-11 13:45:20
* @Last Modified by:   Just be free
* @Last Modified time: 2021-05-11 13:45:21
* @E-mail: justbefree@126.com
*/
const args = process.argv.splice(2);
const fs = require("fs");
const descriptions = {
  development: "功能测试环境",
  test: "集成测试环境",
  production: "生产环境"
};
const env = args[0];
fs.writeFile("./.env", `TARGET_ENVIRONMENT=${env}\nVUE_APP_DESCRIPTION=${descriptions[env]}`, "utf8", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});