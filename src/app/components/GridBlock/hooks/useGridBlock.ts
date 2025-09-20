import { useCallback } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useDashboard } from "@/context/DashboardContext";
import { Widget } from "@/types";

export const useGridBlock = (position: number, widget: Widget | undefined) => {
  const { deleteWidget } = useDashboard();

  const {
    attributes: dragAttributes,
    listeners: dragListeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: position,
    disabled: !widget,
    transform: {
      x: 0,
      y: 0,
    },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: position,
  });

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (widget) {
        deleteWidget(widget);
      }
    },
    [deleteWidget, widget]
  );

  const setRefs = (element: HTMLDivElement | null) => {
    setDragRef(element);
    setDropRef(element);
  };

  return {
    dragAttributes,
    dragListeners,
    setRefs,
    isDragging,
    isOver,
    handleDelete,
  };
};
