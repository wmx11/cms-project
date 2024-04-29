export const selectTextContent = (target: HTMLElement) => {
  if (!target) {
    return null;
  }

  const selection = document.getSelection();
  const range = document.createRange();

  selection?.removeAllRanges();
  range.selectNodeContents(target);
  selection?.addRange(range);
};
