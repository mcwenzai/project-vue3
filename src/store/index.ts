import { createPinia } from 'pinia'
import { useAuthStore } from './auth'
import { getObjectFromSessionStorage } from '@/utils/index';
const useStore = createPinia()
function initUserInfo(userInfo: { permCodeList: Iterable<unknown> | null | undefined; permCodeSet: Set<unknown>; } | null) {
    if (userInfo == null) userInfo = getObjectFromSessionStorage('userInfo', undefined);

    if (userInfo != null && userInfo.permCodeList != null && Array.isArray(userInfo.permCodeList)) {
        userInfo.permCodeSet = new Set(userInfo.permCodeList);
    }
    return userInfo;
}

export { initUserInfo, useAuthStore };

export default useStore