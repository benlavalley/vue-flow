import type { Position } from '@vue-flow/core'

declare const _default: import('vue').DefineComponent<
  {
    label: {
      type: import('vue').PropType<
        | string
        | object
        | import('vue').VNode<
            import('vue').RendererNode,
            import('vue').RendererElement,
            {
              [key: string]: any
            }
          >
        | import('vue').Component<import('@vue-flow/core').EdgeTextProps>
      >
    }
    id: {
      type: import('vue').PropType<string>
      required: true
    }
    source: {
      type: import('vue').PropType<string>
      required: true
    }
    target: {
      type: import('vue').PropType<string>
      required: true
    }
    sourceX: {
      type: import('vue').PropType<number>
      required: true
    }
    sourceY: {
      type: import('vue').PropType<number>
      required: true
    }
    targetX: {
      type: import('vue').PropType<number>
      required: true
    }
    targetY: {
      type: import('vue').PropType<number>
      required: true
    }
    selected: {
      type: import('vue').PropType<boolean>
      default: boolean
    }
    animated: {
      type: import('vue').PropType<boolean>
    }
    sourcePosition: {
      type: import('vue').PropType<Position>
      required: true
      default: Position
    }
    targetPosition: {
      type: import('vue').PropType<Position>
      required: true
      default: Position
    }
    labelStyle: {
      type: import('vue').PropType<any>
      default: () => {}
    }
    labelShowBg: {
      type: import('vue').PropType<boolean>
      default: boolean
    }
    labelBgStyle: {
      type: import('vue').PropType<any>
      default: () => {}
    }
    labelBgPadding: {
      type: import('vue').PropType<[number, number]>
    }
    labelBgBorderRadius: {
      type: import('vue').PropType<number>
    }
    style: {
      type: import('vue').PropType<import('vue').CSSProperties>
    }
    markerEnd: {
      type: import('vue').PropType<string>
      required: true
    }
    markerStart: {
      type: import('vue').PropType<string>
      required: true
    }
    sourceHandleId: {
      type: import('vue').PropType<string>
    }
    targetHandleId: {
      type: import('vue').PropType<string>
    }
    type: {
      type: import('vue').PropType<string>
      required: true
    }
    data: {
      type: import('vue').PropType<never>
      required: true
    }
    sourceNode: {
      type: import('vue').PropType<import('@vue-flow/core').GraphNode<any, any, string>>
      required: true
    }
    targetNode: {
      type: import('vue').PropType<import('@vue-flow/core').GraphNode<any, any, string>>
      required: true
    }
    updatable: {
      type: import('vue').PropType<boolean>
    }
    curvature: {
      type: import('vue').PropType<number>
    }
    interactionWidth: {
      type: import('vue').PropType<number>
    }
    events: {
      type: import('vue').PropType<import('@vue-flow/core').EdgeEventsOn<object>>
      required: true
    }
  },
  {},
  unknown,
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      label: {
        type: import('vue').PropType<
          | string
          | object
          | import('vue').VNode<
              import('vue').RendererNode,
              import('vue').RendererElement,
              {
                [key: string]: any
              }
            >
          | import('vue').Component<import('@vue-flow/core').EdgeTextProps>
        >
      }
      id: {
        type: import('vue').PropType<string>
        required: true
      }
      source: {
        type: import('vue').PropType<string>
        required: true
      }
      target: {
        type: import('vue').PropType<string>
        required: true
      }
      sourceX: {
        type: import('vue').PropType<number>
        required: true
      }
      sourceY: {
        type: import('vue').PropType<number>
        required: true
      }
      targetX: {
        type: import('vue').PropType<number>
        required: true
      }
      targetY: {
        type: import('vue').PropType<number>
        required: true
      }
      selected: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      animated: {
        type: import('vue').PropType<boolean>
      }
      sourcePosition: {
        type: import('vue').PropType<Position>
        required: true
        default: Position
      }
      targetPosition: {
        type: import('vue').PropType<Position>
        required: true
        default: Position
      }
      labelStyle: {
        type: import('vue').PropType<any>
        default: () => {}
      }
      labelShowBg: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      labelBgStyle: {
        type: import('vue').PropType<any>
        default: () => {}
      }
      labelBgPadding: {
        type: import('vue').PropType<[number, number]>
      }
      labelBgBorderRadius: {
        type: import('vue').PropType<number>
      }
      style: {
        type: import('vue').PropType<import('vue').CSSProperties>
      }
      markerEnd: {
        type: import('vue').PropType<string>
        required: true
      }
      markerStart: {
        type: import('vue').PropType<string>
        required: true
      }
      sourceHandleId: {
        type: import('vue').PropType<string>
      }
      targetHandleId: {
        type: import('vue').PropType<string>
      }
      type: {
        type: import('vue').PropType<string>
        required: true
      }
      data: {
        type: import('vue').PropType<never>
        required: true
      }
      sourceNode: {
        type: import('vue').PropType<import('@vue-flow/core').GraphNode<any, any, string>>
        required: true
      }
      targetNode: {
        type: import('vue').PropType<import('@vue-flow/core').GraphNode<any, any, string>>
        required: true
      }
      updatable: {
        type: import('vue').PropType<boolean>
      }
      curvature: {
        type: import('vue').PropType<number>
      }
      interactionWidth: {
        type: import('vue').PropType<number>
      }
      events: {
        type: import('vue').PropType<import('@vue-flow/core').EdgeEventsOn<object>>
        required: true
      }
    }>
  >,
  {
    selected: boolean
    sourcePosition: Position
    targetPosition: Position
    labelStyle: any
    labelShowBg: boolean
    labelBgStyle: any
  },
  {}
>
export default _default
