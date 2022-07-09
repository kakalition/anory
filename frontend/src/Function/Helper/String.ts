const String = {
  truncate: (str: string, length: number) => {
    if (str.length > length) {
      const trimmedString = str.substring(0, length);

      return `${trimmedString}...`;
    }

    return str;
  },
};

export default String;
