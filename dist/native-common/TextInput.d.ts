/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform TextInput abstraction.
*/
import React = require('react');
import RN = require('react-native');
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
    private _selectionToSet;
    private _selection;
    protected _mountedComponent: RN.ReactNativeBaseComponent<any, any> | null;
    constructor(props: Types.TextInputProps, context: TextInputContext);
    componentWillReceiveProps(nextProps: Types.TextInputProps): void;
    componentDidMount(): void;
    protected _render(props: RN.TextInputProps, onMount: (textInput: any) => void): JSX.Element;
    render(): JSX.Element;
    protected _onMount: (component: RN.ReactNativeBaseComponent<any, any> | null) => void;
    private _onFocus;
    private _onBlur;
    private _onChangeText;
    private _onSelectionChange;
    private _onKeyPress;
    private _onPaste;
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
