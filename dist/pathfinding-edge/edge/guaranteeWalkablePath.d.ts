import type { Grid } from 'pathfinding'
import type { Position, XYPosition } from '@vue-flow/core'

type Direction = 'top' | 'bottom' | 'left' | 'right'
export declare function getNextPointFromPosition(point: XYPosition, position: Direction): XYPosition
/**
 * Guarantee that the path is walkable, even if the point is inside a non
 * walkable area, by adding a walkable path in the direction of the point's
 * Position.
 */
export declare function guaranteeWalkablePath(grid: Grid, point: XYPosition, position: Position): void
export {}
