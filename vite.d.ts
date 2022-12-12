/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'less-vars-to-js' {
  export default (
    content: string,
    options: { resolveVariables: true; stripPrefix: true },
  ) => Record<string, string>
}
