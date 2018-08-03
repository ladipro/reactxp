import RX = require('../common/Interfaces');
import SyncTasks = require('synctasks');
export declare class Clipboard extends RX.Clipboard {
    setText(text: string): void;
    getText(): SyncTasks.Promise<string>;
    private static _createInvisibleNode;
    private static _copyNode;
}
declare const _default: Clipboard;
export default _default;
