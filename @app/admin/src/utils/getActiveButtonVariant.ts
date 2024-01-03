const getActiveButtonVariant = <T>(comparator: T, value: T) =>
  comparator === value ? 'default' : 'secondary';

export default getActiveButtonVariant;
