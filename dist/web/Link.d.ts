/**
* Link.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Link abstraction.
*/
import PropTypes = require('prop-types');
import React = require('react');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
export interface LinkContext {
    focusArbitrator?: FocusArbitratorProvider;
}
export declare class Link extends React.Component<Types.LinkProps, Types.Stateless> {
    static contextTypes: {
        focusArbitrator: PropTypes.Requireable<any> & PropTypes.Validator<any>;
    };
    context: LinkContext;
    private _isMounted;
    private _longPressTimer;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    requestFocus(): void;
    focus(): void;
    blur(): void;
    _getStyles(): Types.LinkStyleRuleSet;
    private _onClick;
    private _onMouseDown;
    private _onMouseUp;
    private _onContextMenu;
}
export default Link;
