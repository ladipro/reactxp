/// <reference types="react" />
import React = require('react');
import RN = require('react-native');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
export interface TextContext {
    isRxParentAText: boolean;
    focusArbitrator?: FocusArbitratorProvider;
    isRxParentAContextMenuResponder?: boolean;
}
export declare class Text extends React.Component<Types.TextProps, Types.Stateless> implements React.ChildContextProvider<TextContext> {
    static contextTypes: React.ValidationMap<any>;
    context: TextContext;
    static childContextTypes: React.ValidationMap<any>;
    protected _mountedComponent: RN.ReactNativeBaseComponent<any, any> | null;
    setNativeProps(nativeProps: RN.TextProps): void;
    render(): JSX.Element;
    componentDidMount(): void;
    protected _onMount: (component: any) => void;
    private _onPress;
    private _onSelectionChange;
    getChildContext(): {
        isRxParentAText: boolean;
    };
    protected _getStyles(): Types.StyleRuleSetRecursiveArray<Types.TextStyleRuleSet>;
    requestFocus(): void;
    focus(): void;
    blur(): void;
}
export default Text;
