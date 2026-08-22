import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { EngineeringFileNodeView } from './EngineeringFileNodeView';

export interface EngineeringFileOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    engineeringFile: {
      setEngineeringFile: (options: { url: string; name: string; type: string }) => ReturnType;
    };
  }
}

export const EngineeringFile = Node.create<EngineeringFileOptions>({
  name: 'engineeringFile',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      url: {
        default: null,
      },
      name: {
        default: 'Untitled File',
      },
      type: {
        default: 'application/octet-stream',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="engineering-file"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'engineering-file' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EngineeringFileNodeView);
  },

  addCommands() {
    return {
      setEngineeringFile:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
