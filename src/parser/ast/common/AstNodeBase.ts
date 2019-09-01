import { Span } from './Span'

export interface AstNodeBase {
  kind: string,
  span: Span
}
