'use client';
import builderJss from '@cms/packages/tiglee-engine/styles/builderJss';
import { Styles } from 'jss';
import { useServerInsertedHTML } from 'next/navigation';
import { FC, PropsWithChildren, useRef } from 'react';

interface TigleeProviderProps extends PropsWithChildren {
  stylesSchema: Partial<Styles>;
}

const TigleeProvider: FC<TigleeProviderProps> = ({
  stylesSchema,
  children,
}) => {
  const isInitialized = useRef(false);

  useServerInsertedHTML(() => {
    if (isInitialized.current) {
      return;
    }

    isInitialized.current = true;

    const styleSheets = builderJss.createStyleSheet(stylesSchema);

    const stylesString = styleSheets
      .toString()
      .replace(/@container/g, '@media')
      .replace(/\n/g, '')
      .replace(/\s\s+/g, ' ');

    const injectedStyles = (
      <>
        <style
          data-meta="tg-styles"
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

export default TigleeProvider;
