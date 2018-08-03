/**
* FocusManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages focusable elements for better keyboard navigation (web version)
*/
import { FocusManager as FocusManagerBase, FocusableComponentInternal, StoredFocusableComponent as StoredFocusableComponentBase } from '../../common/utils/FocusManager';
import { FocusableComponentStateCallback } from '../../common/utils/FocusManager';
export { FocusableComponentStateCallback };
export interface StoredFocusableComponent extends StoredFocusableComponentBase {
    origTabIndex?: number;
    origAriaHidden?: string;
    curTabIndex?: number;
    curAriaHidden?: boolean;
}
export declare class FocusManager extends FocusManagerBase {
    private static _setTabIndexTimer;
    private static _setTabIndexElement;
    private static _lastFocusedProgrammatically;
    private static _runAfterArbitrationId;
    static initListeners(): void;
    protected addFocusListenerOnComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected removeFocusListenerFromComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected focusComponent(component: FocusableComponentInternal): boolean;
    static setLastFocusedProgrammatically(element: HTMLElement | undefined): void;
    static getLastFocusedProgrammatically(reset?: boolean): HTMLElement | undefined;
    protected resetFocus(focusFirstWhenNavigatingWithKeyboard: boolean, callback?: () => void): void;
    protected _updateComponentFocusRestriction(storedComponent: StoredFocusableComponent): void;
    private static _setTabIndex;
    private static _setAriaHidden;
    static _sortFocusableComponentsByAppearance(components: StoredFocusableComponent[]): void;
}
export declare function applyFocusableComponentMixin(Component: any, isConditionallyFocusable?: Function): void;
export default FocusManager;
