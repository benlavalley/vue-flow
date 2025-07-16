import type { GraphNode, XYPosition } from '@vue-flow/core'

export interface NodeBoundingBox {
  id: string
  width: number
  height: number
  topLeft: XYPosition
  bottomLeft: XYPosition
  topRight: XYPosition
  bottomRight: XYPosition
}
export interface GraphBoundingBox {
  width: number
  height: number
  topLeft: XYPosition
  bottomLeft: XYPosition
  topRight: XYPosition
  bottomRight: XYPosition
  xMax: number
  yMax: number
  xMin: number
  yMin: number
}
/**
 * Get the bounding box of all nodes and the graph itself, as X/Y coordinates
 * of all corner points.
 *
 * @param storeNodes The node list
 * @param nodePadding Optional padding to add to the node's bounding boxes
 * @param graphPadding Optional padding to add to the graph's bounding box
 * @param roundTo If the coordinates should be rounded to this nearest integer
 * @returns Graph and nodes bounding boxes.
 */
export declare function getBoundingBoxes(
  storeNodes: GraphNode[],
  nodePadding?: number,
  graphPadding?: number,
  roundTo?: number,
): {
  nodes: NodeBoundingBox[]
  graph: GraphBoundingBox
}
