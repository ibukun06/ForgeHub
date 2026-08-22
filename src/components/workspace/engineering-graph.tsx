"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Scale, FileText, Component } from "lucide-react";

type EngineeringGraphProps = {
  documents: any[];
  sections: any[];
  decisions: any[];
};

export function EngineeringGraph({ documents, sections, decisions }: EngineeringGraphProps) {
  // Convert our database schema to React Flow nodes
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];

  let yOffset = 0;

  // 1. Create Document Groups
  documents.forEach((doc, idx) => {
    initialNodes.push({
      id: `doc-${doc.id}`,
      type: "group",
      position: { x: (idx % 3) * 400, y: Math.floor(idx / 3) * 600 + yOffset },
      style: {
        width: 350,
        height: 500,
        backgroundColor: "rgba(30, 41, 59, 0.5)", // slate-800 with opacity
        border: "1px solid rgba(51, 65, 85, 0.8)", // slate-700
        borderRadius: "8px",
      },
      data: { label: doc.title || "Untitled Document" },
    });
  });

  // 2. Create Section Nodes inside Documents
  const sectionsByDoc = sections.reduce((acc: any, section: any) => {
    if (!acc[section.document_id]) acc[section.document_id] = [];
    acc[section.document_id].push(section);
    return acc;
  }, {});

  Object.entries(sectionsByDoc).forEach(([docId, docSections]: [string, any]) => {
    docSections.sort((a: any, b: any) => a.order - b.order).forEach((section: any, idx: number) => {
      initialNodes.push({
        id: `sec-${section.id}`,
        parentId: `doc-${docId}`,
        extent: "parent",
        position: { x: 20, y: 40 + idx * 80 },
        data: { 
          label: (
            <div className="flex items-center gap-2 max-w-[280px]">
              <Component className="w-4 h-4 text-primary" />
              <div className="truncate text-xs">
                {section.content 
                  ? section.content.replace(/<[^>]*>?/gm, "").substring(0, 40) + "..." 
                  : "Empty requirement"}
              </div>
            </div>
          ) 
        },
        style: {
          width: 310,
          background: "#0f172a", // slate-900
          color: "#f8fafc",
          border: "1px solid #334155",
          borderRadius: "6px",
          padding: "8px",
        },
      });
    });
  });

  // 3. Create Decision Nodes and Edges
  decisions.forEach((decision, idx) => {
    initialNodes.push({
      id: `dec-${decision.id}`,
      position: { x: 500 + (idx * 200), y: -150 + (idx * 100) },
      data: {
        label: (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-secondary">
              <Scale className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Decision</span>
            </div>
            <div className="text-sm font-medium">{decision.decision}</div>
          </div>
        )
      },
      style: {
        background: "#0f172a",
        color: "#f8fafc",
        border: "1px solid #3b82f6", // blue-500 for decisions
        borderRadius: "6px",
        padding: "12px",
        width: 200,
      }
    });

    if (decision.section_id) {
      initialEdges.push({
        id: `e-dec-${decision.id}-sec-${decision.section_id}`,
        source: `dec-${decision.id}`,
        target: `sec-${decision.section_id}`,
        animated: true,
        style: { stroke: "#3b82f6", strokeWidth: 2 },
      });
    }
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-[calc(100vh-10rem)] border border-border/50 rounded-lg overflow-hidden bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-black/20"
        nodesDraggable={true} // Allow users to arrange nodes for better visibility
        nodesConnectable={false} // Read-only connections for now
      >
        <Background gap={12} size={1} color="#334155" />
        <Controls />
        <Panel position="top-left" className="bg-surface/90 backdrop-blur p-3 rounded-md border border-border">
          <h3 className="font-heading font-medium text-text-primary text-sm">Engineering Graph</h3>
          <p className="text-xs text-text-muted mt-1 max-w-[250px]">
            Visual dependency trace of requirements (sections) to architectural decisions.
          </p>
        </Panel>
      </ReactFlow>
    </div>
  );
}
