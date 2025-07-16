import type { XYPosition } from '@vue-flow/core'

export declare function drawStraightLinePath(source: XYPosition, target: XYPosition, path: number[][]): string
/**
 * Draws a SVG path from a list of points, using rounded lines.
 */
export declare function drawSmoothLinePath(source: XYPosition, target: XYPosition, path: number[][]): string
