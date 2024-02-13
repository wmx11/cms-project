const getActiveButtonVariant = <T>(comparator: T, value: T) =>
  comparator === value ? 'default' : 'outline';

export default getActiveButtonVariant;
