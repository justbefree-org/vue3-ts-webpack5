/*
 * @Author: Just be free
 * @Date:   2022-10-25 18:01:15
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-10-25 18:02:25
 * @E-mail: justbefree@126.com
 */
const HelloWorld = () =>
  import(/* webpackChunkName: "hello-world" */ "./helloWorld.vue");
export default HelloWorld;
