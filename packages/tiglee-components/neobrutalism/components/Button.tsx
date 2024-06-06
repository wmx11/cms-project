import BaseButton, {
  Props,
} from '@cms/packages/tiglee-components/basic/components/Button';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Button: FC<Props> = (props) => {
  return (
    <BaseButton
      {...props}
      className={twMerge(
        'rounded-base bg-tg-primary font-base shadow-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY border-2 border-black px-4 py-2 text-sm transition-all hover:shadow-none',
        props.className
      )}
    />
  );
};

export default Button;

export { schema } from '@cms/packages/tiglee-components/basic/components/Button';
