import type { Context, FeatureOptions } from '../../types';
import type { MixpanelIdentitySDK } from '../../MixpanelIdentitySDK';
import { BaseFeature } from '../base/BaseFeature';
declare class PagingFeature extends BaseFeature {
    version: string;
    name: string;
    active: boolean;
    _client?: MixpanelIdentitySDK;
    _options: any;
    init(ctx: Context, options: FeatureOptions): void | Promise<any>;
    PreRequest(this: any, ctx: any): any;
    PreResult(this: any, ctx: any): void;
    _graphqlPreRequest(this: any, ctx: any, paging: any): void;
    _isList(this: any, ctx: any): boolean;
    _header(this: any, headers: any, name: string): any;
    _num(this: any, v: any): number | undefined;
}
export { PagingFeature };
