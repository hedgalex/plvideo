const letters = ['b', 'kb', 'Mb', 'Gb', 'Tb'];

export const getSizeTitle = (size: number): string => {
  let _size = size;
  let i = 0;
  while (_size > 1024 && i < 4) {
    i++;
    _size = _size / 1024;
  }

  return `${Math.round(_size * 10) / 10}${letters[i]}`;
};
