
const setActiveVariantStyles =
  <T>(selectedVariant: T) =>
  (variant: T) => {
    return selectedVariant === variant ? 'solid' : 'light';
  };

export default setActiveVariantStyles;
