import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export interface NodeModifier {

    modifier(parseNode: ParseNodeDrawable): void
}