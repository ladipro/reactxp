/**
* Text.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Text abstraction.
*/
import React = require('react');
import PropTypes = require('prop-types');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
import { Text as TextBase } from '../common/Interfaces';
export interface TextContext {
    isRxParentAText: boolean;
    focusArbitrator?: FocusArbitratorProvider;
}
export declare class Text extends TextBase {
    static contextTypes: {
        focusArbitrator: PropTypes.Requireable<any> & PropTypes.Validator<any>;
    };
    context: TextContext;
    static childContextTypes: React.ValidationMap<any>;
    private _isMounted;
    getChildContext(): {
        isRxParentAText: boolean;
    };
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    _getStyles(): Types.TextStyleRuleSet;
    blur(): void;
    requestFocus(): void;
    focus(): void;
}
export default Text;
