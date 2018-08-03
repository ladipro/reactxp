/**
* FocusManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages focusable elements for better keyboard navigation (RN desktop version)
*/
import SubscribableEvent from 'subscribableevent';
import { FocusableComponent } from '../../common/Interfaces';
import { FocusManager as FocusManagerBase, FocusableComponentInternal as FocusableComponentInternalBase, StoredFocusableComponent as StoredFocusableComponentBase } from '../../common/utils/FocusManager';
import { ImportantForAccessibilityValue } from '../../native-common/AccessibilityUtil';
import { FocusableComponentStateCallback } from '../../common/utils/FocusManager';
export { FocusableComponentStateCallback };
export declare enum OverrideType {
    None = 0,
    Accessible = 1,
    Limited = 2
}
export interface StoredFocusableComponent extends StoredFocusableComponentBase {
    curOverrideType?: OverrideType;
}
export interface FocusManagerFocusableComponent {
    getTabIndex(): number | undefined;
    getImportantForAccessibility(): ImportantForAccessibilityValue | undefined;
    onFocus(): void;
    onBlur(): void;
    focus(): void;
    updateNativeAccessibilityProps(): void;
}
export interface FocusableComponentInternal extends FocusManagerFocusableComponent, FocusableComponentInternalBase {
    tabIndexOverride?: number;
    tabIndexLocalOverride?: number;
    tabIndexLocalOverrideTimer?: number;
    importantForAccessibilityOverride?: string;
    onFocusSink?: () => void;
}
export interface FocusableComponentWrapped {
    component: FocusableComponent;
    isAvailable: () => boolean;
}
export declare class FocusManager extends FocusManagerBase {
    static onComponentFocus: SubscribableEvent<(component: FocusableComponentWrapped) => void>;
    static onComponentBlur: SubscribableEvent<(component: FocusableComponentWrapped) => void>;
    private static _runAfterArbitrationId;
    private static _lastFocusedProgrammatically;
    protected addFocusListenerOnComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected removeFocusListenerFromComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected focusComponent(component: FocusableComponentInternal): boolean;
    protected resetFocus(focusFirstWhenNavigatingWithKeyboard: boolean, callback?: () => void): void;
    protected _updateComponentFocusRestriction(storedComponent: StoredFocusableComponent): void;
    private static _updateComponentTabIndexAndIFAOverrides;
    static setLastFocusedProgrammatically(component: FocusableComponentInternal): void;
    static getLastFocusedProgrammatically(reset?: boolean): FocusableComponentInternal | undefined;
    static getFocusableComponentWrapped(component: FocusableComponentInternal): FocusableComponentWrapped | undefined;
}
export declare function applyFocusableComponentMixin(Component: any, isConditionallyFocusable?: Function, accessibleOnly?: boolean): void;
export default FocusManager;
