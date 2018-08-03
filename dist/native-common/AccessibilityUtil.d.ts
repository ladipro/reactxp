/**
* AccessibilityUtil.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of accessiblity functions for cross-platform
* ReactXP framework.
*/
import React = require('react');
import RN = require('react-native');
import { AccessibilityUtil as CommonAccessibilityUtil, AccessibilityPlatformUtil } from '../common/AccessibilityUtil';
export { ImportantForAccessibilityValue } from '../common/AccessibilityUtil';
import Types = require('../common/Types');
declare type AccessibilityLiveRegionValue = 'none' | 'polite' | 'assertive';
declare type AccessibilityComponentTypeValue = 'none' | 'button' | 'radiobutton_checked' | 'radiobutton_unchecked';
export declare class AccessibilityUtil extends CommonAccessibilityUtil {
    private _instance;
    setAccessibilityPlatformUtil(instance: AccessibilityPlatformUtil): void;
    accessibilityTraitToString(overrideTraits: Types.AccessibilityTrait | Types.AccessibilityTrait[] | undefined, defaultTrait?: Types.AccessibilityTrait, ensureDefaultTrait?: boolean): RN.AccessibilityTraits[];
    accessibilityComponentTypeToString(overrideTraits: Types.AccessibilityTrait | Types.AccessibilityTrait[] | undefined, defaultTrait?: Types.AccessibilityTrait): AccessibilityComponentTypeValue | undefined;
    accessibilityLiveRegionToString(liveRegion: Types.AccessibilityLiveRegion | undefined): AccessibilityLiveRegionValue | undefined;
    setAccessibilityFocus(component: React.Component<any, any>): void;
}
declare const _default: AccessibilityUtil;
export default _default;
