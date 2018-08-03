/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of the cross-platform TextInput abstraction.
*/

import React = require('react');
import RN = require('react-native');
import Types = require('../common/Types');

import AccessibilityUtil, { ImportantForAccessibilityValue } from '../native-common/AccessibilityUtil';
import { applyFocusableComponentMixin, FocusManagerFocusableComponent } from '../native-desktop/utils/FocusManager';

import { TextInput as TextInputBase } from '../native-common/TextInput';

export class TextInput extends TextInputBase implements FocusManagerFocusableComponent {
    private _onFocusHandler: ((e: RN.NativeSyntheticEvent<RN.TextInputFocusEventData>) => void) | undefined;
    private _onBlurHandler: ((e: RN.NativeSyntheticEvent<RN.TextInputFocusEventData>) => void) | undefined;

    protected _render(props: RN.TextInputProps, onMount: (textInput: any) => void): JSX.Element {
        this._onFocusHandler = props.onFocus;
        this._onBlurHandler = props.onBlur;

        const extendedProps: RN.ExtendedTextInputProps = {
            tabIndex: this.getTabIndex()
        };

        return (
            <RN.TextInput
                { ...props }
                { ...extendedProps }
                ref={ onMount }
                importantForAccessibility={ this.getImportantForAccessibility() }
                onFocus={ this._onFocusEx }
                onBlur={ this._onBlurEx }
            />
        );
    }

    private _onFocusEx = (e: RN.NativeSyntheticEvent<RN.TextInputFocusEventData>) => {
        if (e.currentTarget === e.target) {
            this.onFocus();
        }

        if (this._onFocusHandler) {
            this._onFocusHandler(e);
        }
    }

    private _onBlurEx = (e: RN.NativeSyntheticEvent<RN.TextInputFocusEventData>) => {
        this.onBlur();

        if (this._onBlurHandler) {
            this._onBlurHandler(e);
        }
    }

    // From FocusManagerFocusableComponent interface
    //
    onFocus() {
        // Focus Manager hook
    }

    onBlur() {
        // Focus Manager hook
    }

    getTabIndex(): number {
        // Focus Manager may override this
        return this.props.tabIndex || 0;
    }

    getImportantForAccessibility(): ImportantForAccessibilityValue | undefined {
        // Focus Manager may override this

        // Note: currently native-common flavor doesn't pass any accessibility properties to RN.TextInput.
        // This should ideally be fixed.
        // We force a default of Auto if no property is provided
        return AccessibilityUtil.importantForAccessibilityToString(this.props.importantForAccessibility,
            Types.ImportantForAccessibility.Auto);
    }

    updateNativeAccessibilityProps(): void {
        if (this._mountedComponent) {
            let tabIndex = this.getTabIndex();
            let importantForAccessibility = this.getImportantForAccessibility();
            this._mountedComponent.setNativeProps({
                tabIndex: tabIndex,
                value: this.state.inputValue, // mandatory for some reason
                isTabStop: this.props.editable && tabIndex >= 0,
                importantForAccessibility: importantForAccessibility
            });
        }
    }
}

applyFocusableComponentMixin(TextInput);

export default TextInput;
