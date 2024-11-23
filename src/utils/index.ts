import JSEncrypt from 'jsencrypt';
import { dayjs } from 'element-plus';

/**
 * 从数组中查找某一项
 * @param {Array} list 要查找的数组
 * @param {String} id 要查找的节点id
 * @param {String} idKey 主键字段名（如果为null则直接比较）
 * @param {Boolean} removeItem 是否从数组中移除查找到的节点
 * @returns {Object} 找到返回节点，没找到返回undefined
 */
export function findItemFromList(list: any[], id: null, idKey: string | null, removeItem = false) {
  if (Array.isArray(list) && list.length > 0 && id != null) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (
        ((idKey == null || idKey === '') && item === id) ||
        (idKey != null && item[idKey] === id)
      ) {
        if (removeItem) list.splice(i, 1);
        return item;
      }
    }
  }
  return null;
}
/**
 * 将数据保存到sessionStorage
 * @param {*} key sessionStorage的键值
 * @param {*} value 要保存的数据
 */
export function setObjectToSessionStorage(key: string | null, value: null) {
  if (key == null || key === '') return false;
  if (value == null) {
    window.sessionStorage.removeItem(key);
    return true;
  } else {
    const jsonObj = {
      data: value
    };
    window.sessionStorage.setItem(key, JSON.stringify(jsonObj));
    return true;
  }
}
/**
 * 从sessionStorage里面获取数据
 * @param {String} key 键值
 * @param {*} defaultValue 默认值
 */
export function getObjectFromSessionStorage(key: string, defaultValue: any) {
  let jsonObj = null;
  try {
    jsonObj = JSON.parse(window.sessionStorage.getItem(key));
    jsonObj = (jsonObj || {}).data;
  } catch (e) {
    jsonObj = defaultValue;
  }
  return jsonObj != null ? jsonObj : defaultValue;
}

/**
 * 加密
 * @param {*} value 要加密的字符串
 */
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpC4QMnbTrQOFriJJCCFFWhlruBJThAEBfRk7pRx1jsAhyNVL3CqJb0tRvpnbCnJhrRAEPdgFHXv5A0RrvFp+5Cw7QoFH6O9rKB8+0H7+aVQeKITMUHf/XMXioymw6Iq4QfWd8RhdtM1KM6eGTy8aU7SO2s69Mc1LXefg/x3yw6wIDAQAB';
export function encrypt(value: string | null) {
  if (value == null || value === '') return null;
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encodeURIComponent(encrypt.encrypt(value));
}

export function getToken() {
  return sessionStorage.getItem('token');
}

export function setToken(token: string | null) {
  if (token == null || token === '') {
    sessionStorage.removeItem('token');
  } else {
    sessionStorage.setItem('token', token);
  }
}

export function getAppId() {
  const appId = sessionStorage.getItem('appId');
  return appId != null ? appId : undefined;
}

export function setAppId(appId: string | null) {
  if (appId == null || appId === '') {
    sessionStorage.removeItem('appId');
  } else {
    sessionStorage.setItem('appId', appId);
  }
}
