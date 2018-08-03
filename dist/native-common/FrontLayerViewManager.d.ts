/**
* FrontLayerViewManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages stackable modals and popup views that are posted and dismissed
* by the Types showModal/dismissModal/showPopup/dismissPopup methods.
*/
import React = require('react');
import SubscribableEvent from 'subscribableevent';
import Types = require('../common/Types');
export declare class FrontLayerViewManager {
    private _overlayStack;
    private _cachedPopups;
    event_changed: SubscribableEvent<() => void>;
    showModal(modal: React.ReactElement<Types.ViewProps>, modalId: string, options?: Types.ModalOptions): void;
    isModalDisplayed(modalId?: string): boolean;
    dismissModal(modalId: string): void;
    dismissAllmodals(): void;
    showPopup(popupOptions: Types.PopupOptions, popupId: string, delay?: number): boolean;
    dismissPopup(popupId: string): void;
    dismissAllPopups(): void;
    getModalLayerView(rootViewId?: string | null): React.ReactElement<any> | null;
    getActivePopupId(): string | null;
    releaseCachedPopups(): void;
    private modalOptionsMatchesRootViewId;
    private _renderPopup;
    getPopupLayerView(rootViewId?: string | null): JSX.Element | null;
    private _onBackgroundPressed;
    private _dismissActivePopup;
    private _findIndexOfModal;
    private _findIndexOfPopup;
    private _getActiveOverlay;
    isPopupDisplayed(popupId?: string): boolean;
}
declare const _default: FrontLayerViewManager;
export default _default;
