import { useLocation } from 'react-router-dom';

type HashData = Record<string, number | string>;

const getValue = (str: string): string | number => {
  return /\D/g.test(str) ? str : Number(str);
};

export const useLocationHash = (): HashData => {
  const { hash } = useLocation();
  const result = {} as HashData;
  const splitted = hash.replace(/#/, '').split(/&/);

  splitted.forEach((pair: string, idx: number) => {
    const [name, value] = pair.split(/=/);
    if (value) {
      result[name] = getValue(value);
    } else {
      result[`value${idx}`] = getValue(name);
    }
  });

  return result;
};
