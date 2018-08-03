/**
* ViewBase.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Base class that is used for several RX views.
*/
/// <reference types="react" />
import RN = require('react-native');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare abstract class ViewBase<P extends Types.ViewProps, S> extends RX.ViewBase<P, S> {
    private static _defaultViewStyle;
    private _layoutEventValues;
    abstract render(): JSX.Element;
    protected _nativeView: RN.View | undefined;
    static setDefaultViewStyle(defaultViewStyle: Types.ViewStyleRuleSet): void;
    static getDefaultViewStyle(): RX.Types.StyleRuleSet<RX.Types.ViewStyle>;
    setNativeProps(nativeProps: RN.ViewProps): void;
    protected _setNativeView: (view: any) => void;
    protected _getStyles(props: Types.ViewProps): RX.Types.StyleRuleSetRecursive<RX.Types.StyleRuleSet<RX.Types.ViewStyle>>;
    protected _onLayout: (event: RN.LayoutChangeEvent) => void;
}
export default ViewBase;
