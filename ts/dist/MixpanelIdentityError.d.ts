import { Context } from './Context';
declare class MixpanelIdentityError extends Error {
    isMixpanelIdentityError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MixpanelIdentityError };
