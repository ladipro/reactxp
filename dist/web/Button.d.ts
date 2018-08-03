/**
* Button.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Button abstraction.
*/
/// <reference types="react" />
import PropTypes = require('prop-types');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
import { Button as ButtonBase } from '../common/Interfaces';
export interface ButtonContext {
    hasRxButtonAscendant?: boolean;
    focusArbitrator?: FocusArbitratorProvider;
}
export declare class Button extends ButtonBase {
    static contextTypes: {
        hasRxButtonAscendant: PropTypes.Requireable<any> & PropTypes.Validator<any>;
        focusArbitrator: PropTypes.Requireable<any> & PropTypes.Validator<any>;
    };
    context: ButtonContext;
    static childContextTypes: {
        hasRxButtonAscendant: PropTypes.Requireable<any> & PropTypes.Validator<any>;
    };
    private _isMounted;
    private _lastMouseDownEvent;
    private _ignoreClick;
    private _longPressTimer;
    private _isMouseOver;
    private _isFocusedWithKeyboard;
    private _isHoverStarted;
    constructor(props: Types.ButtonProps, context: ButtonContext);
    getChildContext(): ButtonContext;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    requestFocus(): void;
    focus(): void;
    blur(): void;
    protected onClick: (e: Types.MouseEvent) => void;
    private _getStyles;
    private _onContextMenu;
    private _onMouseDown;
    private _onMouseUp;
    private _onMouseEnter;
    private _onMouseLeave;
    private _onFocus;
    private _onBlur;
    private _onHoverStart;
    private _onHoverEnd;
}
export default Button;
