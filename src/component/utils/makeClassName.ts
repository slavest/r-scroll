const makeClassName = (prefix?: string, defaultCls?: string) => {
  if (prefix) {
    return `${prefix} ${defaultCls}`;
  }
  return defaultCls;
};
export default makeClassName;
