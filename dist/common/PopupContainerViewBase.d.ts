/**
* PopupContainerViewBase.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Common parent of all components rendered into a popup. Calls onShow and onHide
* callbacks when the popup is hidden (i.e. "closed" but still rendered as hidden)
* and re-shown. Abstract class to be overriden per platform.
*/
import React = require('react');
import Types = require('./Types');
import FocusManagerBase from './utils/FocusManager';
export interface PopupContainerViewBaseProps extends Types.CommonProps {
    hidden?: boolean;
}
export interface PopupContainerViewContext {
    focusManager?: FocusManagerBase;
}
export interface PopupComponent {
    onShow: () => void;
    onHide: () => void;
}
export declare abstract class PopupContainerViewBase<P extends PopupContainerViewBaseProps, S> extends React.Component<P, S> {
    static contextTypes: React.ValidationMap<any>;
    static childContextTypes: React.ValidationMap<any>;
    private _popupComponentStack;
    constructor(props: P, context: PopupContainerViewContext);
    getChildContext(): {
        focusManager: any;
        popupContainer: PopupContainerViewBase<P, S>;
    };
    registerPopupComponent(onShow: () => void, onHide: () => void): PopupComponent;
    unregisterPopupComponent(component: PopupComponent): void;
    isHidden(): boolean;
    componentDidUpdate(prevProps: P, prevState: S): void;
    abstract render(): JSX.Element;
}
export default PopupContainerViewBase;
