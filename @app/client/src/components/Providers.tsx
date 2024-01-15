'use client';
import { useServerInsertedHTML } from 'next/navigation';
import { FC, PropsWithChildren, useRef } from 'react';
import builderJss from '@cms/packages/template-engine/styles/builderJss';
import { Styles } from 'jss';

interface StylesProviderProps extends PropsWithChildren {
  styles: Partial<Styles>;
}

export const StylesProvider: FC<StylesProviderProps> = ({
  styles,
  children,
}) => {
  const isInitialized = useRef(false);

  useServerInsertedHTML(() => {
    if (isInitialized.current) {
      return;
    }

    isInitialized.current = true;

    const styleSheets = builderJss.createStyleSheet(styles);

    const stylesString = styleSheets
      .toString()
      .replace(/@container/g, '@media');

    const injectedStyles = (
      <>
        <style
          data-meta="builder-styles"
          type="text/css"
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
