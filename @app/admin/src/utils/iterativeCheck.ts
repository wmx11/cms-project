import { DATA_COMPONENT } from '@cms/tiglee-engine/constants';

interface IterativeCheckProps {
  check: () => void;
  delay?: number;
  callback: () => void;
}

export const iterativeCheck = ({
  check,
  delay = 500,
  callback,
}: IterativeCheckProps) => {
  const _iterate = () => {
    const test = Boolean(check());

    if (!test) {
      setTimeout(_iterate, delay);
    } else {
      callback();
    }
  };

  return _iterate();
};

export const iterativeCheckComponent = (
  data: Omit<IterativeCheckProps, 'check'>
) =>
  iterativeCheck({
    check: () => document.querySelector(`[${DATA_COMPONENT}]`),
    ...data,
  });
