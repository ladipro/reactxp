/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform TextInput abstraction.
*/
import React = require('react');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
export interface TextInputState {
    inputValue: string;
    isFocused: boolean;
}
export interface TextInputContext {
    focusArbitrator?: FocusArbitratorProvider;
}
export declare class TextInput extends React.Component<Types.TextInputProps, TextInputState> {
    static contextTypes: React.ValidationMap<any>;
    context: TextInputContext;
    private _selectionStart;
    private _selectionEnd;
    private _mountedComponent;
    constructor(props: Types.TextInputProps, context: TextInputContext);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Types.TextInputProps): void;
    render(): JSX.Element;
    protected _onMount: (component: any) => void;
    private _onPaste;
    private _onFocus;
    private _onBlur;
    private _onChangeText;
    private _onSelectionChange;
    private _onKeyPress;
    private _onScroll;
    blur(): void;
    requestFocus(): void;
    focus(): void;
    setAccessibilityFocus(): void;
    isFocused(): boolean;
    selectAll(): void;
    selectRange(start: number, end: number): void;
    getSelectionRange(): {
        start: number;
        end: number;
    };
    setValue(value: string): void;
}
export default TextInput;
