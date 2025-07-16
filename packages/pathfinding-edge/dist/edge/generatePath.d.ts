import type { Grid } from 'pathfinding'
import type { XYPosition } from '@vue-flow/core'

declare module 'pathfinding' {
  interface FinderOptions extends Heuristic {
    diagonalMovement?: DiagonalMovement
    weight?: number
    allowDiagonal?: boolean
    dontCrossCorners?: boolean
  }
}
export declare function generatePath(grid: Grid, start: XYPosition, end: XYPosition): number[][]
