import { Span } from '../../location'

export interface AstNodeBase {
  kind: string,
  span: Span
}
