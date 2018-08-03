/**
* PopupContainerView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* The view containing the Popup to show. This view does its own position
* calculation on rendering as directed by position instructions received
* through properties.
*/
/// <reference types="react" />
import RN = require('react-native');
import Types = require('../common/Types');
import { PopupContainerViewBase, PopupContainerViewBaseProps, PopupContainerViewContext } from '../common/PopupContainerViewBase';
export interface PopupContainerViewProps extends PopupContainerViewBaseProps {
    popupOptions: Types.PopupOptions;
    anchorHandle?: number;
    onDismissPopup?: () => void;
}
export interface PopupContainerViewState {
    isMeasuringPopup: boolean;
    popupWidth: number;
    popupHeight: number;
    anchorPosition: Types.PopupPosition;
    anchorOffset: number;
    popupY: number;
    popupX: number;
    constrainedPopupWidth: number;
    constrainedPopupHeight: number;
}
export declare class PopupContainerView extends PopupContainerViewBase<PopupContainerViewProps, PopupContainerViewState> {
    private _mountedComponent;
    private _viewHandle;
    private _respositionPopupTimer;
    constructor(props: PopupContainerViewProps, context: PopupContainerViewContext);
    private _getInitialState;
    componentWillReceiveProps(prevProps: PopupContainerViewProps): void;
    componentDidUpdate(prevProps: PopupContainerViewProps, prevState: PopupContainerViewState): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    protected _onMount: (component: RN.ReactNativeBaseComponent<any, any> | null) => void;
    private _recalcPosition;
    private _recalcPositionFromLayoutData;
    private _recalcInnerPosition;
    private _dismissPopup;
    private _startRepositionPopupTimer;
    private _stopRepositionPopupTimer;
}
export default PopupContainerView;
