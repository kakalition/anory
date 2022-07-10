import { replace, toUpper, compose } from 'ramda';

const String = {
  truncate: (str: string, length: number) => {
    if (str.length > length) {
      const trimmedString = str.substring(0, length);

      return `${trimmedString}...`;
    }

    return str;
  },

  capitalize: compose(
    replace(/.^/),
    toUpper,
  ),
};

export default String;
