export const genUUIDv4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (placeholderHexDigit) =>
      (
        placeholderHexDigit ^ // eslint-disable-line no-bitwise
        // eslint-disable-next-line no-bitwise
        ((Math.random() * 16) >> (placeholderHexDigit / 4))
      ).toString(16)
  );
