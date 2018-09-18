/// <reference types="react" />
/**
* Text.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of the cross-platform Text abstraction.
*/
import { ImportantForAccessibilityValue } from '../native-common/AccessibilityUtil';
import React = require('react');
import RN = require('react-native');
import { Text as TextBase, TextContext as TextContextBase } from '../native-common/Text';
import { FocusManagerFocusableComponent } from '../native-desktop/utils/FocusManager';
export interface TextContext extends TextContextBase {
    isRxParentAFocusableInSameFocusManager?: boolean;
}
export declare class Text extends TextBase implements React.ChildContextProvider<TextContext>, FocusManagerFocusableComponent {
    static contextTypes: React.ValidationMap<any>;
    private _selectedText;
    context: TextContext;
    static childContextTypes: React.ValidationMap<any>;
    protected _getExtendedProperties(): RN.ExtendedTextProps;
    private _onSelectionChange;
    requestFocus(): void;
    getChildContext(): TextContext;
    onFocus(): void;
    onBlur(): void;
    getTabIndex(): number;
    getImportantForAccessibility(): ImportantForAccessibilityValue | undefined;
    updateNativeAccessibilityProps(): void;
    getSelectedText(): string;
}
export default Text;
