/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseUrl", function() { return parseUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlQueryToString", function() { return urlQueryToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildUrl", function() { return buildUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendToQuery", function() { return appendToQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeObjectToUrlParam", function() { return encodeObjectToUrlParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeUrlParamToObject", function() { return decodeUrlParamToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIgnoreUrlFlag", function() { return setIgnoreUrlFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasIgnoreUrlFlag", function() { return hasIgnoreUrlFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return TimeoutError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTimeout", function() { return withTimeout; });
// import Axios, { AxiosRequestConfig } from 'axios'
// import { browser } from 'webextension-polyfill-ts'
// import { SubtitleSource } from '~/types'
function parseURLQuery(url) {
    return Object.fromEntries((url.match(/[?&]([^?&]*)/g) || []).map(el => {
        const match = el.match(/[?&]([^=]*)=?(.*)/) || [];
        return [
            decodeURIComponent(match[1]),
            decodeURIComponent(match[2]) || "true"
        ];
    }));
}
function parseUrl(url) {
    const urlParser = document.createElement("a");
    urlParser.href = url;
    return {
        url,
        protocol: urlParser.protocol,
        host: urlParser.host,
        port: urlParser.port,
        path: urlParser.pathname,
        hash: urlParser.hash,
        queryStr: urlParser.search,
        query: parseURLQuery(urlParser.search)
    };
}
function urlQueryToString(query) {
    return Object.entries(query)
        .filter((entry) => entry[1] !== undefined)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join("&");
}
function buildUrl(data) {
    const urlBuilder = document.createElement("a");
    if (data.url)
        urlBuilder.href = data.url;
    if (data.protocol)
        urlBuilder.protocol = data.protocol;
    if (data.host)
        urlBuilder.host = data.host;
    if (data.port)
        urlBuilder.port = data.port;
    if (data.path)
        urlBuilder.pathname = data.path;
    if (data.hash)
        urlBuilder.hash = data.hash;
    if (data.queryStr)
        urlBuilder.search = data.queryStr;
    if (data.query)
        urlBuilder.search = urlQueryToString(data.query);
    return urlBuilder.href;
}
function appendToQuery({ url, key, value }) {
    const query = parseURLQuery(url);
    query[key] = value;
    return buildUrl({ url, query });
}
function encodeObjectToUrlParam(obj) {
    return encodeURIComponent(btoa(escape(JSON.stringify(obj))));
}
function decodeUrlParamToObject(urlParam) {
    return JSON.parse(unescape(atob(decodeURIComponent(urlParam))));
}
function setIgnoreUrlFlag(url) {
    return appendToQuery({ url, key: "ov-ignore", value: "true" });
}
function hasIgnoreUrlFlag(url) {
    return parseURLQuery(url)["ov-ignore"] === "true";
}
function sleep(millis) {
    return new Promise(resolve => {
        window.setTimeout(() => {
            resolve();
        }, millis);
    });
}
// eslint-disable-next-line max-params
class TimeoutError extends Error {
    constructor(timeout) {
        super(`Timeout after ${timeout}ms!`);
        this.timeout = timeout;
    }
}
function withTimeout(promise, timeout = 10000) {
    return Promise.race([
        promise,
        (async () => {
            await sleep(timeout);
            throw new TimeoutError(timeout);
        })()
    ]);
}


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateHash", function() { return generateHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToError", function() { return convertToError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addRefererToUrl", function() { return addRefererToUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRefererFromUrl", function() { return getRefererFromUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRefererInUrl", function() { return isRefererInUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideRefererFromUrl", function() { return hideRefererFromUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRefererHiddenFromUrl", function() { return isRefererHiddenFromUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDocumentTreeParsed", function() { return isDocumentTreeParsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocumentHtml", function() { return getDocumentHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchNull", function() { return matchNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchError", function() { return matchError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTracksFromHTML", function() { return getTracksFromHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpackJS", function() { return unpackJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAttributeListener", function() { return addAttributeListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "awaitAttributeValue", function() { return awaitAttributeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axiosSave", function() { return axiosSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axiosSaveGet", function() { return axiosSaveGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axiosReferer", function() { return axiosReferer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axiosRefererGet", function() { return axiosRefererGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmbedded", function() { return isEmbedded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAbsoluteUrl", function() { return getAbsoluteUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUrlRefSave", function() { return makeUrlRefSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUrlNoRefSave", function() { return makeUrlNoRefSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeVideoDataSave", function() { return makeVideoDataSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onNodeInserted", function() { return onNodeInserted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cast", function() { return cast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lookupCSS", function() { return lookupCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectFunctionIntoPage", function() { return injectFunctionIntoPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWebPageUrl", function() { return getWebPageUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebPageUrl", function() { return isWebPageUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlayerUrl", function() { return getPlayerUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNoVideoUrl", function() { return getNoVideoUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPatreonUrl", function() { return getPatreonUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVideoPopupUrl", function() { return getVideoPopupUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLibraryUrl", function() { return getLibraryUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRatingUrl", function() { return getRatingUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSupportUrl", function() { return getSupportUrl; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseUrl", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["parseUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlQueryToString", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["urlQueryToString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildUrl", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["buildUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendToQuery", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["appendToQuery"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeObjectToUrlParam", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["encodeObjectToUrlParam"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeUrlParamToObject", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["decodeUrlParamToObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setIgnoreUrlFlag", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["setIgnoreUrlFlag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasIgnoreUrlFlag", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["hasIgnoreUrlFlag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["sleep"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["TimeoutError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withTimeout", function() { return _openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["withTimeout"]; });




function generateHash() {
    const ts = Math.round(+new Date() / 1000.0);
    const rand = Math.round(Math.random() * 2147483647);
    return [rand, ts].join('.');
}
function convertToError(e) {
    if (e instanceof Error) {
        return e;
    }
    else if (typeof e === 'string') {
        return new Error(e);
    }
    else {
        const result = JSON.stringify(e);
        if (result) {
            return new Error(result);
        }
        else if (typeof e.toString === 'function') {
            return new Error(e.toString());
        }
        else {
            return new Error('Unknown Error!');
        }
    }
}
function addRefererToUrl({ url, referer }) {
    return Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["appendToQuery"])({ url, key: 'ovreferer', value: btoa(referer) });
}
function getRefererFromUrl(url) {
    const { ovreferer } = Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["parseUrl"])(url).query;
    if (ovreferer) {
        return atob(ovreferer);
    }
    else {
        return null;
    }
}
function isRefererInUrl(url) {
    const { ovreferer, OVReferer } = Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["parseUrl"])(url).query;
    return !!ovreferer || !!OVReferer;
}
function hideRefererFromUrl(url) {
    return Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["appendToQuery"])({ url, key: 'ovhideref', value: 'true' });
}
function isRefererHiddenFromUrl(url) {
    const { ovhideref, OVHideRef } = Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["parseUrl"])(url).query;
    return !!ovhideref || !!OVHideRef;
}
function isDocumentTreeParsed() {
    return new Promise((resolve) => {
        const one = () => {
            if (['interactive', 'complete'].includes(document.readyState)) {
                document.removeEventListener('readystatechange', one);
                resolve();
            }
        };
        document.addEventListener('readystatechange', one);
        one();
    });
}
async function getDocumentHtml() {
    await isDocumentTreeParsed();
    return document.documentElement.innerHTML;
}
function matchNull({ str, regexp, index }) {
    return (str.match(regexp) || [])[index || 1] || '';
}
function matchError({ str, regexp }) {
    const match = str.match(regexp);
    if (!match) {
        throw new Error(`No match found for '${regexp}'!`);
    }
    return match;
}
function getTracksFromHTML(html) {
    const subtitleTags = html.match(/<track(.*)\/>/g) || [];
    const subtitles = [];
    for (const subtitleTag of subtitleTags) {
        const label = matchNull({ str: subtitleTag, regexp: /label="([^"]*)"/ });
        const src = matchNull({ str: subtitleTag, regexp: /src="([^"]*)"/ });
        if (src) {
            subtitles.push({
                kind: 'captions',
                label,
                src,
                default: subtitleTag.includes('default')
            });
        }
    }
    return subtitles;
}
function unpackJS(source) {
    function getUnbase(base) {
        let ALPHABET = '';
        if (base > 62)
            ALPHABET =
                ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~';
        else if (base > 54)
            ALPHABET =
                '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        else if (base > 52)
            ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQR';
        else
            ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP';
        return function (val) {
            if (base >= 2 && base <= 36) {
                return parseInt(val, base);
            }
            else {
                const valArray = val.split('').reverse();
                let ret = 0;
                for (let i = 0; i < valArray.length; i++) {
                    // eslint-disable-next-line prefer-destructuring
                    const cipher = valArray[i];
                    ret += base ** i * ALPHABET.indexOf(cipher);
                }
                return ret;
            }
        };
    }
    const out = source.match(/}\('(.*)', *(\d+), *(\d+), *'(.*?)'\.split\('\|'\)/) || [];
    // Payload
    const [, payload] = out;
    // Words
    const symtab = out[4].split(/\|/);
    // Radix
    const radix = parseInt(out[2]);
    // Words Count
    const count = parseInt(out[3]);
    if (count !== symtab.length) {
        throw new Error('Malformed p.a.c.k.e.r symtab !');
    }
    const unbase = getUnbase(radix);
    function lookup(matches) {
        const word = matches;
        // eslint-disable-next-line prefer-destructuring
        const ub = symtab[unbase(word)];
        const ret = ub || word;
        return ret;
    }
    let result = payload.replace(/\b\w+\b/g, lookup);
    result = result.replace(/\\/g, '');
    return result;
}
function addAttributeListener({ elem, attribute, callback }) {
    const observer = new MutationObserver(function (records) {
        for (const record of records) {
            if ((record.attributeName || '').toLowerCase() === attribute.toLowerCase()) {
                callback({
                    attribute,
                    value: elem.getAttribute(attribute),
                    lastValue: record.oldValue,
                    elem
                });
            }
        }
    });
    observer.observe(elem, { attributes: true });
    return observer;
}
function awaitAttributeValue({ elem, attribute, wantedValue }) {
    return new Promise((resolve) => {
        const obs = addAttributeListener({
            elem,
            attribute,
            callback({ value }) {
                if (value === wantedValue) {
                    obs.disconnect();
                    resolve();
                }
            }
        });
    });
}
function axiosSave(config) {
    if (config.url) {
        config.url = hideRefererFromUrl(config.url);
    }
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.request(config);
}
function axiosSaveGet(config) {
    config.method = 'GET';
    return axiosSave(config);
}
function axiosReferer(config) {
    if (config.url) {
        config.url = addRefererToUrl({ url: config.url, referer: config.referer });
    }
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.request(config);
}
function axiosRefererGet(config) {
    config.method = 'GET';
    return axiosReferer(config);
}
function isEmbedded() {
    return window.self !== window.top;
}
function getAbsoluteUrl(url) {
    const a = document.createElement('a');
    a.href = url;
    return a.href;
}
function makeUrlRefSave(url) {
    if (!url || url.indexOf('data:') === 0) {
        return url;
    }
    url = getAbsoluteUrl(url);
    return addRefererToUrl({ url, referer: location.href });
}
function makeUrlNoRefSave(url) {
    if (!url || url.indexOf('data:') === 0) {
        return url;
    }
    url = getAbsoluteUrl(url);
    return hideRefererFromUrl(url);
}
function makeVideoDataSave(videoData) {
    if ('origin' in videoData) {
        videoData.origin.icon = makeUrlRefSave(videoData.origin.icon);
        if (videoData.origin.icon.length > 1000) {
            videoData.origin.icon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["parseUrl"])(videoData.origin.url).host}`;
        }
    }
    if ('parent' in videoData && videoData.parent) {
        videoData.parent.icon = addRefererToUrl({
            url: videoData.parent.icon,
            referer: videoData.parent.url
        });
        if (videoData.parent.icon.length > 1000) {
            videoData.parent.icon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["parseUrl"])(videoData.parent.url).host}`;
        }
    }
    if (videoData.poster) {
        videoData.poster = makeUrlRefSave(videoData.poster);
        if (videoData.poster.length > 1000) {
            videoData.poster = undefined;
        }
    }
    const srcCB = (src) => {
        src.src = makeUrlRefSave(src.src);
        if (src.dlsrc) {
            src.dlsrc.src = makeUrlRefSave(src.dlsrc.src);
        }
        return src;
    };
    videoData.src = videoData.src.map(srcCB);
    videoData.tracks = videoData.tracks.map(srcCB);
    return videoData;
}
function onNodeInserted({ target, handler }) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            Array.from(mutation.addedNodes).forEach(handler);
        });
    });
    observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
    return observer;
}
function cast() {
    return (t) => t;
}
function lookupCSS({ attr, value, callback }) {
    Array.from(document.styleSheets).forEach((styleSheet) => {
        if (styleSheet instanceof CSSStyleSheet) {
            Array.from(styleSheet.cssRules).forEach((cssRule) => {
                if (cssRule instanceof CSSStyleRule) {
                    if (attr && value) {
                        const match = cssRule.style.getPropertyValue(attr).match(value);
                        if (match) {
                            callback({ cssRule, attr, value, match });
                        }
                    }
                    else if (value) {
                        Array.from(cssRule.style).forEach((attr) => {
                            const match = cssRule.style.getPropertyValue(attr).match(value);
                            if (match) {
                                callback({ cssRule, attr, value, match });
                            }
                        });
                    }
                    else {
                        callback({ cssRule, attr: null, value: null, match: [] });
                    }
                }
            });
        }
    });
}
function injectFunctionIntoPage({ script, data }) {
    return new Promise((resolve) => {
        const hash = generateHash();
        function createSend(hash) {
            return function sendResponse(data) {
                const ev = new CustomEvent('ov-script-msg', {
                    detail: {
                        hash,
                        data
                    }
                });
                document.dispatchEvent(ev);
            };
        }
        document.addEventListener('ov-script-msg', function one(ev) {
            const event = ev;
            if (event.detail.hash === hash) {
                document.removeEventListener('ov-script-msg', one);
                resolve(event.detail.data);
            }
        });
        const scriptTag = document.createElement('script');
        scriptTag.innerHTML = `(async function(){
            const script = ${script};
            const sendResponse = (${createSend})(${JSON.stringify(hash)});
            const rsp = await script(${JSON.stringify(data)});
            sendResponse(rsp);
        })();`;
        (document.body || document.head || document.documentElement).appendChild(scriptTag);
    });
}
function getWebPageUrl(url) {
    return `https://openvideofs.github.io${url}`;
}
function isWebPageUrl(url) {
    return (url.includes('://openvideofs.github.io') || url.includes('://localhost'));
}
function getPlayerUrl(videoData) {
    const playerUrl = getWebPageUrl('/watch/');
    if (videoData) {
        return `${playerUrl}?videodata=${Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["encodeObjectToUrlParam"])(videoData)}`;
    }
    return playerUrl;
}
function getNoVideoUrl(url) {
    const noVideoUrl = getWebPageUrl('/novideo/');
    return url ? `${noVideoUrl}?url=${Object(_openvideofs_utils_utils__WEBPACK_IMPORTED_MODULE_1__["encodeObjectToUrlParam"])(url)}` : noVideoUrl;
}
function getPatreonUrl() {
    return 'https://www.patreon.com/join/openvideo?';
}
function getVideoPopupUrl() {
    return getWebPageUrl('/videopopup/');
}
function getLibraryUrl() {
    return getWebPageUrl('/search/');
}
function getRatingUrl() {
    return 'https://chrome.google.com/webstore/detail/dadggmdmhmfkpglkfpkjdmlendbkehoh/reviews';
}
function getSupportUrl() {
    return 'https://chrome.google.com/webstore/detail/dadggmdmhmfkpglkfpkjdmlendbkehoh/support';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var bind = __webpack_require__(12);
var Axios = __webpack_require__(14);
var mergeConfig = __webpack_require__(32);
var defaults = __webpack_require__(20);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(33);
axios.CancelToken = __webpack_require__(34);
axios.isCancel = __webpack_require__(19);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(35);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(12);
var isBuffer = __webpack_require__(13);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var buildURL = __webpack_require__(15);
var InterceptorManager = __webpack_require__(16);
var dispatchRequest = __webpack_require__(17);
var mergeConfig = __webpack_require__(32);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var transformData = __webpack_require__(18);
var isCancel = __webpack_require__(19);
var defaults = __webpack_require__(20);
var isAbsoluteURL = __webpack_require__(30);
var combineURLs = __webpack_require__(31);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(11);
var normalizeHeaderName = __webpack_require__(22);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(23);
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(23);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(21)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var settle = __webpack_require__(24);
var buildURL = __webpack_require__(15);
var parseHeaders = __webpack_require__(27);
var isURLSameOrigin = __webpack_require__(28);
var createError = __webpack_require__(25);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(29);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(25);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(26);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(33);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onVideoFound", function() { return onVideoFound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractVideoSearcher", function() { return AbstractVideoSearcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoSearcherRegistry", function() { return VideoSearcherRegistry; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

const onVideoFound = {
    listen: (handler) => {
        document.addEventListener('OV_VIDEO_FOUND', (event) => {
            if (event instanceof CustomEvent) {
                handler(event.detail);
            }
        });
    },
    send: (data) => {
        const ev = new CustomEvent('OV_VIDEO_FOUND', {
            detail: data
        });
        document.dispatchEvent(ev);
    }
};
class AbstractVideoSearcher {
    async handleVideoDataFound(data) {
        if (data.src.length > 0) {
            console.log(`${this.name} found a video!`);
            const saveData = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeVideoDataSave"])(data);
            onVideoFound.send(saveData);
        }
    }
    get name() {
        return this.constructor.name;
    }
}
class VideoSearcherRegistry {
    constructor(...searcher) {
        this.searcher = searcher.map((Ctor) => new Ctor());
    }
    search() {
        this.searcher
            .filter((searcher) => searcher.canSearch())
            .forEach((searcher) => {
            console.log(`${searcher.name} starts searching...`);
            searcher.search();
        });
    }
}


/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_video_searcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var _assets_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _topPageStyles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67);
/* harmony import */ var _topPageStyles_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_topPageStyles_scss__WEBPACK_IMPORTED_MODULE_2__);



class VideoJSSearcher extends _assets_video_searcher__WEBPACK_IMPORTED_MODULE_0__["AbstractVideoSearcher"] {
    canSearch() {
        return 'videojs' in window && 'players' in window.videojs;
    }
    getSrces(player) {
        let hash;
        if (player.getGroupedSrc) {
            // eslint-disable-next-line max-params
            hash = Object.values(player.getGroupedSrc().label).reduce((arr, srces) => {
                return arr.concat(srces);
            }, []);
        }
        else if (player.options_.sources && player.options_.sources.length > 0) {
            hash = player.options_.sources;
        }
        else if (player.getCache().sources) {
            hash = player.getCache().sources;
        }
        else if (player.getCache().source) {
            hash = player.getCache().source;
        }
        else if (player.getCache().src) {
            hash = [player.getCache()];
        }
        else {
            hash = [{ src: player.src(), type: 'video/mp4', label: 'SD' }];
        }
        if (!Array.isArray(hash)) {
            hash = [hash];
        }
        for (const elem of hash) {
            if (elem['data-res']) {
                elem.label = elem['data-res'];
            }
            if (!elem.type) {
                elem.type = 'video/mp4';
            }
        }
        return hash;
    }
    getTracks(player) {
        const tracks = [];
        for (let i = 0; i < player.textTracks().length; i++) {
            const textTrack = player.textTracks()[i];
            const track = {
                src: '',
                kind: '',
                language: '',
                label: '',
                default: false,
                cues: []
            };
            const options = textTrack.options_ || textTrack.options;
            const cues = textTrack.cues_ || textTrack.cues;
            if (options && options.src) {
                track.src = options.src;
            }
            else if (cues && cues.length !== 0) {
                for (const cue of cues) {
                    track.cues.push({
                        startTime: cue.startTime,
                        endTime: cue.endTime,
                        text: cue.text,
                        id: '',
                        pauseOnExit: false
                    });
                }
            }
            else {
                break;
            }
            if (typeof textTrack.kind === 'function') {
                track.kind = textTrack.kind();
                track.language = textTrack.language();
                track.label = textTrack.label();
                if (textTrack.default) {
                    track.default = textTrack.default();
                }
            }
            else {
                track.kind = textTrack.kind;
                track.language = textTrack.language;
                track.label = textTrack.label;
                track.default = textTrack.default;
            }
            tracks.push(track);
        }
        return tracks;
    }
    getPlayers() {
        if (this.canSearch()) {
            return window.videojs.players;
        }
        return null;
    }
    extractData(player) {
        const srces = this.getSrces(player);
        const tracks = this.getTracks(player);
        this.handleVideoDataFound({
            src: srces,
            tracks,
            poster: player.poster(),
            title: document.title
        });
    }
    setupPlayer(player) {
        player.on('loadedmetadata', () => {
            this.extractData(player);
        });
        this.extractData(player);
    }
    search() {
        const players = this.getPlayers();
        for (const name in players) {
            this.setupPlayer(players[name]);
        }
        if (window.videojs.hook) {
            ;
            window.videojs.hook('setup', (player) => {
                this.setupPlayer(player);
            });
        }
    }
}
class JWPlayerSearcher extends _assets_video_searcher__WEBPACK_IMPORTED_MODULE_0__["AbstractVideoSearcher"] {
    canSearch() {
        return !!window.jwplayer;
    }
    getSrces(player) {
        return player.getPlaylist()[0].sources.map(function (src) {
            return {
                src: src.file,
                type: src.type === 'hls' ? 'application/x-mpegURL' : `video/${src.type}`,
                label: src.label || 'SD'
            };
        });
    }
    getTracks(player) {
        return player.getPlaylist()[0].tracks.map((track) => {
            return {
                src: track.file,
                label: track.label,
                kind: track.kind,
                language: track.language,
                default: track.default,
                cues: track.cues
            };
        });
    }
    getPlayers() {
        const arr = [];
        for (let i = 0, player = window.jwplayer(0); player.on; player = window.jwplayer(++i)) {
            arr.push(player);
        }
        return arr;
    }
    extractData(player) {
        this.handleVideoDataFound({
            src: this.getSrces(player),
            tracks: this.getTracks(player),
            poster: player.getPlaylist()[0].image,
            title: document.title
        });
    }
    setupPlayer(player) {
        player.on('meta', () => {
            this.extractData(player);
        });
        this.extractData(player);
        player.isSetup = true;
    }
    search() {
        for (const player of this.getPlayers()) {
            this.setupPlayer(player);
        }
        Object(_assets_utils__WEBPACK_IMPORTED_MODULE_1__["onNodeInserted"])({
            target: document,
            handler: (target) => {
                if (target instanceof HTMLElement) {
                    if (target instanceof HTMLVideoElement ||
                        target.getElementsByTagName('video').length > 0) {
                        for (const player of this.getPlayers()) {
                            if (!player.isSetup) {
                                this.setupPlayer(player);
                            }
                        }
                    }
                }
            }
        });
    }
}
class HTMLVideoSearcher extends _assets_video_searcher__WEBPACK_IMPORTED_MODULE_0__["AbstractVideoSearcher"] {
    canSearch() {
        return true;
    }
    getSrces(videoNode) {
        const srces = Array.from(videoNode.getElementsByTagName('source')).map((source) => {
            const hash = {
                src: source.src,
                type: source.type,
                label: 'SD'
            };
            if (source.hasAttribute('label')) {
                hash.label = source.getAttribute('label');
            }
            else if (source.dataset.res) {
                hash.label = source.dataset.res;
            }
            if (source.hasAttribute('default')) {
                hash.default = true;
            }
            return hash;
        });
        if (srces.length === 0 && videoNode.src) {
            return [
                {
                    src: videoNode.src,
                    type: 'video/mp4',
                    label: 'SD'
                }
            ];
        }
        return srces;
    }
    getTracks(videoNode) {
        return Array.from(videoNode.getElementsByTagName('track')).map((track) => ({
            src: track.src,
            kind: track.kind,
            label: track.label,
            default: track.default,
            language: track.lang
        }));
    }
    extractVideoData(videoNode) {
        this.handleVideoDataFound({
            src: this.getSrces(videoNode),
            tracks: this.getTracks(videoNode),
            poster: videoNode.poster,
            title: document.title
        });
    }
    setupPlayer(videoNode) {
        this.extractVideoData(videoNode);
        videoNode.addEventListener('loadedmetadata', () => {
            this.extractVideoData(videoNode);
        });
    }
    search() {
        Array.from(document.getElementsByTagName('video')).forEach((video) => {
            this.setupPlayer(video);
        });
        Object(_assets_utils__WEBPACK_IMPORTED_MODULE_1__["onNodeInserted"])({
            target: document,
            handler: (target) => {
                if (target instanceof HTMLElement) {
                    if (target instanceof HTMLVideoElement) {
                        this.setupPlayer(target);
                    }
                    else {
                        Array.from(target.getElementsByTagName('video')).forEach((video) => {
                            this.setupPlayer(video);
                        });
                    }
                }
            }
        });
    }
}
const registry = new _assets_video_searcher__WEBPACK_IMPORTED_MODULE_0__["VideoSearcherRegistry"](VideoJSSearcher, JWPlayerSearcher, HTMLVideoSearcher);
registry.search();


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(68);
            var content = __webpack_require__(69);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = {};

function modulesToDom(moduleId, list, options) {
  for (var i = 0; i < list.length; i++) {
    var part = {
      css: list[i][1],
      media: list[i][2],
      sourceMap: list[i][3]
    };

    if (stylesInDom[moduleId][i]) {
      stylesInDom[moduleId][i](part);
    } else {
      stylesInDom[moduleId].push(addStyle(part, options));
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (moduleId, list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  moduleId = options.base ? moduleId + options.base : moduleId;
  list = list || [];

  if (!stylesInDom[moduleId]) {
    stylesInDom[moduleId] = [];
  }

  modulesToDom(moduleId, list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    if (!stylesInDom[moduleId]) {
      stylesInDom[moduleId] = [];
    }

    modulesToDom(moduleId, newList, options);

    for (var j = newList.length; j < stylesInDom[moduleId].length; j++) {
      stylesInDom[moduleId][j]();
    }

    stylesInDom[moduleId].length = newList.length;

    if (stylesInDom[moduleId].length === 0) {
      delete stylesInDom[moduleId];
    }
  };
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(70);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".OpenVideo {\n  display: none !important;\n  visibility: hidden !important; }\n\n.ov-video-popup, .ov-theatre-mode {\n  position: fixed !important;\n  top: 0px !important;\n  left: 0px !important;\n  bottom: 0px !important;\n  right: 0px !important;\n  width: 100% !important;\n  height: 100% !important;\n  border: none !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  overflow: hidden !important;\n  z-index: 999999999999999 !important; }\n\n.ov-theater-mode {\n  background: rgba(0, 0, 0, 0.95) !important;\n  pointer-events: none;\n  transition: opacity 0.3s;\n  opacity: 0;\n  display: block;\n  cursor: default; }\n\n.ov-iframe-theaterMode {\n  position: fixed !important;\n  width: 70vw !important;\n  height: calc(( 9/ 16)*70vw) !important;\n  top: calc((100vh - ( 9/ 16)*70vw)/2) !important;\n  left: calc((100vw - 70vw)/2) !important;\n  z-index: 2147483646 !important; }\n\n.ov-theater-mode {\n  position: fixed !important;\n  left: 20vw !important;\n  top: 20vh !important;\n  width: 50vw !important;\n  height: calc(9/16*50vw) !important; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    for (var i = 0; i < modules.length; i++) {
      var item = [].concat(modules[i]);

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ })
/******/ ]);