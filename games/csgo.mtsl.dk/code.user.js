// ==UserScript==
// @name         moPsEk - CSGO MTSL 2 DEV
// @namespace    https://github.com/mopsfl/moPsEk
// @description  moPsEk for CSGO MTSL Version 2
// @author       mopsfl
// @version      0.0.5
// @license      MIT
// @match        *://csgo.mtsl.dk/
// @match        *://csgo.mtsl.dk/esr/
// @icon         https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_download
// @grant        window.onurlchange
// @updateURL    https://github.com/mopsfl/moPsEk/raw/main/games/csgo.mtsl.dk/code.user.js
// @downloadURL  https://github.com/mopsfl/moPsEk/raw/main/games/csgo.mtsl.dk/code.user.js
// ==/UserScript==
!function () {
	'use strict';
	let e = {
			money: 240,
			tickets: 0,
			tokens: 0,
			xp: 0,
			stats: { creation: new Date().getTime() },
			inventory: [],
			upgrades: {},
			achievements: {},
			achievements_collected: {},
			luckyWheelWins: [],
			upgrades: {
				maxClick: null,
				minClick: null,
				passiveIncome: null,
				offlineIncome: null,
				offlineBank: null,
				missionGeneration: null
			}
		}, t = [], o={first:{name:"First time's a charm",description:"Open your first case",requirements:[{objective:"opened_cases",amount:1}],rewards:[{type:"money",amount:210}]},case10:{name:"Getting Started",description:"Open your first 10 cases",requirements:[{objective:"opened_cases",amount:10}],rewards:[{type:"money",amount:350}]},case100:{name:"100th time's a charm",description:"Open 100 cases",requirements:[{objective:"opened_cases",amount:100}],rewards:[{type:"money",amount:1e3}]},case1000:{name:"To much freetime...",description:"Open 1000 cases",requirements:[{objective:"opened_cases",amount:1e3}],rewards:[{type:"money",amount:2500}]},unluckyoutcomes:{name:"Unlucky outcomes",description:"Open a few military specs",requirements:[{objective:"opened_rarities_2",amount:10}],rewards:[{type:"money",amount:800}]},covert:{name:"Covert",description:"Open a covert",requirements:[{objective:"opened_rarities_5",amount:1}],rewards:[{type:"money",amount:2500}]},sharpandpointy:{name:"Sharp and pointy",description:"Open a knife (or glove)",requirements:[{objective:"opened_rarities_6",amount:1}],rewards:[{type:"money",amount:500}]},sharpandpointy2:{name:"Sharp and pointy II",description:"Open 10 knives (or gloves)",requirements:[{objective:"opened_rarities_6",amount:10}],rewards:[{type:"money",amount:2500}]},sharpandpointy3:{name:"Sharp and pointy III",description:"Open 100 knives (or gloves)",requirements:[{objective:"opened_rarities_6",amount:100}],rewards:[{type:"money",amount:12500}]},sharpandpointy4:{name:"Sharp and pointy Master",description:"Open 1000 knives (or gloves)",requirements:[{objective:"opened_rarities_6",amount:1e3}],rewards:[{type:"money",amount:2e5}]},clicker1:{name:"Clicker I",description:"Click 100 times",requirements:[{objective:"clicks",amount:100}],rewards:[{type:"money",amount:1200}]},clicker2:{name:"Clicker II",description:"Click 1000 times",requirements:[{objective:"clicks",amount:1e3}],rewards:[{type:"money",amount:4e3}]},clicker3:{name:"Clicker III",description:"Click 8000 times",requirements:[{objective:"clicks",amount:8e3}],rewards:[{type:"money",amount:1e4}]},clicker4:{name:"Clicker IV",description:"Click 25000 times",requirements:[{objective:"clicks",amount:25e3}],rewards:[{type:"money",amount:25e3}]},clicker5:{name:"Clicker Master",description:"Click 100000 times",requirements:[{objective:"clicks",amount:1e5}],rewards:[{type:"money",amount:5e4}]},seller:{name:"Seller",description:"Sell your first skin",requirements:[{objective:"skin_sold",amount:1}],rewards:[{type:"money",amount:100}]},seller2:{name:"Cheapsies",description:"Sell your first 100 skins",requirements:[{objective:"skin_sold",amount:100}],rewards:[{type:"money",amount:750}]},seller3:{name:"Trusted Seller",description:"Sell 1000 skins",requirements:[{objective:"skin_sold",amount:1e3}],rewards:[{type:"money",amount:2500}]},seller4:{name:"Market Leader",description:"Sell 10000 skins",requirements:[{objective:"skin_sold",amount:1e4}],rewards:[{type:"money",amount:8e3}]},profit:{name:"Profit",description:"Sell a skin, which goes for more than 10 €",requirements:[{objective:"skin_sold_gt10",amount:1}],rewards:[{type:"money",amount:500}]},profits:{name:"Profits",description:"Sell 100 skins, where each goes for more than 10 €",requirements:[{objective:"skin_sold_gt10",amount:100}],rewards:[{type:"money",amount:5e3}]},undergrounddeals:{name:"Underground Deals",description:"Sell a covert",requirements:[{objective:"skin_sold_r5",amount:1}],rewards:[{type:"money",amount:1500}]},contraband:{name:"Contraband",description:"Sell a knife (or glove)",requirements:[{objective:"skin_sold_r6",amount:1}],rewards:[{type:"money",amount:2e3}]},gains:{name:"Gains",description:"Sell a skin, worth more than 50 €",requirements:[{objective:"skin_sold_gt50",amount:1}],rewards:[{type:"money",amount:3500}]},raresales:{name:"Rare Sales",description:"Sell a skin worth more than 250 €",requirements:[{objective:"skin_sold_gt250",amount:1}],rewards:[{type:"money",amount:6e3}]},raresales2:{name:"Rare Sales II",description:"Sell 10 skins, where each is worth more than 250 €",requirements:[{objective:"skin_sold_gt250",amount:10}],rewards:[{type:"money",amount:1e4}]},raresales3:{name:"Rare Sales Master",description:"Sell 50 skins, where each is worth more than 250 €",requirements:[{objective:"skin_sold_gt250",amount:50}],rewards:[{type:"money",amount:2e4}]},winnertakesall:{name:"Winner Takes All!",description:"Win your first jackpot",requirements:[{objective:"win_jackpot",amount:1}],rewards:[{type:"money",amount:1e3}]},winnertakesall2:{name:"Winner Takes All! II",description:"Win 5 jackpots",requirements:[{objective:"win_jackpot",amount:5}],rewards:[{type:"money",amount:2500}]},winnertakesall3:{name:"Winner Takes All! III",description:"Win 10 jackpots",requirements:[{objective:"win_jackpot",amount:10}],rewards:[{type:"money",amount:5e3}]},winnertakesall4:{name:"Winner Takes All! IV",description:"Win 25 jackpots",requirements:[{objective:"win_jackpot",amount:25}],rewards:[{type:"money",amount:1e4}]},winnertakesall5:{name:"Winner Takes All! Master",description:"Win 100 jackpots",requirements:[{objective:"win_jackpot",amount:100}],rewards:[{type:"money",amount:5e4}]},againstallodds:{name:"Against all odds",description:"Win the jackpot with an odd below 2,5%",requirements:[{objective:"win_jackpot_low",amount:1}],rewards:[{type:"money",amount:2500}]},expectedoutcome:{name:"Expected Outcome",description:"Win the jackpot with an odd over 35%",requirements:[{objective:"win_jackpot_big",amount:1}],rewards:[{type:"money",amount:1250}]},biggestloser:{name:"The Biggest Loser",description:"Lose the jackpot with an odd over 35%",requirements:[{objective:"lose_jackpot_big",amount:1}],rewards:[{type:"money",amount:2500}]},intenseroll:{name:"Intense Roll",description:"Lose the jackpot, when the indicator lands right beside you",requirements:[{objective:"lose_jackpot_close",amount:1}],rewards:[{type:"money",amount:1e3}]},worthatry:{name:"Worth a try",description:"Lose your first jackpot",requirements:[{objective:"lose_jackpot",amount:1}],rewards:[{type:"money",amount:200}]},worthatry2:{name:"Worth a try? II",description:"Lose 50 jackpots",requirements:[{objective:"lose_jackpot",amount:50}],rewards:[{type:"money",amount:2500}]},worthatry3:{name:"Worth a try III",description:"Lose 100 jackpots",requirements:[{objective:"lose_jackpot",amount:100}],rewards:[{type:"money",amount:3500}]},worthatry4:{name:"Worth a try Master",description:"Lose 200 jackpots",requirements:[{objective:"lose_jackpot",amount:200}],rewards:[{type:"money",amount:5e3}]},cashout:{name:"Cash Out I",description:"Cash out over 2x in Crash",requirements:[{objective:"cashout_2x",amount:1}],rewards:[{type:"money",amount:200}]},cashout2:{name:"Cash Out II",description:"Cash out over 3x in Crash",requirements:[{objective:"cashout_3x",amount:1}],rewards:[{type:"money",amount:400}]},cashout3:{name:"Cash Out III",description:"Cash out over 4x in Crash",requirements:[{objective:"cashout_4x",amount:1}],rewards:[{type:"money",amount:800}]},cashout4:{name:"Cash Out IV",description:"Cash out over 5x in Crash",requirements:[{objective:"cashout_5x",amount:1}],rewards:[{type:"money",amount:1600}]},cashout5:{name:"Cash Out Master",description:"Cash out over 10x in Crash",requirements:[{objective:"cashout_10x",amount:1}],rewards:[{type:"money",amount:3600}]},diamondhands:{name:"Diamond Hands",description:"Cash out over 100x in Crash",requirements:[{objective:"cashout_100x",amount:1}],rewards:[{type:"money",amount:5e4}]},regrettable:{name:"Easily Regrettable",description:"Lose your bet to a crash over 100x",requirements:[{objective:"crash_bet_100x",amount:1}],rewards:[{type:"money",amount:5e3}]},riskedit:{name:"Should have risked it",description:"Cash out under 2x in a Crash over 100x",requirements:[{objective:"crash_low_bet_100x",amount:1}],rewards:[{type:"money",amount:500}]},reachlevel1:{name:"The beginning",description:"Reach level one",requirements:[{objectiveType:"calculatedUserStat",objective:"level",amount:1}],rewards:[{type:"money",amount:800}]},reachlevel5:{name:"Getting Started",description:"Reach level five",requirements:[{objectiveType:"calculatedUserStat",objective:"level",amount:5}],rewards:[{type:"money",amount:2500}]},reachlevel10:{name:"Passioned Player",description:"Reach level ten",requirements:[{objectiveType:"calculatedUserStat",objective:"level",amount:10}],rewards:[{type:"money",amount:5e3}]},reachlevel20:{name:"Addicted Player",description:"Reach level twenty",requirements:[{objectiveType:"calculatedUserStat",objective:"level",amount:20}],rewards:[{type:"money",amount:1e4}]},reachlevel30:{name:"Getting old no?",description:"Reach level thirty",requirements:[{objectiveType:"calculatedUserStat",objective:"level",amount:30}],rewards:[{type:"money",amount:5e4}]},reachlevel40:{name:"Professionel Timekiller",description:"Reach level forty",requirements:[{objectiveType:"calculatedUserStat",objective:"level",amount:40}],rewards:[{type:"money",amount:1e5}]},wincoinflip:{name:"Great Teller",description:"Win a coinflip",requirements:[{objective:"total_coinflips_won",amount:1}],rewards:[{type:"money",amount:200}]},losecoinflip:{name:"Bad Teller",description:"Lose a coinflip",requirements:[{objective:"total_coinflips_lost",amount:1}],rewards:[{type:"money",amount:100}]},win10coinflip:{name:"So easy it's getting boring",description:"Win 10 coinflips",requirements:[{objective:"total_coinflips_won",amount:10}],rewards:[{type:"money",amount:500}]},lose10coinflip:{name:"Next time I will try CT",description:"Lose 10 coinflips",requirements:[{objective:"total_coinflips_lost",amount:10}],rewards:[{type:"money",amount:300}]},win100coinflip:{name:"Routine Flips",description:"Win 100 coinflips",requirements:[{objective:"total_coinflips_won",amount:100}],rewards:[{type:"money",amount:2500}]},lose100coinflip:{name:"But it's fun anyway",description:"Lose 100 coinflips",requirements:[{objective:"total_coinflips_lost",amount:100}],rewards:[{type:"money",amount:1500}]},win500coinflip:{name:"Master Coin Flipper",description:"Win 500 coinflips",requirements:[{objective:"total_coinflips_won",amount:500}],rewards:[{type:"money",amount:5e3}]},flipsforwhat:{name:"100 Flips for what",description:"Do 100 coinflips",requirements:[{objective:"total_coinflips",amount:100}],rewards:[{type:"money",amount:2500}]},flipathousand:{name:"Flip a thousand",description:"Do 1000 coinflips",requirements:[{objective:"total_coinflips",amount:1e3}],rewards:[{type:"money",amount:1e4}]},winmines:{name:"Bomb detector",description:"Win a game of mines",requirements:[{objective:"total_mines_won",amount:1}],rewards:[{type:"money",amount:100}]},losemines:{name:"The unlucky bomb detector",description:"Lose a game of mines, and get blown to pieces.",requirements:[{objective:"total_mines_lost",amount:1}],rewards:[{type:"money",amount:50}]},win50mines:{name:"Picked for the job",description:"Prove your bomb clearing skills, and win 50 games of mines.",requirements:[{objective:"total_mines_won",amount:50}],rewards:[{type:"money",amount:400}]},win1000mines:{name:"Bomb Master",description:"Win 1000 games of mines",requirements:[{objective:"total_mines_won",amount:1e3}],rewards:[{type:"money",amount:1e4}]},winminesmo20x:{name:"X-Ray Vision",description:"Win a game of mines, with a multiplier over 20x",requirements:[{objective:"total_mines_won_mo20",amount:1}],rewards:[{type:"money",amount:1e3}]},winminesmo20x2:{name:"Gut Feeling",description:"Win 10 games of mines, each with a multiplier over 20x",requirements:[{objective:"total_mines_won_mo20",amount:10}],rewards:[{type:"money",amount:1e4}]},winminesmo20x3:{name:"Extreme skills or luck?",description:"Win 100 games of mines, each with a multiplier over 20x",requirements:[{objective:"total_mines_won_mo20",amount:100}],rewards:[{type:"money",amount:1e5}]},bigbets:{name:"Big Bets",description:"Win a coin flip with a bet over 1000 €",requirements:[{objective:"total_coinflips_won_bet1000",amount:1}],rewards:[{type:"money",amount:1e4}]},biglosses:{name:"Big Losses",description:"Lose a coin flip with a bet over 1000 €",requirements:[{objective:"total_coinflips_lost_bet1000",amount:1}],rewards:[{type:"money",amount:2500}]},bigbets2:{name:"Biggest Bets",description:"Win a coin flip with a bet over 10000 €",requirements:[{objective:"total_coinflips_won_bet10000",amount:1}],rewards:[{type:"money",amount:8e4}]},biglosses2:{name:"Biggest Losses",description:"Lose a coin flip with a bet over 10000 €",requirements:[{objective:"total_coinflips_lost_bet10000",amount:1}],rewards:[{type:"money",amount:15e3}]},missions1:{name:"First Assignment",description:"Finish a mission",requirements:[{objective:"missions_finished",amount:1}],rewards:[{type:"money",amount:1500}]},missions2:{name:"Primary Contact",description:"Finish 20 missions",requirements:[{objective:"missions_finished",amount:10}],rewards:[{type:"money",amount:7500}]},missions3:{name:"Honest Work",description:"Finish 100 missions",requirements:[{objective:"missions_finished",amount:100}],rewards:[{type:"money",amount:15e3}]},missions4:{name:"Mission Impossible",description:"Finish 1000 missions",requirements:[{objective:"missions_finished",amount:1e3}],rewards:[{type:"money",amount:1e6}]},collector1:{name:"Beginner Collector",description:"Collect 50 skins",requirements:[{objective:"skins_discovered",amount:50}],rewards:[{type:"money",amount:400}]},collector2:{name:"Growing Collection",description:"Collect 100 skins",requirements:[{objective:"skins_discovered",amount:100}],rewards:[{type:"money",amount:1e3}]},collector3:{name:"Diverse Collector",description:"Collect 250 skins",requirements:[{objective:"skins_discovered",amount:250}],rewards:[{type:"money",amount:2e3}]},collector4:{name:"Private Collector",description:"Collect 500 skins",requirements:[{objective:"skins_discovered",amount:500}],rewards:[{type:"money",amount:5e3}]},collector5:{name:"Renown Collector",description:"Collect 750 skins",requirements:[{objective:"skins_discovered",amount:750}],rewards:[{type:"money",amount:5e4}]},collector6:{name:"The Millionaires Collection",description:"Collect 1000 skins",requirements:[{objective:"skins_discovered",amount:1e3}],rewards:[{type:"money",amount:1e5}]},collector7:{name:"The Billionaires Collection",description:"Collect 1250 skins",requirements:[{objective:"skins_discovered",amount:1250}],rewards:[{type:"money",amount:25e4}]},collector8:{name:"Near-Perfect Collection",description:"Collect 1500 skins",requirements:[{objective:"skins_discovered",amount:1500}],rewards:[{type:"money",amount:25e5}]},collection_complete:{name:"Collection Complete",description:"Collect 1635 skins",requirements:[{objective:"skins_discovered",amount:1635}],rewards:[{type:"money",amount:1e7}]}};, n = {
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
		}, i = Object.keys(n).join(''), s = {
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
	function a() {
		return JSON.parse(r(localStorage.localsave));
	}
	function r(e) {
		let t = [], o = '';
		for (let s = 0; s < e.length; s++) {
			let a = e[s];
			a.match(/[A-Z]/) || i.includes(a) ? (o += i.includes(a) ? n[a] : a.toLowerCase(), t.push(parseInt(o, 36)), o = '') : o += a;
		}
		let s, a = {}, r = String.fromCharCode(t[0]), l = r, c = [r], m = 256;
		for (let e = 1; e < t.length; e++) {
			let o = t[e];
			s = o < 256 ? String.fromCharCode(t[e]) : a[o] ? a[o] : l + r, c.push(s), r = s[0], a[m] = l + r, m++, l = s;
		}
		return function (e) {
			return decodeURIComponent(e.split('').map(function (e) {
				return '%' + ('00' + e.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));
		}(c.join(''));
	}
	function l(e) {
		let t, o = {}, n = ((e = function (e) {
				return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
					return String.fromCharCode('0x' + t);
				});
			}(e)) + '').split(''), i = [], a = n[0], r = 256;
		for (let e = 1; e < n.length; e++)
			t = n[e], null != o[a + t] ? a += t : (i.push(a.length > 1 ? o[a] : a.charCodeAt(0)), o[a + t] = r, r++, a = t);
		return i.push(a.length > 1 ? o[a] : a.charCodeAt(0)), i.map(e => {
			let t = e.toString(36);
			return t.substring(0, t.length - 1) + (t[t.length - 1].match(/[0-9]/) ? s[t[t.length - 1]] : t[t.length - 1].toUpperCase());
		}).join('');
	}
	let c = 0, m = 0;
	var d=["bravo","breakout","brokenfang","cs20","csgoweapon","csgoweapon2","csgoweapon3","falchion","fracture","gamma","horizon","huntsman","phoenix","prisma","prisma2","spectrum","spectrum2","winteroffensive","snakebite","gamma2","clutch","chroma","chroma2","chroma3","shadow","collections/assault","collections/aztec","collections/dust","collections/inferno","collections/militia","collections/nuke","collections/office","collections/vertigo","vanguard","revolver","wildfire","glove","hydra","dangerzone","shatteredweb","collections/risingsun","collections/stmarc","collections/overpass","collections/norse","collections/mirage","collections/cobblestone","collections/havoc","collections/godsandmonsters","collections/alpha","collections/ancient","collections/baggage","collections/bank","collections/cache","collections/canals","collections/chopshop","collections/control","collections/dust2","collections/dust22021","collections/inferno2018","collections/italy","collections/lake","collections/mirage2021","collections/nuke2018","collections/safehouse","collections/train","collections/train2021","collections/vertigo2021","riptide","doppler-phases/phases","esports2013","esports2013winter","esports2014summer","dreamsandnightmares"];
	let u = 0;
	function p() {
		return l(JSON.stringify(e));
	}
	function g(e) {
		if (localStorage['moPsEk_' + localStorage._moPsEk_uuid] = p(), localStorage['moPsEk_' + localStorage._moPsEk_uuid + '_tempInv'] = JSON.stringify(t), e)
			return location.reload();
	}
	function h(e, t) {
		console.info(`%c${ e }`, `background-color:black;padding:5px;border-left:solid 4px ${ t };color:white`);
	}
	function y(e, t, o) {
		if (!(e ?? t ?? o))
			return h('Could not create file. (Missing attr)', 'red');
		var n = document.createElement('a');
		n.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(o)), n.setAttribute('download', `${ e }.${ t }`), n.style.display = 'none', document.body.appendChild(n), n.click(), document.body.removeChild(n);
	}
	function v(e, t, o) {
		if (null == e)
			return;
		let n = document.createElement('div'), i = document.querySelector('.notifications');
		if (!n && !i)
			return h('Unable to create notification', 'red');
		i.classList.remove('hide'), n.classList.add('notification'), n.innerHTML = `<div class="notification-message"><span style="${ o ? 'color:' + o || 'inherit' : '' }">${ t ? '' : 'moPsEk: ' }${ e }</span></div><div class="notification-close"></div>`, n.querySelector('.notification-close').onclick = () => {
			n.remove();
		}, i.appendChild(n);
	}
	e = a(), 1 == GM_getValue('moPsEk.wipeData') && (localStorage.clear(), window.open('https://csgo.mtsl.dk/'), GM_setValue('moPsEk.wipeData', !1), window.close());
	try {
		h(`Initalizing moPsEk v.${ GM_info.script.version }`, 'yellow'), localStorage.getItem('_moPsEk_uuid') || (localStorage.setItem('_moPsEk_uuid', ([10000000] + -1000 + -4000 + -8000 + -100000000000).replace(/[018]/g, e => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16))), h('moPsEk client uuid created sucessfully!', 'green')), localStorage.getItem('moPsEk_' + localStorage._moPsEk_uuid) || (localStorage.setItem('moPsEk_' + localStorage._moPsEk_uuid, p(a())), h('moPsEk client savedata created sucessfully!', 'green')), localStorage['moPsEk_' + localStorage._moPsEk_uuid + '_tempInv'] || (localStorage['moPsEk_' + localStorage._moPsEk_uuid + '_tempInv'] = JSON.stringify([])), function (o) {
			if (!o || null == o)
				return;
			const n = {
					money: o.money,
					xp: o.xp,
					tokens: o.tokens,
					tickets: o.tickets,
					achievements: o.achievements,
					upgrades: o.upgrades
				}, i = JSON.parse(localStorage['moPsEk_' + localStorage._moPsEk_uuid + '_tempInv']);
			t = i, t.forEach(t => {
				e.inventory.push(t);
			}), localStorage['moPsEk_' + localStorage._moPsEk_uuid + '_tempInv'] = JSON.stringify([]), Object.keys(n.achievements).forEach(t => {
				e.achievements[t] = !0;
			}), Object.keys(n.upgrades).forEach(t => {
				e.upgrades[t] = n.upgrades[t];
			}), Object.keys(n).forEach(t => {
				[
					'money',
					'xp',
					'tokens',
					'tickets'
				].includes(t) && (e[t] = n[t], h(`Set ${ t } to ${ n[t] }`, 'green'));
			}), console.log(e, n), localStorage.localsave = p();
		}(JSON.parse(r(localStorage['moPsEk_' + localStorage._moPsEk_uuid]))), window.onload = () => {
			!function () {
				const n = document.querySelector('#nav>button').cloneNode(!0), i = document.querySelector('.page').cloneNode(!0);
				let s = document.createElement('span');
				s.classList.add('_tooltip'), s.style = 'position: absolute;z-index: 9999;background-color: #333;border: 2px solid #555;min-width: 15px;padding: 4px;border-radius: 3px;max-width: 250px;word-break: break-word;font-family: "Roboto", sans-serif;', document.onmousemove = e => {
					s.style.left = e.clientX - s.offsetWidth + 'px', s.style.top = e.clientY - 50 + 'px';
				}, document.querySelector('#nav').style.overflow = 'scroll', document.querySelector('#nav').style.scrollbarWidth = 'none', i.classList.add('mm'), i.innerHTML = `\n        <h1><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png" style="width: 45px;height: auto;" loading="lazy"></img> moPsEk</h1>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/icons8-wrench-100.png" style="width: 17px;height: auto;" loading="lazy"></img> General <span style="font-size:10px; color: #888">Too high values can result in a bugged display. (But still counts)</span></h1>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Money<span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Changes your current money.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_sm>Set</button><input class="input" placeholder="Money" style="float: right;" data-mm_smi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set XP<span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Changes your current XP.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_sxp>Set</button><input class="input" placeholder="XP" style="float: right;" data-mm_sxpi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Tokens<span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Changes your current tokens.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_stks>Set</button><input class="input" placeholder="Tokens" style="float: right;" data-mm_stksi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Tickets<span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Changes your tickets.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_stk>Set</button><input class="input" placeholder="Tickets" style="float: right;" data-mm_stki>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Money per Click<span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Changes the amount of money you get per click.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_mpc>Set</button><input class="input" placeholder="Min" style="float: right;" data-mm_mpcmi><input class="input" placeholder="Max" style="float: right;" data-mm_mpcxi>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Passive income <span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Unlocks and finishes all achievements.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_spin>Set</button><input class="input" placeholder="Passive Income" style="float: right;" data-mm_pini>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Set Offline income <span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Changes the amount of the offline income.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_spin>Set</button><input class="input" placeholder="Offline Income" style="float: right;" data-mm_pini>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Give all items<span data-info='Will refresh your page & might cause lags or slow down the page.' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Gives you every item (Knives, Skins, Cases, ...).</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_gait>Give</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Give all achievements <span data-info='Will refresh your page!' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Unlocks and finishes all achievements.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_gaac>Give</button>\n           </div>\n        </div>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/icons8-cloud-folder-90.png" style="width: 17px;height: auto;" loading="lazy"></img> Data Managment</h1>\n        <div class="upgrade">\n           <div class="upgrade-title">Export Data</div>\n           <div class="upgrade-desc">Export your current client data.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_excd_en>Encoded</button>\n               <button class="button" style="float: right;position: static;" data-mm_excd_rw>Raw</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Import Data</div>\n           <div class="upgrade-desc">Import your saved client data.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_imd_en>Import</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Create backup</div>\n           <div class="upgrade-desc">Creates a backup of your current data.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_cbup>Create</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Load backup</div>\n           <div class="upgrade-desc">Loads your recent created backup.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button" style="float: right;position: static;" data-mm_delbup>Load</button>\n           </div>\n        </div>\n        <div class="upgrade">\n           <div class="upgrade-title">Wipe Data <span data-info='Will open/close seperate tabs! Be sure popups are allowed. If it doesnt work, do it again.' style="position: absolute;height: 15px;width: 15px;background: #333;border-radius: 1ex;margin-left: 5px;padding: 1px;"><img style="width: 100%;height: auto;/*! text-align: center;" src='https://raw.githubusercontent.com/mopsfl/moPsEk/main/assets/icons8-exclamation-mark-90.png' alt='!'></img></span></div>\n           <div class="upgrade-desc">Wipes all your game data.</div>\n           <div style="position: absolute;top: 14px;right: 0;">\n               <button class="button red" style="float: right;position: static;" data-mm_wipd>Wipe</button>\n           </div>\n        </div>\n        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png" style="width: 17px;height: auto;" loading="lazy"></img> moPsEk</h1>\n        <div class="upgrade">\n           <p class="upgrade-desc">Script Version<span style="float:right">v.${ GM_info.script.version }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Author <span style="float:right; user-select:text">${ GM_info.script.author }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Automatic Update<span style="float:right; user-select:text">${ 1 == GM_info.script.options.check_for_updates ? 'Yes' : 'No' }</span></p>\n        </div>\n        <div class="upgrade">\n           <p class="upgrade-desc">Client UUID <span style="float:right; user-select:text">${ localStorage._moPsEk_uuid }</span></p>\n        </div>\n        `, document.querySelector('#nav').appendChild(n), document.querySelector('#pages').appendChild(i), n.innerHTML = '<img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png"></img> moPsEk', n.onclick = () => {
					document.querySelectorAll('.page').forEach(e => e.classList.remove('show')), i.classList.add('show');
				}, i.querySelectorAll('[data-info]').forEach(e => {
					const t = e.attributes['data-info'].nodeValue;
					e.onmouseenter = e => {
						document.body.appendChild(s), s.innerText = t;
					}, e.onmouseleave = e => {
						document.body.removeChild(s), s.innerText = '';
					};
				});
				const l = {
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
					loadBackup: { btn: document.querySelector('[data-mm_delbup]') },
					giveAllAchievements: { btn: document.querySelector('[data-mm_gaac]') },
					setMoneyPerClick: {
						btn: document.querySelector('[data-mm_mpc]'),
						min: document.querySelector('[data-mm_mpcmi]'),
						max: document.querySelector('[data-mm_mpcxi]')
					},
					setPassiveIncome: {
						btn: document.querySelector('[data-mm_spin]'),
						input: document.querySelector('[data-mm_pini]')
					}
				};
				l.setMoney.btn.onclick = () => {
					if (!isNaN(l.setMoney.input) || '' == l.setMoney.input)
						return;
					const t = 100 * parseInt(l.setMoney.input.value);
					return e.money = t, h(`Set money to ${ t }.`, 'green'), g(!0);
				}, l.setXP.btn.onclick = () => {
					if (!isNaN(l.setXP.input) || '' == l.setXP.input)
						return;
					const t = parseInt(l.setXP.input.value);
					return e.xp = t, h(`Set xp to ${ t }.`, 'green'), g(!0);
				}, l.setTokens.btn.onclick = () => {
					if (!isNaN(l.setTokens.input) || '' == l.setTokens.input)
						return;
					const t = parseInt(l.setTokens.input.value);
					return e.tokens = t, h(`Set tokens to ${ t }.`, 'green'), g(!0);
				}, l.setTickets.btn.onclick = () => {
					if (!isNaN(l.setTickets.input) || '' == l.setTickets.input)
						return;
					const t = parseInt(l.setTickets.input.value);
					return e.tickets = t, h(`Set tickets to ${ t }.`, 'green'), g(!0);
				}, l.giveAllItems.btn.onclick = () => {
					c = 0, m = 0, v("Fetching all item lists. This may take a few seconds. (Page will refresh after It's finished)"), d.forEach(e => {
						++c, fetch(`https://csgo.mtsl.dk/data/items/${ e }.json?v=15`).then(e => e.json()).then(o => {
							++m, Object.keys(o).forEach(async e => {
								await t.push(e);
							}), h(`Fetching item list '${ e }'.`, 'yellow'), m == d.length && (h('Successfully fetched all item lists.', 'green'), v('Successfully fetched all item lists.'), g(!0));
						});
					}), h(`Fetching ${ c } item lists.`, 'yellow');
				}, l.exportData.btn.onclick = () => {
					const e = p(a());
					return e ? y(`mtslData_${ localStorage._moPsEk_uuid }.encoded`, 'txt', e) : h('Unable to encode current client data', 'red');
				}, l.exportData.btn2.onclick = () => {
					const e = a();
					return e ? y(`mtslData_${ localStorage._moPsEk_uuid }.raw`, 'txt', JSON.stringify(e, null, 2)) : (h('Unable to get current client data', 'red'), void v('Unable to get current client data.', null, 'red'));
				}, l.importData.btn.onclick = () => {
					var t = document.createElement('input');
					t.type = 'file', t.click(), t.onchange = o => {
						var n = new FileReader(), i = t.files[0];
						n.onload = function () {
							var o = n.result;
							if (!o)
								return h(`Unable to get file text from '${ i.name }'`, 'red');
							console.log(o), console.log(i), h(`Loaded file '${ t.files[0].name }' with an size of ${ function (e) {
								var t = e;
								return t < 1024 ? t + 'B' : t < 1048576 ? (t / 1024).toFixed(2) + 'KB' : t < 1073741824 ? (t / 1024 * 1024).toFixed(2) + 'MB' : t < 1099511627776 ? (t / 1024 * 1024 * 1024).toFixed(2) + 'GB' : (t / 1024 * 1024 * 1024 * 1024).toFixed(2) + 'TB';
							}(i.size) }`, 'green');
							try {
								let t = JSON.parse(o);
								e = t, h('Imported raw data.', 'green'), v('Data imported sucessfully!'), g(!0);
							} catch (t) {
								try {
									let t = JSON.parse(r(o));
									e = t, h('Imported encoded data.', 'green'), v('Data imported sucessfully!'), g(!0);
								} catch (e) {
									h('Unable to decode data file.', 'red'), v('Unable to decode data file!', null, 'red');
								}
							}
						}, n.readAsText(i);
					};
				}, l.wipeData.btn.onclick = () => {
					window.open('/esr'), window.close(), GM_setValue('moPsEk.wipeData', !0);
				}, l.createBackup.btn.onclick = () => {
					const e = p(a());
					return e ? (GM_setValue(`moPsEk_${ localStorage._moPsEk_uuid }.backup`, e), v('Sucessfully created local backup.'), h('Sucessfully created local backup.', 'green')) : h('Unable to get current local data', 'red');
				}, l.loadBackup.btn.onclick = () => {
					const e = GM_getValue(`moPsEk_${ localStorage._moPsEk_uuid }.backup`);
					return e ? (localStorage['moPsEk_' + localStorage._moPsEk_uuid] = e, v('Sucessfully loaded local backup!'), h('Sucessfully loaded local backup.', 'green'), g(!0)) : h('Unable to get current backup data', 'red');
				}, l.giveAllAchievements.btn.onclick = () => {
					if (u = 0, !p(a()))
						return h('Unable to get current local data', 'red');
					v("Loading all achievements. (Page will refresh after It's finished)"), h(`Loading ${ Object.keys(o).length } achievements.`, 'yellow'), console.log(Object.keys(o)), Object.keys(o).forEach(t => {
						++u, h(t, 'yellow'), e.achievements[t] = !0, u == Object.keys(o).length && (v('All achievements given successfully.'), h('All achievements loaded successfully.', 'green'), console.log(e), g(!0));
					});
				}, l.setMoneyPerClick.btn.onclick = () => {
					if (!p(a()))
						return h('Unable to get current local data', 'red');
					let t = l.setMoneyPerClick.min.value.replace(/\D/g, ''), o = l.setMoneyPerClick.max.value.replace(/\D/g, '');
					if (!parseInt(Number(t) | Number(o)))
						return h('Unable to parse numbers for min|max', 'red'), void v('This input is invalid.', null, 'red');
					h(`Set clicks per second to [${ t } - ${ t }]`, 'green'), e.upgrades.minClick = 100 * parseInt(t), e.upgrades.maxClick = 100 * parseInt(o), g(!0);
				}, l.setPassiveIncome.btn.onclick = () => {
					if (!p(a()))
						return h('Unable to get current local data', 'red');
					let t = l.setPassiveIncome.input.value.replace(/\D/g, '');
					if (NaN == Number(t))
						return h('Unable to parse number for passiveIncome', 'red'), void v('This input is invalid.', null, 'red');
					h(`Set passive income to [${ t }]`, 'green'), e.upgrades.passiveIncome = 100 * parseInt(t), g(!0);
				}, h(`moPsEk v.${ GM_info.script.version } initalized sucessfully! Client UUID : ${ localStorage._moPsEk_uuid }`, 'green'), v(`moPsEk v.${ GM_info.script.version } initalized sucessfully!`, !0);
			}(), fetch('https://raw.githubusercontent.com/mopsfl/moPsEk/main/games/csgo.mtsl.dk/compatible_versions.json').then(e => e.json()).then(e => {
				let t = document.querySelector('#version-version').innerText;
				e.compatible_versions.includes(t) ? h(`Game Version '${ t }' compatible!`, 'green') : (h('This game version might not be fully compatible with moPsEk.', 'red'), alert("moPsEk Info\n\nThis game version might not be fully compatible with moPsEk.\nBe sure it's up to date!")), 'document-start' != GM_info.script.options.run_at && (GM_setClipboard('// @run-at       document-start'), alert("moPsEk Info\n\n@run-at is not set to 'document-start'\nThis might cause the mod menu to not work correctly.\n\nAdd the string in your clipboard to the script."));
			});
		};
	} catch (e) {
		h('Unable to load moPsEk', 'red'), h(e, 'red');
	}
}();
