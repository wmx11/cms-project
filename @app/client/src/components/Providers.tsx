'use client';
import { useServerInsertedHTML } from 'next/navigation';
import { FC, PropsWithChildren, useRef } from 'react';

export const StylesProvider: FC<PropsWithChildren> = ({ children }) => {
  const isInitialized = useRef(false);

  useServerInsertedHTML(() => {
    if (isInitialized.current) {
      return;
    }

    isInitialized.current = true;

    const injectedStyles = (
      <>
        <style
          data-meta="builder-styles"
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `@media (min-width: 10px) {
              .wb-1_Section {
                box-shadow: none;
                text-shadow: none;
              }
              .wb-1_Section_0_Container {
                gap: var(--gap);
                --gap: 24px;
                width: 100%;
                --basis: calc(100% / var(--flex-columns, 1));
                display: flex;
                flex-wrap: wrap;
                text-align: center;
                --layout-type: flex-row;
                --flex-columns: 4;
                flex-direction: row;
              }
              .wb-1_Section_0_Container>* {
                flex-grow: 1;
                flex-basis: calc(var(--basis, 100%) - var(--gap, 0px));
                flex-shrink: 1;
              }
              .wb-2_Section {
                box-shadow: none;
                text-shadow: none;
              }
              .wb-2_Section_0_Container_0_Title {
                box-shadow: none;
                text-shadow: none;
              }
              .wb-2_Section_0_Container_0_Block_0_Title {
                box-shadow: none;
                text-shadow: none;
              }
              .wb-2_Section_0_Container {
                gap: var(--gap);
                --gap: 24px;
                width: 100%;
                --basis: calc(100% / var(--flex-columns, 1));
                display: flex;
                flex-wrap: wrap;
                --layout-type: flex-row;
                margin-bottom: 24px;
                --flex-columns: 3;
                flex-direction: row;
              }
              .wb-2_Section_0_Container>* {
                flex-grow: 1;
                flex-basis: calc(var(--basis, 100%) - var(--gap, 0px));
                flex-shrink: 1;
              }
              .wb-0_Section_0_Container {
                box-shadow: none;
                text-align: center;
                text-shadow: none;
              }
              .wb-1_Section_2_Container {
                text-align: center;
              }
              .wb-2_Section_0_Container_0_Block {
                text-align: center;
              }
              .wb-2_Section_0_Container_1_Block {
                text-align: center;
              }
              .wb-2_Section_0_Container_2_Block {
                text-align: center;
              }
              .wb-1_Section_1_Container {
                width: 100%;
                --basis: calc(100% / var(--flex-columns, 1));
                flex-wrap: wrap;
                --flex-columns: 3;
              }
              .wb-1_Section_1_Container>* {
                flex-grow: 1;
                flex-basis: calc(var(--basis, 100%) - var(--gap, 0px));
                flex-shrink: 1;
              }
              .wb-3_Section {
                color: rgba(255,255,255, 1);
                background: rgba(0,0,0,1);
                box-shadow: none;
                text-shadow: none;
              }
              .wb-3_Section_0_Container {
                gap: var(--gap);
                --gap: 24px;
                width: 100%;
                --basis: calc(100% / var(--flex-columns, 1));
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                --layout-type: flex-row;
                --flex-columns: 4;
                flex-direction: row;
                justify-content: between;
              }
              .wb-3_Section_0_Container>* {
                flex-grow: 1;
                flex-basis: calc(var(--basis, 100%) - var(--gap, 0px));
                flex-shrink: 1;
              }
              .wb-0_Section {
                color: rgba(255,255,255, 1);
                display: flex;
                background: linear-gradient(90deg, RGBA(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
                box-shadow: none;
                min-height: 100vh;
                align-items: center;
                text-shadow: none;
                --layout-type: flex-row;
                flex-direction: row;
                justify-content: center;
              }
              .wb-0_Section_0_Container_0_Title {
                color: rgba(255,255,255, 1);
              }
              .wb-3_Section_0_Container_4_Block {
                box-shadow: none;
                text-shadow: none;
              }
              .wb-2_Section_1_Container_2_Block {
                box-shadow: none;
                text-shadow: none;
              }
              .wb-3_Section_0_Container_0_Block {
                gap: var(--gap);
                --gap: 24px;
                display: flex;
                align-items: center;
                --layout-type: flex-row;
                flex-direction: row;
              }
              .wb-3_Section_0_Container_0_Block_0_Image {
                margin-bottom: 0px;
              }
              .wb-3_Section_0_Container_0_Block_1_Subtitle {
                margin-bottom: 0px;
              }
              .wb-1_Section_0_Container_0_Title {
                text-shadow: 0px 0px 10px rgba(255,0,255, 1);
              }
            }`,
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
