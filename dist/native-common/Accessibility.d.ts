/**
* Accessibility.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Native wrapper for accessibility helper.
*/
import { Accessibility as CommonAccessibility } from '../common/Accessibility';
export declare class Accessibility extends CommonAccessibility {
    protected _isScreenReaderEnabled: boolean;
    constructor();
    protected _updateScreenReaderStatus(isEnabled: boolean): void;
    isScreenReaderEnabled(): boolean;
}
declare const _default: Accessibility;
export default _default;
