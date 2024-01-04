import { Component } from '@prisma/client';
import { RefObject } from 'react';
import { BuilderStoreState } from './store/useBuilderStore';

export type Target = { target: HTMLBaseElement };

export type TemplateComponents = {
  templateComponents: Component[];
};

export type SetTriggerRef = {
  setTriggerRef: (ref: RefObject<HTMLElement>) => void;
};

export type SetIsOpen = { setIsOpen: (isOpen: boolean) => void };

export type HandleSelect = {
  handleSelect: (key: React.Key, path: string) => void;
};

export type BuilderState = { state: BuilderStoreState };
