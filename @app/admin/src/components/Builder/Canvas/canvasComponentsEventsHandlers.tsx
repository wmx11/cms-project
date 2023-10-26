import { DATA_EDITABLE } from '@cms/template-engine/constants/dataAttributes';
import { STYLES_CONTENT_EDITABLE } from '@cms/template-engine/constants/styles';

export const handleEditableContentInput = (target: HTMLBaseElement) => {
  console.log(target.innerText);
};

export const handleEditableContentBlur = (target: HTMLBaseElement) => {
  target.classList.add(...STYLES_CONTENT_EDITABLE.split(' '));
  target.removeAttribute('contenteditable');
  target.removeEventListener('input', () => handleEditableContentInput(target));
  target.removeEventListener('blur', () => handleEditableContentBlur(target));
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
  target.addEventListener('input', () => handleEditableContentInput(target));
  target.addEventListener('blur', () => handleEditableContentBlur(target));
  target.setAttribute('contenteditable', 'true');
  target.focus();
};
