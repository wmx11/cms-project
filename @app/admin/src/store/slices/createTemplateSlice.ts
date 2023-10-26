import { Component } from '@prisma/client';
import { StateCreator } from 'zustand';

export type TemplateSlice = {
  templateId: string;
  templateComponents: Component[];
  setTemplateId: (templateId: string) => void;
};

const createTemplateSlice: StateCreator<TemplateSlice> = (set) => ({
  templateId: '',
  templateComponents: [],
  setTemplateId: (templateId: string) => set(() => ({ templateId })),
});

export default createTemplateSlice;
