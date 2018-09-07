/**
* EventHelpers.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*/
import Types = require('../../common/Types');
export declare class EventHelpers {
    toKeyboardEvent(e: Types.SyntheticEvent): Types.KeyboardEvent;
    toFocusEvent(e: Types.SyntheticEvent): Types.FocusEvent;
    toMouseEvent(e: Types.SyntheticEvent): Types.MouseEvent;
    toDragEvent(e: Types.SyntheticEvent): Types.DragEvent;
    toMouseButton(nativeEvent: any): number;
    isRightMouseButton(e: Types.SyntheticEvent): boolean;
    keyboardToMouseEvent(e: Types.KeyboardEvent, layoutInfo: Types.LayoutInfo, contextMenuOffset: {
        x: number;
        y: number;
    }): Types.MouseEvent;
}
declare const _default: EventHelpers;
export default _default;
