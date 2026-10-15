// AvatarKit looks for its WASM next to the page; point it at /vendor/ instead.
(function(){var W='/vendor/avatar_core_wasm-36bf5449.wasm';var of=window.fetch.bind(window);window.fetch=function(i,o){var u=typeof i==='string'?i:(i&&i.url)||String(i);if(/avatar_core_wasm[^/]*\.wasm(\?|$)/.test(u)&&u.indexOf('/vendor/')<0)return of(W,o);return of(i,o);};})();
