import type { CSSProperties } from 'vue'

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
    }
    animated: {
      type: import('vue').PropType<boolean>
    }
    sourcePosition: {
      type: import('vue').PropType<import('@vue-flow/core').Position>
      required: true
    }
    targetPosition: {
      type: import('vue').PropType<import('@vue-flow/core').Position>
      required: true
    }
    labelStyle: {
      type: import('vue').PropType<any>
    }
    labelShowBg: {
      type: import('vue').PropType<boolean>
    }
    labelBgStyle: {
      type: import('vue').PropType<any>
    }
    labelBgPadding: {
      type: import('vue').PropType<[number, number]>
    }
    labelBgBorderRadius: {
      type: import('vue').PropType<number>
    }
    style: {
      type: import('vue').PropType<CSSProperties>
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
    options: {
      type: import('vue').PropType<import('perfect-arrows').ArrowOptions>
      default: () => {
        padStart: number
        padEnd: number
        stretch: number
      }
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
      }
      animated: {
        type: import('vue').PropType<boolean>
      }
      sourcePosition: {
        type: import('vue').PropType<import('@vue-flow/core').Position>
        required: true
      }
      targetPosition: {
        type: import('vue').PropType<import('@vue-flow/core').Position>
        required: true
      }
      labelStyle: {
        type: import('vue').PropType<any>
      }
      labelShowBg: {
        type: import('vue').PropType<boolean>
      }
      labelBgStyle: {
        type: import('vue').PropType<any>
      }
      labelBgPadding: {
        type: import('vue').PropType<[number, number]>
      }
      labelBgBorderRadius: {
        type: import('vue').PropType<number>
      }
      style: {
        type: import('vue').PropType<CSSProperties>
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
      options: {
        type: import('vue').PropType<import('perfect-arrows').ArrowOptions>
        default: () => {
          padStart: number
          padEnd: number
          stretch: number
        }
      }
    }>
  >,
  {
    options: import('perfect-arrows').ArrowOptions
  },
  {}
>
export default _default
