/**
* ScrollView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of the cross-platform ScrollView abstraction.
*/
/// <reference types="react" />
import { ScrollView as ScrollViewBase } from '../native-common/ScrollView';
import Types = require('../common/Types');
export declare class ScrollView extends ScrollViewBase {
    protected _render(props: Types.ScrollViewProps): JSX.Element;
    private _onKeyDown;
}
export default ScrollView;
