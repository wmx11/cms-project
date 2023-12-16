const getActiveButtonVariant = <T>(comparator: T, value: T) =>
  comparator === value ? 'solid' : 'light';

export default getActiveButtonVariant;
