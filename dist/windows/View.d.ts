/**
* View.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Windows-specific implementation of View.
*/
import React = require('react');
import RN = require('react-native');
import Types = require('../common/Types');
import { ImportantForAccessibilityValue } from '../native-common/AccessibilityUtil';
import { View as ViewCommon, ViewContext as ViewContextCommon } from '../native-common/View';
import { FocusManagerFocusableComponent, FocusManager } from '../native-desktop/utils/FocusManager';
import PopupContainerView from '../native-common/PopupContainerView';
export interface ViewContext extends ViewContextCommon {
    isRxParentAText?: boolean;
    focusManager?: FocusManager;
    popupContainer?: PopupContainerView;
    isRxParentAContextMenuResponder?: boolean;
    isRxParentAFocusableInSameFocusManager?: boolean;
}
export declare class View extends ViewCommon implements React.ChildContextProvider<ViewContext>, FocusManagerFocusableComponent {
    static contextTypes: React.ValidationMap<any>;
    context: ViewContext;
    static childContextTypes: React.ValidationMap<any>;
    protected _getContextMenuOffset(): {
        x: number;
        y: number;
    };
    private _onKeyDown;
    private _onMouseEnter;
    private _onMouseLeave;
    private _onMouseOver;
    private _onMouseMove;
    private _focusableElement;
    private _focusManager;
    private _limitFocusWithin;
    private _isFocusLimited;
    private _isFocusRestricted;
    private _popupContainer;
    private _popupToken;
    constructor(props: Types.ViewProps, context: ViewContext);
    componentWillReceiveProps(nextProps: Types.ViewProps): void;
    enableFocusManager(): void;
    disableFocusManager(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private hasTrait;
    private _showContextMenu;
    protected _buildInternalProps(props: Types.ViewProps): void;
    render(): JSX.Element;
    private _onFocusableRef;
    requestFocus(): void;
    focus(): void;
    blur(): void;
    getChildContext(): ViewContext;
    private _isHidden;
    setFocusRestricted(restricted: boolean, callback?: () => void): void;
    setFocusLimited(limited: boolean): void;
    private _focusRestrictionCallback;
    setNativeProps(nativeProps: RN.ViewProps): void;
    protected _isButton(viewProps: Types.ViewProps): boolean;
    private _onFocusableKeyDown;
    private _onFocusableKeyUp;
    private _onFocus;
    private _onBlur;
    onFocus(): void;
    onBlur(): void;
    getTabIndex(): number | undefined;
    getImportantForAccessibility(): ImportantForAccessibilityValue | undefined;
    updateNativeAccessibilityProps(): void;
}
export default View;
