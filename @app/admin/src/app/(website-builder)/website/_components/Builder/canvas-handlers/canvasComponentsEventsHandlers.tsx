import { DATA_EDITABLE } from '@cms/template-engine/constants';
import { STYLES_CONTENT_EDITABLE } from '@cms/template-engine/constants';

export const handleEditableContentInput = (event: Event) => {
  const target = event.target as HTMLBaseElement;
  console.log(target.innerText);
};

export const handleEditableContentBlur = (event: Event) => {
  const target = event.target as HTMLBaseElement;
  target.classList.add(...STYLES_CONTENT_EDITABLE.split(' '));
  target.removeAttribute('contenteditable');
  target.removeEventListener('input', handleEditableContentInput, true);
  target.removeEventListener('blur', handleEditableContentBlur, true);
};

export const handleEditableContentClick = (target: HTMLBaseElement) => {
  if (!target) {
    return null;
  }

  if (!target.hasAttribute(DATA_EDITABLE)) {
    return null;
  }

  if (target.getAttribute('contenteditable') === 'true') {
    return null;
  }

  target.classList.remove(...STYLES_CONTENT_EDITABLE.split(' '));
  target.addEventListener('input', handleEditableContentInput, true);
  target.addEventListener('blur', handleEditableContentBlur, true);
  target.setAttribute('contenteditable', 'true');
  target.focus();
};
