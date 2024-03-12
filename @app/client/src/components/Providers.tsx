'use client';
import { useServerInsertedHTML } from 'next/navigation';
import { FC, PropsWithChildren, useRef } from 'react';
import builderJss from '@cms/packages/tiglee-engine/styles/builderJss';
import { Styles } from 'jss';

interface StylesProviderProps extends PropsWithChildren {
  styles: Partial<Styles>;
}

export const StylesProvider: FC<StylesProviderProps> = ({
  styles,
  children,
}) => {
  let isInitialized = false;

  useServerInsertedHTML(() => {
    if (isInitialized) {
      return;
    }

    isInitialized = true;

    const styleSheets = builderJss.createStyleSheet(styles);

    const stylesString = styleSheets
      .toString()
      .replace(/@container/g, '@media');

    const injectedStyles = (
      <>
        <style
          data-meta="builder-styles"
          dangerouslySetInnerHTML={{
            __html: stylesString,
          }}
        ></style>
      </>
    );

    return injectedStyles;
  });

  return <>{children}</>;
};

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default Providers;
