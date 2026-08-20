"use client";

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  BackgroundVariant,
  NodeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Activity, Beaker, CheckCircle2, AlertTriangle, Lightbulb, Link as LinkIcon } from 'lucide-react';

// Custom Node component with industrial blueprint styling
const ProjectNode = ({ data, isConnectable }: NodeProps) => {
  const isFailed = data.status === 'failed';
  const isSuccess = data.status === 'success';
  const isWarning = data.status === 'warning';

  let borderColor = 'border-border';
  let iconColor = 'text-text-muted';
  let Icon = Lightbulb;
  
  if (isFailed) {
    borderColor = 'border-error border-dashed';
    iconColor = 'text-error';
    Icon = AlertTriangle;
  } else if (isSuccess) {
    borderColor = 'border-success';
    iconColor = 'text-success';
    Icon = CheckCircle2;
  } else if (isWarning) {
    borderColor = 'border-warning';
    iconColor = 'text-warning';
    Icon = Activity;
  } else if (data.type === 'experiment') {
    Icon = Beaker;
    iconColor = 'text-primary';
    borderColor = 'border-primary shadow-[0_0_15px_rgba(var(--color-primary),0.2)]';
  }

  return (
    <div className={`px-4 py-3 shadow-lg rounded-none bg-surface border ${borderColor} font-mono w-[200px]`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="!bg-border !w-3 !h-3 !rounded-none !border-0" />
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${iconColor}`}>
          <Icon size={16} />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{data.category || 'NODE'}</div>
          <div className="font-bold text-sm text-text-primary leading-tight">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} className="!bg-border !w-3 !h-3 !rounded-none !border-0" />
    </div>
  );
};

const nodeTypes = {
  projectNode: ProjectNode,
};

// Initial blueprint map layout
const initialNodes = [
  { id: '1', type: 'projectNode', position: { x: 250, y: 0 }, data: { label: 'Define Manual Shelling Problem', category: 'PROBLEM', status: 'success' } },
  { id: '2', type: 'projectNode', position: { x: 100, y: 150 }, data: { label: 'Material Strength Specs', category: 'RESEARCH' } },
  { id: '3', type: 'projectNode', position: { x: 400, y: 150 }, data: { label: 'Motor Selection (2HP)', category: 'DESIGN' } },
  { id: '4', type: 'projectNode', position: { x: 250, y: 300 }, data: { label: 'Drum Rotation Calculations', category: 'CALCULATIONS', status: 'success' } },
  { id: '5', type: 'projectNode', position: { x: 250, y: 450 }, data: { label: 'Build Prototype V1', category: 'PROTOTYPE', type: 'experiment' } },
  { id: '6', type: 'projectNode', position: { x: 100, y: 600 }, data: { label: 'Vibration Exceeds Limits', category: 'FAILURE', status: 'failed' } },
  { id: '7', type: 'projectNode', position: { x: 400, y: 600 }, data: { label: 'Throughput matches specs', category: 'RESULT', status: 'success' } },
  { id: '8', type: 'projectNode', position: { x: 100, y: 750 }, data: { label: 'Frame Stiffening Iteration', category: 'ITERATION', type: 'experiment' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: false, style: { stroke: 'var(--color-border)' } },
  { id: 'e1-3', source: '1', target: '3', animated: false, style: { stroke: 'var(--color-border)' } },
  { id: 'e2-4', source: '2', target: '4', animated: false, style: { stroke: 'var(--color-border)' } },
  { id: 'e3-4', source: '3', target: '4', animated: false, style: { stroke: 'var(--color-border)' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: 'var(--color-primary)' } },
  { id: 'e5-6', source: '5', target: '6', animated: false, style: { stroke: 'var(--color-border)' } },
  { id: 'e5-7', source: '5', target: '7', animated: false, style: { stroke: 'var(--color-border)' } },
  { id: 'e6-8', source: '6', target: '8', animated: true, style: { stroke: 'var(--color-warning)' } },
];

export function ProjectMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="w-full h-full min-h-[600px] border border-border bg-surface-muted relative font-mono">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 border border-border bg-surface p-2 shadow-sm text-xs font-bold text-text-primary uppercase tracking-widest">
        <Network size={16} className="text-primary" />
        Active Project Blueprint
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="dark:bg-bg bg-bg"
      >
        <Controls className="!bg-surface !border-border !shadow-none !rounded-none" />
        <MiniMap 
          nodeColor={(n) => {
            if (n.data?.status === 'failed') return 'var(--color-error)';
            if (n.data?.status === 'success') return 'var(--color-success)';
            if (n.data?.type === 'experiment') return 'var(--color-primary)';
            return 'var(--color-border)';
          }}
          maskColor="rgba(var(--color-bg), 0.7)"
          className="!bg-surface !border-border"
        />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--color-border)" />
      </ReactFlow>
    </div>
  );
}
