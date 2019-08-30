import { Location } from '../location'

export interface AstNodeBase {
  kind: string,
  span: {
    start: Location,
    end: Location
  }
}
