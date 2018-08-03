/**
* Alert.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web Alert dialog boxes.
*/
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class Alert extends RX.Alert {
    private _modalId;
    show(title: string, message?: string, buttons?: Types.AlertButtonSpec[], options?: Types.AlertOptions): void;
}
declare const _default: Alert;
export default _default;
