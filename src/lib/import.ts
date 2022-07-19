/*
 * @Author: Just be free
 * @Date:   2021-03-03 16:02:00
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-07-18 17:24:37
 * @E-mail: justbefree@126.com
 */

export const r = (applicationName: string, componentName: string) => {
  try {
    // eslint-disable-next-line
    return require(`@/overwrite/${applicationName}/${componentName}/index.ts`)[
      "default"
    ];
  } catch (err) {
    // eslint-disable-next-line
    return require(`@/applications/${applicationName}/${componentName}/component/index.ts`)[
      "default"
    ];
  }
};
