/*
 * @Author: Just be free
 * @Date:   2020-07-22 09:59:15
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-10-25 18:00:48
 * @E-mail: justbefree@126.com
 */

export const loadApplication = (path: string) => {
  let hasOverWrite = false; // 是不是继承
  let newAdded = false; // 是不是新增的application
  try {
    require(`@/overwrite/${path}/index.ts`);
    require(`@/applications/${path}/index.ts`);
    hasOverWrite = true;
  } catch (err) {
    try {
      require(`@/overwrite/${path}/index.ts`);
      newAdded = true;
    } catch (err) {
      newAdded = false;
    }
  }
  if (hasOverWrite) {
    return Promise.all([
      import(`@/applications/${path}/index.ts`),
      import(`@/overwrite/${path}/index.ts`),
    ]);
  } else if (newAdded) {
    return import(`@/overwrite/${path}/index.ts`);
  } else {
    return import(`@/applications/${path}/index.ts`);
  }
};

export const loadComponent = (path: string) => {
  // const com = () => import( webpackChunkName: "index" `@/applications/common/${path}/index.js`)
  // 使用[request]来告诉webpack，这里的值是根据后面传入的字符串来决定，本例中就是变量path的值
  let hasOverWrite = false;
  const routerTypeComponent = path.indexOf("layout") > -1;
  try {
    require(`@/overwrite/${path}/index.ts`);
    // console.log(require(`@/overwrite/${path}/index.ts`));
    hasOverWrite = true;
  } catch (err) {
    // console.log(require(`@/applications/${path}/index.ts`));
    hasOverWrite = false;
  }
  if (hasOverWrite) {
    // eslint-disable-next-line
    return require(`@/overwrite/${path}/index.ts`).default;
  } else {
    if (routerTypeComponent) {
      // eslint-disable-next-line
      return require(`@/applications/${path}/index.ts`).default;
    } else {
      // eslint-disable-next-line
      return require(`@/applications/${path}/default.ts`).default;
    }
  }
};
