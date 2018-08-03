/**
* PopupContainerView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Common parent of all components rendered into a popup, web version.
*/
import React = require('react');
import { PopupContainerViewBase, PopupContainerViewBaseProps, PopupContainerViewContext } from '../common/PopupContainerViewBase';
import Types = require('../common/Types');
export interface PopupContainerViewProps extends PopupContainerViewBaseProps {
    style: React.CSSProperties;
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare class PopupContainerView extends PopupContainerViewBase<PopupContainerViewProps, Types.Stateless> {
    constructor(props: PopupContainerViewProps, context: PopupContainerViewContext);
    render(): JSX.Element;
}
export default PopupContainerView;
