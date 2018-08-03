/**
* RootView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* The top-most view that's used for proper layering or modals and popups.
*/
/// <reference types="react" />
import { RootView as RootViewBase, RootViewUsingProps as RootViewUsingPropsBase, BaseRootViewProps, RootViewPropsWithMainViewType, RootViewState, BaseRootView } from '../native-desktop/RootView';
declare class RootViewUsingStore extends RootViewBase {
    renderTopView(content: JSX.Element): JSX.Element;
    protected _renderAnnouncerView(): JSX.Element;
}
declare class RootViewUsingProps extends RootViewUsingPropsBase {
    renderTopView(content: JSX.Element): JSX.Element;
    protected _renderAnnouncerView(): JSX.Element;
}
export { BaseRootViewProps, RootViewPropsWithMainViewType, RootViewState, BaseRootView, RootViewUsingStore as RootView, RootViewUsingProps };
export default RootViewUsingStore;
