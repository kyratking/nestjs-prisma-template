export const getSSLType = (input: string) => {
  try {
    const ssl = JSON.parse(input);
    return ssl;
  } catch (error: unknown) {
    return input === 'true' ? true : false;
  }
};
