/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "precache-manifest.febc5fbdcdc0a15e2c9a0d20f68c251c.js"
);

workbox.core.setCacheNameDetails({prefix: "seed-cache"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/.*\.js.*/i, new workbox.strategies.CacheFirst({ "cacheName":"seed-js", plugins: [new workbox.expiration.Plugin({ maxEntries: 20, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/.*css.*/, new workbox.strategies.CacheFirst({ "cacheName":"seed-css", plugins: [new workbox.expiration.Plugin({ maxEntries: 30, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/.*(png|svga).*/, new workbox.strategies.CacheFirst({ "cacheName":"seed-image", plugins: [new workbox.expiration.Plugin({ maxEntries: 30, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
