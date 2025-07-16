import type { Grid } from 'pathfinding'
import type { Position } from '@vue-flow/core'
import type { GraphBoundingBox, NodeBoundingBox } from './getBoundingBoxes'

export declare const gridRatio = 10
export interface PointInfo {
  x: number
  y: number
  position: Position
}
export declare function createGrid(
  graph: GraphBoundingBox,
  nodes: NodeBoundingBox[],
  source: PointInfo,
  target: PointInfo,
): {
  grid: Grid
  start: import('@vue-flow/core').XYPosition
  end: import('@vue-flow/core').XYPosition
}
