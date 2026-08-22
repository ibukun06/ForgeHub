import React from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { FilePreview } from '@/components/workspace/file-preview';

export const EngineeringFileNodeView = (props: NodeViewProps) => {
  const { node } = props;
  
  return (
    <NodeViewWrapper className="my-6" contentEditable={false}>
      <FilePreview 
        fileName={node.attrs.name}
        fileUrl={node.attrs.url}
        fileType={node.attrs.type}
      />
    </NodeViewWrapper>
  );
};
