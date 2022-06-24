// ==UserScript==
// @name         moPsEk - CSGO MTSL 2
// @namespace    http://tampermonkey.net/
// @description  moPsEk for CSGO MTSL Version 2
// @description:de moPsEk pour CSGO MTSL version 2
// @description:fr moPsEk
// @author       mopsfl
// @version      0.0.3
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
	let t={money:240,tickets:0,tokens:0,xp:0,stats:{creation:(new Date).getTime()},inventory:["Spectrum Case"],upgrades:{},achievements:{},achievements_collected:{},luckyWheelWins:[]},
        e={"=":"0","!":"1","?":"2",$:"3","%":"4","&":"5","/":"6","\\":"7","-":"8","+":"9"},
        o=Object.keys(e).join(""),n={0:"=",1:"!",2:"?",3:"$",4:"%",5:"&",6:"/",7:"\\",8:"-",9:"+"};
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
	var c=["bravo","breakout","brokenfang","cs20","csgoweapon","csgoweapon2","csgoweapon3","falchion","fracture","gamma","horizon","huntsman","phoenix","prisma","prisma2","spectrum","spectrum2","winteroffensive","snakebite","gamma2","clutch","chroma","chroma2","chroma3","shadow","collections/assault","collections/aztec","collections/dust","collections/inferno","collections/militia","collections/nuke","collections/office","collections/vertigo","vanguard","revolver","wildfire","glove","hydra","dangerzone","shatteredweb","collections/risingsun","collections/stmarc","collections/overpass","collections/norse","collections/mirage","collections/cobblestone","collections/havoc","collections/godsandmonsters","collections/alpha","collections/ancient","collections/baggage","collections/bank","collections/cache","collections/canals","collections/chopshop","collections/control","collections/dust2","collections/dust22021","collections/inferno2018","collections/italy","collections/lake","collections/mirage2021","collections/nuke2018","collections/safehouse","collections/train","collections/train2021","collections/vertigo2021","riptide","doppler-phases/phases","esports2013","esports2013winter","esports2014summer","dreamsandnightmares"];
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
		if (!(t ?? e ?? o))
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
			return Object.keys(o).forEach(e => {
				o[e] && null != o[e] && (t[e] = o[e], localStorage.localsave = d());
			}), !0;
		}(JSON.parse(a(localStorage['moPsEk_' + localStorage._moPsEk_uuid]))) ? p('Localsave successfully replaced!', 'green') : p('An unexpected error occured while replacing localsave!', 'red'), window.onload = () => {
			!function () {
				const e = document.querySelector('#nav>button').cloneNode(!0), o = document.querySelector('.page').cloneNode(!0);
				let n = document.createElement('span');
				n.classList.add('_tooltip'), n.style = 'position: absolute;z-index: 9999;background-color: #333;border: 2px solid #555;min-width: 15px;padding: 4px;border-radius: 3px;max-width: 250px;word-break: break-word;font-family: "Roboto", sans-serif;', document.onmousemove = t => {
					n.style.left = t.clientX - n.offsetWidth + 'px', n.style.top = t.clientY - 50 + 'px';
				}, document.querySelector('#nav').style.overflow = 'scroll', document.querySelector('#nav').style.scrollbarWidth = 'none', o.style = 'opacity:1 !important;display:none;pointer-events: all;', o.innerHTML = `\n        <h1><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png" style="width: 45px;height: auto;" loading="lazy"></img> moPsEk</h1>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/icons8-wrench-100.png" style="width: 17px;height: auto;" loading="lazy"></img> General</h1>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Money<span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='?'></img></span></div>\n           <div class="upgrade-desc">Change your current money to anything you'd like.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_sm>Set</button><input class="input" placeholder="Money" style="float: right;" data-mm_smi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set XP <span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='?'></img></span></div>\n           <div class="upgrade-desc">Change your current XP to anything you'd like.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_sxp>Set</button><input class="input" placeholder="XP" style="float: right;" data-mm_sxpi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Tokens <span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='?'></img></span></div>\n           <div class="upgrade-desc">Change your current tokens to anything you'd like.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_stks>Set</button><input class="input" placeholder="Tokens" style="float: right;" data-mm_stksi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Tickets <span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='?'></img></span></div>\n           <div class="upgrade-desc">Change your tickets to anything you'd like.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_stk>Set</button><input class="input" placeholder="Tickets" style="float: right;" data-mm_stki>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Give all items <span data-info='Will refresh your page & Can cause lags!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='?'></img></span></div>\n           <div class="upgrade-desc">Gives you every item (Knives, Skins, Cases, ...).</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_gait>Give</button>\n           </div>\n        </div>\n        <div class="upgrade" style="display:none">\n           <div class="upgrade-title">Auto Earn</div>\n           <div class="upgrade-desc">Automatically clicks on the earn tab.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_ae>Off</button>\n           </div>\n        </div>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/icons8-cloud-folder-90.png" style="width: 17px;height: auto;" loading="lazy"></img> Data Managment</h1>\n        <div class="upgrade">\n           <div class="upgrade-title">Export Data</div>\n           <div class="upgrade-desc">Export your current client data.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_excd_en>Encoded</button>\n               <button class="button" style="float: right;position: static;" data-mm_excd_rw>Raw</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Import Data <span data-info='This will wipe your current process and replace it!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='?'></img></span></div>\n           <div class="upgrade-desc">Import your saved client data.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_imd_en>Import</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Create backup</div>\n           <div class="upgrade-desc">Creates a backup of your current data.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_cbup>Create</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Load backup</div>\n           <div class="upgrade-desc">Loads your recent created backup.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_delbup>Load</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Wipe Data <span data-info='This will open seperate pages to make it work.' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='?'></img></span></div>\n           <div class="upgrade-desc">Wipes all local data for this website.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button red" style="float: right;position: static;" data-mm_wipd>Wipe</button>\n           </div>\n        </div>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png" style="width: 17px;height: auto;" loading="lazy"></img> moPsEk</h1>\n        <div class="upgrade">\n           <p class="upgrade-desc">Script Version<span style="float:right">v.${ GM_info.script.version }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Author <span style="float:right; user-select:text">${ GM_info.script.author }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Automatic Update<span style="float:right; user-select:text">${ 1 == GM_info.script.options.check_for_updates ? 'Yes' : 'No' }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Client UUID <span style="float:right; user-select:text">${ localStorage._moPsEk_uuid }</span></p>\n        </div>\n        `, document.querySelector('#nav').appendChild(e), document.querySelector('#pages').appendChild(o), e.innerHTML = '<img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png"></img> moPsEk', e.attributes.showpage.nodeValue = 'mm', e.onclick = () => {
					document.querySelectorAll('.page').forEach(t => t.classList.remove('show')), o.style.display = 'block';
				}, o.querySelectorAll('[data-info]').forEach(t => {
					const e = t.attributes['data-info'].nodeValue;
					t.onmouseenter = t => {
						document.body.appendChild(n), n.innerText = e;
					}, t.onmouseleave = t => {
						document.body.removeChild(n), n.innerText = '';
					};
				});
				const i = {
					setMoney: {
						input: o.querySelector('[data-mm_smi]'),
						btn: o.querySelector('[data-mm_sm]')
					},
					setXP: {
						input: o.querySelector('[data-mm_sxpi]'),
						btn: o.querySelector('[data-mm_sxp]')
					},
					setTokens: {
						input: o.querySelector('[data-mm_stksi]'),
						btn: o.querySelector('[data-mm_stks]')
					},
					setTickets: {
						input: o.querySelector('[data-mm_stki]'),
						btn: o.querySelector('[data-mm_stk]')
					},
					giveAllItems: { btn: o.querySelector('[data-mm_gait]') },
					exportData: {
						btn: o.querySelector('[data-mm_excd_en]'),
						btn2: o.querySelector('[data-mm_excd_rw]')
					},
					importData: { btn: o.querySelector('[data-mm_imd_en]') },
					wipeData: { btn: o.querySelector('[data-mm_wipd]') },
					createBackup: { btn: o.querySelector('[data-mm_cbup]') },
					loadBackup: { btn: o.querySelector('[data-mm_delbup]') },
					autoEarn: { btn: o.querySelector('[data-mm_ae]') }
				};
				var h;
				i.setMoney.btn.onclick = () => {
					if (!isNaN(i.setMoney.input) || '' == i.setMoney.input)
						return;
					const e = 100 * parseInt(i.setMoney.input.value);
					return t.money = e, p(`Set money to ${ e }.`, 'green'), u(!0);
				}, i.setXP.btn.onclick = () => {
					if (!isNaN(i.setXP.input) || '' == i.setXP.input)
						return;
					const e = parseInt(i.setXP.input.value);
					return t.xp = e, p(`Set xp to ${ e }.`, 'green'), u(!0);
				}, i.setTokens.btn.onclick = () => {
					if (!isNaN(i.setTokens.input) || '' == i.setTokens.input)
						return;
					const e = parseInt(i.setTokens.input.value);
					return t.tokens = e, p(`Set tokens to ${ e }.`, 'green'), u(!0);
				}, i.setTickets.btn.onclick = () => {
					if (!isNaN(i.setTickets.input) || '' == i.setTickets.input)
						return;
					const e = parseInt(i.setTickets.input.value);
					return t.tickets = e, p(`Set tickets to ${ e }.`, 'green'), u(!0);
				}, i.giveAllItems.btn.onclick = () => {
					l = 0, r = 0, g("Fetching all item lists. This may take a few seconds. (Page will refresh after It's finished)"), c.forEach(e => {
						++l, fetch(`https://csgo.mtsl.dk/data/items/${ e }.json?v=15`).then(t => t.json()).then(o => {
							++r, Object.keys(o).forEach(async e => {
								await t.inventory.push(e);
							}), p(`Fetching item list '${ e }'.`, 'yellow'), r == c.length && (p('Successfully fetched all item lists.', 'green'), g('Successfully fetched all item lists.'), u(!0));
						});
					}), p(`Fetching ${ l } item lists.`, 'yellow');
				}, i.exportData.btn.onclick = () => {
					const t = d(s());
					return t ? m(`mtslData_${ localStorage._moPsEk_uuid }.encoded`, 'txt', t) : p('Unable to encode current client data', 'red');
				}, i.exportData.btn2.onclick = () => {
					const t = s();
					return t ? m(`mtslData_${ localStorage._moPsEk_uuid }.raw`, 'txt', JSON.stringify(t, null, 2)) : (p('Unable to get current client data', 'red'), void g('Unable to get current client data.', null, 'red'));
				}, i.importData.btn.onclick = () => {
					var e = document.createElement('input');
					e.type = 'file', e.click(), e.onchange = o => {
						var n = new FileReader(), s = e.files[0];
						n.onload = function () {
							var o = n.result;
							if (!o)
								return p(`Unable to get file text from '${ s.name }'`, 'red');
							p(`Loaded file '${ e.files[0].name }' with an size of ${ function (t) {
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
				}, i.wipeData.btn.onclick = () => {
					window.open('/esr'), window.close(), GM_setValue('moPsEk.wipeData', !0);
				}, i.createBackup.btn.onclick = () => {
					const t = d(s());
					return t ? (GM_setValue(`moPsEk_${ localStorage._moPsEk_uuid }.backup`, t), g('Sucessfully created local backup.'), p('Sucessfully created local backup.', 'green')) : p('Unable to get current player data', 'red');
				}, i.loadBackup.btn.onclick = () => {
					const t = GM_getValue(`moPsEk_${ localStorage._moPsEk_uuid }.backup`);
					return t ? (localStorage['moPsEk_' + localStorage._moPsEk_uuid] = t, g('Sucessfully loaded local backup!'), p('Sucessfully loaded local backup.', 'green'), u(!0)) : p('Unable to get current backup data', 'red');
				}, i.autoEarn.btn.onclick = t => {
					let e = t.target;
					'off' == e.textContent.toLocaleLowerCase() ? (e.textContent = 'On', h = window.setInterval(() => {
						document.querySelector('.click-how2-text').parentElement.dispatchEvent(new Event('mousedown'));
					}, 55)) : (e.textContent = 'Off', window.clearInterval(h), h = null);
				}, p(`moPsEk v.${ GM_info.script.version } initalized sucessfully! Client UUID : ${ localStorage._moPsEk_uuid }`, 'green'), g(`moPsEk v.${ GM_info.script.version } initalized sucessfully!`, !0);
			}(), fetch('https://raw.githubusercontent.com/mopsfl/moPsEk/main/games/csgo.mtsl.dk/compatible_versions.json').then(t => t.json()).then(t => {
				let e = document.querySelector('#version-version').innerText;
				t.compatible_versions.includes(e) ? p(`Current game version '${ e }' compatible with script version v.${ GM_info.script.version }`, 'green') : (p('This game version might not be fully compatible with moPsEk.', 'red'), alert("moPsEk Info\n\nThis game version might not be fully compatible with moPsEk.\nBe sure it's up to date!")), 'document-start' != GM_info.script.options.run_at && (GM_setClipboard('// @run-at       document-start'), alert("moPsEk Info\n\n@run-at is not set to 'document-start'\nThis might cause the mod menu to not work correctly.\n\nAdd the string in your clipboard to the script."));
			});
		};
	} catch (t) {
		p('Unable to load moPsEk', 'red'), p(t, 'red');
	}
}();
