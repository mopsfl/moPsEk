// ==UserScript==
// @name         moPsEk - CSGO MTSL 2
// @namespace    https://github.com/mopsfl/moPsEk
// @description  moPsEk for CSGO MTSL Case Clicker 2
// @author       mopsfl
// @version      0.0.4
// @license      MIT
// @match        *://csgo.mtsl.dk/*
// @icon         https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_download
// @grant        window.onurlchange
// @updateURL    https://github.com/mopsfl/moPsEk/raw/main/games/csgo.mtsl.dk/code.user.js
// @downloadURL  https://github.com/mopsfl/moPsEk/raw/main/games/csgo.mtsl.dk/code.user.js
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

!function () {
	'use strict';
	let t = {
			money: 240,
			tickets: 0,
			tokens: 0,
			xp: 0,
			stats: { creation: new Date().getTime() },
			inventory: [],
			upgrades: {},
			achievements: {},
			achievements_collected: {},
			luckyWheelWins: []
		}, e = {
			'=': '0',
			'!': '1',
			'?': '2',
			$: '3',
			'%': '4',
			'&': '5',
			'/': '6',
			'\\': '7',
			'-': '8',
			'+': '9'
		}, o = Object.keys(e).join(''), n = {
			0: '=',
			1: '!',
			2: '?',
			3: '$',
			4: '%',
			5: '&',
			6: '/',
			7: '\\',
			8: '-',
			9: '+'
		};
	function s() {
		return JSON.parse(a(localStorage.localsave));
	}
	function a(t) {
		let n = [], s = '';
		for (let a = 0; a < t.length; a++) {
			let i = t[a];
			i.match(/[A-Z]/) || o.includes(i) ? (s += o.includes(i) ? e[i] : i.toLowerCase(), n.push(parseInt(s, 36)), s = '') : s += i;
		}
		let a, i = {}, l = String.fromCharCode(n[0]), r = l, c = [l], d = 256;
		for (let t = 1; t < n.length; t++) {
			let e = n[t];
			a = e < 256 ? String.fromCharCode(n[t]) : i[e] ? i[e] : r + l, c.push(a), l = a[0], i[d] = r + l, d++, r = a;
		}
		return function (t) {
			return decodeURIComponent(t.split('').map(function (t) {
				return '%' + ('00' + t.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));
		}(c.join(''));
	}
	function i(t) {
		let e, o = {}, s = ((t = function (t) {
				return encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, function (t, e) {
					return String.fromCharCode('0x' + e);
				});
			}(t)) + '').split(''), a = [], i = s[0], l = 256;
		for (let t = 1; t < s.length; t++)
			e = s[t], null != o[i + e] ? i += e : (a.push(i.length > 1 ? o[i] : i.charCodeAt(0)), o[i + e] = l, l++, i = e);
		return a.push(i.length > 1 ? o[i] : i.charCodeAt(0)), a.map(t => {
			let e = t.toString(36);
			return e.substring(0, e.length - 1) + (e[e.length - 1].match(/[0-9]/) ? n[e[e.length - 1]] : e[e.length - 1].toUpperCase());
		}).join('');
	}
	let l = 0, r = 0;
	var c = [
		'bravo',
		'breakout',
		'brokenfang',
		'cs20',
		'csgoweapon',
		'csgoweapon2',
		'csgoweapon3',
		'falchion',
		'fracture',
		'gamma',
		'horizon',
		'huntsman',
		'phoenix',
		'prisma',
		'prisma2',
		'spectrum',
		'spectrum2',
		'winteroffensive',
		'snakebite',
		'gamma2',
		'clutch',
		'chroma',
		'chroma2',
		'chroma3',
		'shadow',
		'collections/assault',
		'collections/aztec',
		'collections/dust',
		'collections/inferno',
		'collections/militia',
		'collections/nuke',
		'collections/office',
		'collections/vertigo',
		'vanguard',
		'revolver',
		'wildfire',
		'glove',
		'hydra',
		'dangerzone',
		'shatteredweb',
		'collections/risingsun',
		'collections/stmarc',
		'collections/overpass',
		'collections/norse',
		'collections/mirage',
		'collections/cobblestone',
		'collections/havoc',
		'collections/godsandmonsters',
		'collections/alpha',
		'collections/ancient',
		'collections/baggage',
		'collections/bank',
		'collections/cache',
		'collections/canals',
		'collections/chopshop',
		'collections/control',
		'collections/dust2',
		'collections/dust22021',
		'collections/inferno2018',
		'collections/italy',
		'collections/lake',
		'collections/mirage2021',
		'collections/nuke2018',
		'collections/safehouse',
		'collections/train',
		'collections/train2021',
		'collections/vertigo2021',
		'riptide',
		'doppler-phases/phases',
		'esports2013',
		'esports2013winter',
		'esports2014summer',
		'dreamsandnightmares'
	];
	function d() {
		return i(JSON.stringify(t));
	}
	function u(t) {
		if (localStorage['moPsEk_' + localStorage._moPsEk_uuid] = d(), t)
			return location.reload();
	}
	function p(t, e) {
		console.info(`%c${ t }`, `background-color:black;padding:5px;border-left:solid 4px ${ e };color:white`);
	}
	function m(t, e, o) {
		if (!(t || e | o))
			return p('Could not create file. (Missing attr)', 'red');
		var n = document.createElement('a');
		n.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(o)), n.setAttribute('download', `${ t }.${ e }`), n.style.display = 'none', document.body.appendChild(n), n.click(), document.body.removeChild(n);
	}
	function g(t, e, o) {
		if (null == t)
			return;
		let n = document.createElement('div'), s = document.querySelector('.notifications');
		if (!n && !s)
			return p('Unable to create notification', 'red');
		s.classList.remove('hide'), n.classList.add('notification'), n.innerHTML = `<div class="notification-message"><span style="${ o ? 'color:' + o || 'inherit' : '' }">${ e ? '' : 'moPsEk: ' }${ t }</span></div><div class="notification-close"></div>`, n.querySelector('.notification-close').onclick = () => {
			n.remove();
		}, s.appendChild(n);
	}
	t = s(), 1 == GM_getValue('moPsEk.wipeData') && (localStorage.clear(), window.open('https://csgo.mtsl.dk/'), GM_setValue('moPsEk.wipeData', !1), window.close());
	try {
		p(`Initalizing moPsEk v.${ GM_info.script.version }`, 'yellow'), localStorage.getItem('_moPsEk_uuid') || (localStorage.setItem('_moPsEk_uuid', ([10000000] + -1000 + -4000 + -8000 + -100000000000).replace(/[018]/g, t => (t ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> t / 4).toString(16))), p('moPsEk client uuid created sucessfully!', 'green')), localStorage.getItem('moPsEk_' + localStorage._moPsEk_uuid) || (localStorage.setItem('moPsEk_' + localStorage._moPsEk_uuid, d(s())), p('moPsEk client savedata created sucessfully!', 'green')), function (e) {
			if (!e || null == e)
				return;
			const o = {
				money: e.money,
				xp: e.xp,
				tokens: e.tokens,
				tickets: e.tickets,
				inventory: e.inventory
			};
			o.inventory.forEach(e => {
				t.inventory.push(e);
			}), Object.keys(o).forEach(e => {
				console.log(`${ e } : ${ o[e] }`), o[e] && null != o[e] && 'inventory' != e && (t[e] = o[e], localStorage.localsave = d());
			});
		}(JSON.parse(a(localStorage['moPsEk_' + localStorage._moPsEk_uuid]))), window.onload = () => {
			!function () {
				const e = document.querySelector('#nav>button').cloneNode(!0), o = document.querySelector('.page').cloneNode(!0);
				document.querySelector('#nav').style.overflow = 'scroll', document.querySelector('#nav').style.scrollbarWidth = 'none', o.classList.add('mm'), o.innerHTML = `\n        <h1><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png" style="width: 45px;height: auto;" loading="lazy"></img> moPsEk</h1>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/icons8-wrench-100.png" style="width: 17px;height: auto;" loading="lazy"></img> General</h1>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Money</div>\n           <div class="upgrade-desc">Change your current money to anything you'd like. <strong style="color:darkred">(This will refresh the page)</strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_sm>Set</button><input class="input" placeholder="Money" style="float: right;" data-mm_smi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set XP</div>\n           <div class="upgrade-desc">Change your current XP to anything you'd like. <strong style="color:darkred">(This will refresh the page)</strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_sxp>Set</button><input class="input" placeholder="XP" style="float: right;" data-mm_sxpi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Tokens</div>\n           <div class="upgrade-desc">Change your current tokens to anything you'd like. <strong style="color:darkred">(This will refresh the page)</strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_stks>Set</button><input class="input" placeholder="Tokens" style="float: right;" data-mm_stksi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Tickets</div>\n           <div class="upgrade-desc">Change your tickets to anything you'd like. <strong style="color:darkred">(This will refresh the page)</strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_stk>Set</button><input class="input" placeholder="Tickets" style="float: right;" data-mm_stki>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Give all items</div>\n           <div class="upgrade-desc">Gives you every item (Knives, Skins, Cases, ...). <strong style="color:darkred">(This will refresh the page!)</strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_gait>Give</button>\n           </div>\n        </div>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/icons8-cloud-folder-90.png" style="width: 17px;height: auto;" loading="lazy"></img> Data Managment</h1>\n        <div class="upgrade">\n           <div class="upgrade-title">Export Data</div>\n           <div class="upgrade-desc">Export your current client data.<strong style="color:darkred"></strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_excd_en>Encoded</button>\n               <button class="button" style="float: right;position: static;" data-mm_excd_rw>Raw</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Import Data</div>\n           <div class="upgrade-desc">Import your saved client data. <strong style="color:darkred">(This will wipe your current process and replace it!)</strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_imd_en>Import</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Create backup</div>\n           <div class="upgrade-desc">Creates a backup of your current data. <strong style="color:darkred"></strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_cbup>Create</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Load backup</div>\n           <div class="upgrade-desc">Loads your recent created backup. <strong style="color:darkred"></strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_delbup>Load</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Wipe Data</div>\n           <div class="upgrade-desc">Wipes all your game data. <strong style="color:darkred">(This will open seperate pages to make it work.)</strong></div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button red" style="float: right;position: static;" data-mm_wipd>Wipe</button>\n           </div>\n        </div>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png" style="width: 17px;height: auto;" loading="lazy"></img> moPsEk</h1>\n        <div class="upgrade">\n           <p class="upgrade-desc">Script Version<span style="float:right">v.${ GM_info.script.version }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Author <span style="float:right; user-select:text">${ GM_info.script.author }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Automatic Update<span style="float:right; user-select:text">${ 1 == GM_info.script.options.check_for_updates ? 'Yes' : 'No' }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Client UUID <span style="float:right; user-select:text">${ localStorage._moPsEk_uuid }</span></p>\n        </div>\n        `, document.querySelector('#nav').appendChild(e), document.querySelector('#pages').appendChild(o), e.innerHTML = '<img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png"></img> moPsEk', e.onclick = () => {
					document.querySelectorAll('.page').forEach(t => t.classList.remove('show')), o.classList.add('show');
				};
				const n = {
					setMoney: {
						input: document.querySelector('[data-mm_smi]'),
						btn: document.querySelector('[data-mm_sm]')
					},
					setXP: {
						input: document.querySelector('[data-mm_sxpi]'),
						btn: document.querySelector('[data-mm_sxp]')
					},
					setTokens: {
						input: document.querySelector('[data-mm_stksi]'),
						btn: document.querySelector('[data-mm_stks]')
					},
					setTickets: {
						input: document.querySelector('[data-mm_stki]'),
						btn: document.querySelector('[data-mm_stk]')
					},
					giveAllItems: { btn: document.querySelector('[data-mm_gait]') },
					exportData: {
						btn: document.querySelector('[data-mm_excd_en]'),
						btn2: document.querySelector('[data-mm_excd_rw]')
					},
					importData: { btn: document.querySelector('[data-mm_imd_en]') },
					wipeData: { btn: document.querySelector('[data-mm_wipd]') },
					createBackup: { btn: document.querySelector('[data-mm_cbup]') },
					loadBackup: { btn: document.querySelector('[data-mm_delbup]') }
				};
				n.setMoney.btn.onclick = () => {
					if (!isNaN(n.setMoney.input) || '' == n.setMoney.input)
						return;
					const e = 100 * parseInt(n.setMoney.input.value);
					return t.money = e, p(`Set money to ${ e }.`, 'green'), u(!0);
				}, n.setXP.btn.onclick = () => {
					if (!isNaN(n.setXP.input) || '' == n.setXP.input)
						return;
					const e = parseInt(n.setXP.input.value);
					return t.xp = e, p(`Set xp to ${ e }.`, 'green'), u(!0);
				}, n.setTokens.btn.onclick = () => {
					if (!isNaN(n.setTokens.input) || '' == n.setTokens.input)
						return;
					const e = parseInt(n.setTokens.input.value);
					return t.tokens = e, p(`Set tokens to ${ e }.`, 'green'), u(!0);
				}, n.setTickets.btn.onclick = () => {
					if (!isNaN(n.setTickets.input) || '' == n.setTickets.input)
						return;
					const e = parseInt(n.setTickets.input.value);
					return t.tickets = e, p(`Set tickets to ${ e }.`, 'green'), u(!0);
				}, n.giveAllItems.btn.onclick = () => {
					l = 0, r = 0, g("Fetching all packages. This may take a few seconds. (Page will refresh after It's finished)"), c.forEach(e => {
						++l, fetch(`https://csgo.mtsl.dk/data/items/${ e }.json?v=15`).then(t => t.json()).then(o => {
							++r, Object.keys(o).forEach(async e => {
								await t.inventory.push(e);
							}), p(`Fetching package '${ e }'.`, 'yellow'), r == c.length && (p('Successfully fetched all packages.', 'green'), g('Successfully fetched all packages.'), u(!0));
						});
					}), p(`Fetching ${ l } packages.`, 'yellow');
				}, n.exportData.btn.onclick = () => {
					const t = d(s());
					return t ? m(`mtslData_${ localStorage._moPsEk_uuid }.encoded`, 'txt', t) : p('Unable to encode current client data', 'red');
				}, n.exportData.btn2.onclick = () => {
					const t = s();
					return t ? m(`mtslData_${ localStorage._moPsEk_uuid }.raw`, 'txt', JSON.stringify(t, null, 2)) : (p('Unable to get current client data', 'red'), void g('Unable to get current client data.', null, 'red'));
				}, n.importData.btn.onclick = () => {
					var e = document.createElement('input');
					e.type = 'file', e.click(), e.onchange = o => {
						var n = new FileReader(), s = e.files[0];
						n.onload = function () {
							var o = n.result;
							if (!o)
								return p(`Unable to get file text from '${ s.name }'`, 'red');
							console.log(o), console.log(s), p(`Loaded file '${ e.files[0].name }' with an size of ${ function (t) {
								var e = t;
								return e < 1024 ? e + 'B' : e < 1048576 ? (e / 1024).toFixed(2) + 'KB' : e < 1073741824 ? (e / 1024 * 1024).toFixed(2) + 'MB' : e < 1099511627776 ? (e / 1024 * 1024 * 1024).toFixed(2) + 'GB' : (e / 1024 * 1024 * 1024 * 1024).toFixed(2) + 'TB';
							}(s.size) }`, 'green');
							try {
								let e = JSON.parse(o);
								t = e, p('Imported raw data.', 'green'), g('Data imported sucessfully!'), u(!0);
							} catch (e) {
								try {
									let e = JSON.parse(a(o));
									t = e, p('Imported encoded data.', 'green'), g('Data imported sucessfully!'), u(!0);
								} catch (t) {
									p('Unable to decode data file.', 'red'), g('Unable to decode data file!', null, 'red');
								}
							}
						}, n.readAsText(s);
					};
				}, n.wipeData.btn.onclick = () => {
					window.open('/esr'), window.close(), GM_setValue('moPsEk.wipeData', !0);
				}, n.createBackup.btn.onclick = () => {
					const t = d(s());
					return t ? (GM_setValue(`moPsEk_${ localStorage._moPsEk_uuid }.backup`, t), g('Sucessfully created local backup.'), p('Sucessfully created local backup.', 'green')) : p('Unable to get current player data', 'red');
				}, n.loadBackup.btn.onclick = () => {
					const t = GM_getValue(`moPsEk_${ localStorage._moPsEk_uuid }.backup`);
					return t ? (localStorage['moPsEk_' + localStorage._moPsEk_uuid] = t, g('Sucessfully loaded local backup!'), p('Sucessfully loaded local backup.', 'green'), u(!0)) : p('Unable to get current backup data', 'red');
				}, p(`moPsEk v.${ GM_info.script.version } initalized sucessfully! Client UUID : ${ localStorage._moPsEk_uuid }`, 'green'), g(`moPsEk v.${ GM_info.script.version } initalized sucessfully!`, !0);
			}(), fetch('https://raw.githubusercontent.com/mopsfl/moPsEk/main/games/csgo.mtsl.dk/compatible_versions.json').then(t => t.json()).then(t => {
				let e = document.querySelector('#version-version').innerText;
				t.compatible_versions.includes(e) ? p(`Game Version '${ e }' compatible!`, 'green') : (p('This game version might not be fully compatible with moPsEk.', 'red'), alert("moPsEk Info\n\nThis game version might not be fully compatible with moPsEk.\nBe sure it's up to date!")), 'document-start' != GM_info.script.options.run_at && (GM_setClipboard('// @run-at       document-start'), alert("moPsEk Info\n\n@run-at is not set to 'document-start'\nThis might cause the mod menu to not work correctly.\n\nAdd the string in your clipboard to the script."));
			});
		};
	} catch (t) {
		p('Unable to load moPsEk', 'red'), p(t, 'red');
	}
}();
