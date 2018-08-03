/**
* Network.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Native implementation of network information APIs.
*/
import SyncTasks = require('synctasks');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class Network extends RX.Network {
    constructor();
    isConnected(): SyncTasks.Promise<boolean>;
    getType(): SyncTasks.Promise<Types.DeviceNetworkType>;
    private _onEventOccured;
    private static _getNetworkTypeFromNetInfo;
    private static _getNetworkTypeFromConnectionInfo;
}
declare const _default: Network;
export default _default;
