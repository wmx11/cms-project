const handleKeyDown = (event) => {
  if (!event.ctrlKey) {
    return;
  }

  switch (event.key) {
    case '`':
      event.preventDefault();
      break;
    case 'b':
      event.preventDefault();
      break;
    case 'i':
      event.preventDefault();
      break;
    case 'u':
      event.preventDefault();
      break;
    case 's':
      event.preventDefault();
      break;
    default:
      break;
  }
};

export default handleKeyDown;
