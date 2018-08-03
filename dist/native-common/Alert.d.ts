/**
* Alert.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Native Alert dialog boxes for ReactXP.
*/
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class Alert implements RX.Alert {
    show(title: string, message?: string, buttons?: Types.AlertButtonSpec[], options?: RX.Types.AlertOptions): void;
}
declare const _default: Alert;
export default _default;
