/**
* Text.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Android-specific implementation of Text component.
*/
/// <reference types="react" />
import { Text as CommonText } from '../native-common/Text';
import Types = require('../common/Types');
export declare class Text extends CommonText {
    protected _getStyles(): Types.StyleRuleSetRecursiveArray<Types.TextStyleRuleSet>;
    render(): JSX.Element;
}
export default Text;
