import { MixpanelIdentityEntityBase } from '../MixpanelIdentityEntityBase';
import type { MixpanelIdentitySDK } from '../MixpanelIdentitySDK';
import type { Control } from '../types';
import type { Identity, IdentityCreateData } from '../MixpanelIdentityTypes';
declare class IdentityEntity extends MixpanelIdentityEntityBase<Identity> {
    constructor(client: MixpanelIdentitySDK, entopts: any);
    make(this: IdentityEntity): IdentityEntity;
    create(this: any, reqdata?: IdentityCreateData, ctrl?: Control): Promise<IdentityEntity>;
}
export { IdentityEntity };
