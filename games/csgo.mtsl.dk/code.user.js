// ==UserScript==
// @name         moPsEk - CSGO MTSL 2
// @namespace    http://tampermonkey.net/
// @description  moPsEk for CSGO MTSL Version 2
// @description:de moPsEk pour CSGO MTSL version 2
// @description:fr moPsEk
// @author       mopsfl
// @version      0.1
// @license      MIT
// @match        *://csgo.mtsl.dk/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mtsl.dk
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_download
// @grant        window.onurlchange
// @updateURL    https://github.com/mopsfl/moPsEk/raw/main/games/csgo.mtsl.dk/code.user.js
// @downloadURL  https://github.com/mopsfl/moPsEk/raw/main/games/csgo.mtsl.dk/code.user.js
// ==/UserScript==
(function () {
	'use strict';
	let a = "asddddddddddddddhauergtpaesyrtasdddddddddddddhauergtpaesyrtddddddhauergtpaesyrtdddddddddddhauergtpaesyrthzdddddddddddhauergtpaesyrthz"
	a=a||""
	let user = {
		money: 240,
		tickets: 0,
		tokens: 0,
		xp: 0,
		stats: { creation: new Date().getTime() },
		inventory: ['Spectrum Case'],
		upgrades: {},
		achievements: {},
		achievements_collected: {},
		luckyWheelWins: []
	};

	//DATA MANAGMENT
    let S={"=":"0","!":"1","?":"2",$:"3","%":"4","&":"5","/":"6","\\":"7","-":"8","+":"9"},w=Object.keys(S).join(""),v={0:"=",1:"!",2:"?",3:"$",4:"%",5:"&",6:"/",7:"\\",8:"-",9:"+"};function getUser(){return JSON.parse(y(localStorage.localsave))}function f(o){return decodeURIComponent(o.split("").map((function(o){return"%"+("00"+o.charCodeAt(0).toString(16)).slice(-2)})).join(""))}function y(o){let e=[],t="";for(let n=0;n<o.length;n++){let c=o[n];c.match(/[A-Z]/)||w.includes(c)?(t+=w.includes(c)?S[c]:c.toLowerCase(),e.push(parseInt(t,36)),t=""):t+=c}let n,c={},l=String.fromCharCode(e[0]),s=l,i=[l],r=256;for(let o=1;o<e.length;o++){let t=e[o];n=t<256?String.fromCharCode(e[o]):c[t]?c[t]:s+l,i.push(n),l=n[0],c[r]=s+l,r++,s=n}return f(i.join(""))}function m(o){return encodeURIComponent(o).replace(/%([0-9A-F]{2})/g,(function(o,e){return String.fromCharCode("0x"+e)}))}function h(o){let e,t={},n=((o=m(o))+"").split(""),c=[],l=n[0],s=256;for(let o=1;o<n.length;o++)e=n[o],null!=t[l+e]?l+=e:(c.push(l.length>1?t[l]:l.charCodeAt(0)),t[l+e]=s,s++,l=e);return c.push(l.length>1?t[l]:l.charCodeAt(0)),c.map((o=>{let e=o.toString(36);return e.substring(0,e.length-1)+(e[e.length-1].match(/[0-9]/)?v[e[e.length-1]]:e[e.length-1].toUpperCase())})).join("")}function c_mmid(o){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t.length,c=0;c<o;c++)e+=t.charAt(Math.floor(Math.random()*n));return e}let ic=0,liit=0;var itemNames=["bravo","breakout","brokenfang","cs20","csgoweapon","csgoweapon2","csgoweapon3","falchion","fracture","gamma","horizon","huntsman","phoenix","prisma","prisma2","spectrum","spectrum2","winteroffensive","snakebite","gamma2","clutch","chroma","chroma2","chroma3","shadow","collections/assault","collections/aztec","collections/dust","collections/inferno","collections/militia","collections/nuke","collections/office","collections/vertigo","vanguard","revolver","wildfire","glove","hydra","dangerzone","shatteredweb","collections/risingsun","collections/stmarc","collections/overpass","collections/norse","collections/mirage","collections/cobblestone","collections/havoc","collections/godsandmonsters","collections/alpha","collections/ancient","collections/baggage","collections/bank","collections/cache","collections/canals","collections/chopshop","collections/control","collections/dust2","collections/dust22021","collections/inferno2018","collections/italy","collections/lake","collections/mirage2021","collections/nuke2018","collections/safehouse","collections/train","collections/train2021","collections/vertigo2021","riptide","doppler-phases/phases","esports2013","esports2013winter","esports2014summer","dreamsandnightmares"];

    //SETUP
	try {
		if (!localStorage.getItem('_mmid')) {
			localStorage.setItem('_mmid', c_mmid(10));
            log('Mod menu client mmid created sucessfully!', 'yellow');
		}
		if (!localStorage.getItem('mm_' + localStorage._mmid)) {
            localStorage.setItem('mm_' + localStorage._mmid, getSaveDataString(getUser()));
            log('Mod menu client savedata created sucessfully!', 'yellow');
		}
        localStorage.localsave = localStorage['mm_' + localStorage._mmid];
        log(`Mod menu setup sucessfully! mmid : ${localStorage._mmid}`, 'green');
	} catch (e) {
        console.error(e)
        log('Unable to setup mod menu!', 'red');
	}

	function getSaveDataString() {
		const a = h(JSON.stringify(user));
		return a;
	}

	function save(r) {
		localStorage['mm_' + localStorage._mmid] = getSaveDataString();
		if (r) return location.reload();
	}

	//MAIN
	user = getUser();
	function log(message, color) {
		console.info(`%c${ message }`, `background-color:black;padding:5px;border-left:solid 4px ${ color };color:white`);
	}

    function dlFile(e, t, n) {
        if (!(e ?? t ?? n))
        return log('Could not create file. (Missing attr)', 'red');
        var d = document.createElement('a');
        d.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(n)), d.setAttribute('download', `${ e }.${ t }`), d.style.display = 'none', document.body.appendChild(d), d.click(), document.body.removeChild(d);
    }

    function byteToSize(e) {
        var t = e;
        return t < 1024 ? t + 'B' : t < 1048576 ? (t / 1024).toFixed(2) + 'KB' : t < 1073741824 ? (t / 1024 * 1024).toFixed(2) + 'MB' : t < 1099511627776 ? (t / 1024 * 1024 * 1024).toFixed(2) + 'GB' : (t / 1024 * 1024 * 1024 * 1024).toFixed(2) + 'TB';
    }

    function wipeData(){
        localStorage.clear()
        return save(true)
    }

	function initMenu() {
		const btnClone = document.querySelector('#nav>button').cloneNode(true);
		const pageClone = document.querySelector('.page').cloneNode(true);

        document.querySelector('#nav').style.overflow = "scroll"
        document.querySelector('#nav').style.scrollbarWidth = "none"

		pageClone.classList.add('mm');
		pageClone.innerHTML = `
        <h1>moPsEk</h1>
        <h1 style="font-size:20px;border-bottom:solid 1px gray">General</h1>
        <div class="upgrade">
           <div class="upgrade-title">Set Money</div>
           <div class="upgrade-desc">Change your current money to anything you'd like. <strong style="color:darkred">(This will refresh the page)</strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button" style="float: right;position: static;" data-mm_sm>Set</button><input class="input" placeholder="Money" style="float: right;" data-mm_smi>
           </div>
        </div>
        <div class="upgrade">
           <div class="upgrade-title">Set XP</div>
           <div class="upgrade-desc">Change your current XP to anything you'd like. <strong style="color:darkred">(This will refresh the page)</strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button" style="float: right;position: static;" data-mm_sxp>Set</button><input class="input" placeholder="XP" style="float: right;" data-mm_sxpi>
           </div>
        </div>
        <div class="upgrade">
           <div class="upgrade-title">Set Tokens</div>
           <div class="upgrade-desc">Change your current tokens to anything you'd like. <strong style="color:darkred">(This will refresh the page)</strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button" style="float: right;position: static;" data-mm_stks>Set</button><input class="input" placeholder="Tokens" style="float: right;" data-mm_stksi>
           </div>
        </div>
        <div class="upgrade">
           <div class="upgrade-title">Set Tickets</div>
           <div class="upgrade-desc">Change your tickets to anything you'd like. <strong style="color:darkred">(This will refresh the page)</strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button" style="float: right;position: static;" data-mm_stk>Set</button><input class="input" placeholder="Tickets" style="float: right;" data-mm_stki>
           </div>
        </div>
        <div class="upgrade">
           <div class="upgrade-title">Give all items</div>
           <div class="upgrade-desc">Gives you every item! <strong style="color:darkred">(Can cause lag & will refresh your page!)</strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button" style="float: right;position: static;" data-mm_gait>Give</button>
           </div>
        </div>
        <h1 style="font-size:20px;border-bottom:solid 1px gray">Data Managment</h1>
        <div class="upgrade">
           <div class="upgrade-title">Export Data</div>
           <div class="upgrade-desc">Export your current client data.<strong style="color:darkred"></strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button" style="float: right;position: static;" data-mm_excd_en>Encoded</button>
               <button class="button" style="float: right;position: static;" data-mm_excd_rw>Raw</button>
           </div>
        </div>
        <div class="upgrade">
           <div class="upgrade-title">Import Data</div>
           <div class="upgrade-desc">Import your saved client data. <strong style="color:darkred">(This will wipe your current process and replace it!)</strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button" style="float: right;position: static;" data-mm_imd_en>Import</button>
           </div>
        </div>
        <div class="upgrade">
           <div class="upgrade-title">Wipe Data</div>
           <div class="upgrade-desc">Wipes all your data saved in your browser. <strong style="color:darkred">(THIS WILL WIPE ALL OF YOUR CLIENT DATA SAVED IN LOCALSTORAGE!)</strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button red" style="float: right;position: static;" data-mm_wipd>Wipe</button>
           </div>
        </div>
        <h1 style="font-size:20px;border-bottom:solid 1px gray">moPsEk</h1>
        <div class="upgrade">
           <p class="upgrade-desc">Script Version: <span style="float:right">v.${GM_info.script.version}</span></p>
        </div>
        <div class="upgrade">
           <p class="upgrade-desc">Client ID: <span style="float:right; user-select:text">${localStorage._mmid}</span></p>
        </div>
        `;
		document.querySelector('#nav').appendChild(btnClone);
		document.querySelector('#pages').appendChild(pageClone);
		btnClone.innerText = 'Mod Menu';
		btnClone.onclick = () => {
			document.querySelectorAll('.page').forEach(e => e.classList.remove('show'));
			pageClone.classList.add('show');
		};
		//OPTIONS
		const options = {
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
            giveAllItems: {
				btn: document.querySelector('[data-mm_gait]')
			},
            exportData: {
				btn: document.querySelector('[data-mm_excd_en]'),
                btn2: document.querySelector('[data-mm_excd_rw]'),
			},
            importData: {
				btn: document.querySelector('[data-mm_imd_en]'),
			},
            wipeData: {
				btn: document.querySelector('[data-mm_wipd]'),
			},
		};

        //SET MONEY
		options.setMoney.btn.onclick = () => {
			if (!isNaN(options.setMoney.input) || options.setMoney.input == '') return;
			const value = parseInt(options.setMoney.input.value) * 100;
			user.money = value;
			log(`Set money to ${ value }.`, 'green');
			return save(true);
		};

        //SET XP
		options.setXP.btn.onclick = () => {
			if (!isNaN(options.setXP.input) || options.setXP.input == '') return;
			const value = parseInt(options.setXP.input.value);
			user.xp = value;
			log(`Set xp to ${ value }.`, 'green');
			return save(true);
		};

        //SET TOKENS
        options.setTokens.btn.onclick = () => {
			if (!isNaN(options.setTokens.input) || options.setTokens.input == '') return;
			const value = parseInt(options.setTokens.input.value);
			user.tokens = value;
			log(`Set tokens to ${ value }.`, 'green');
			return save(true);
		};

        //SET TICKETS
        options.setTickets.btn.onclick = () => {
			if (!isNaN(options.setTickets.input) || options.setTickets.input == '') return;
			const value = parseInt(options.setTickets.input.value);
			user.tickets = value;
			log(`Set tickets to ${ value }.`, 'green');
			return save(true);
		};

        //GIVE ALL ITEMS
        options.giveAllItems.btn.onclick = () => {
            ic=0
            liit = 0;
            itemNames.forEach(name => {
                ++ic;
                fetch(`https://csgo.mtsl.dk/data/items/${name}.json?v=15`).then(res => res.json()).then(data => {
                    user.inventory.push()
                    Object.keys(data).forEach(item => {
                        ++liit;
                        user.inventory.push(item)
                    })
                    log(`Fetching collection list '${name}'.`, "yellow")
                    save()
                })
            })

            log(`Fetching ${ic} collection lists.`, "yellow")
		};

        //EXPORT DATA
        options.exportData.btn.onclick = () => {
			const data = getSaveDataString(getUser())
            if(!data) return log("Unable to encode current client data", "red");

            return dlFile(`mtslData_${localStorage._mmid}.encoded`, "txt", data)
		};
        options.exportData.btn2.onclick = () => {
			const data = getUser()
            if(!data) return log("Unable to get current client data", "red");

            return dlFile(`mtslData_${localStorage._mmid}.raw`, "txt", JSON.stringify(data,null,2))
		};

        //IMPORT DATA
        options.importData.btn.onclick = () => {
			var input = document.createElement('input');
            input.type = 'file';
            input.click();

            input.onchange = (e) => {
                var reader = new FileReader();
                var file = input.files[0]

                reader.onload = function(){
                    var text = reader.result
                    if(!text) return log(`Unable to get file text from '${file.name}'`, "red")
                    console.log(text)
                    console.log(file)
                    log(`Loaded file '${input.files[0].name}' with an size of ${byteToSize(file.size)}`,"green")

                    try {
                        let json = JSON.parse(text);
                        user = json
                        log("Imported raw data.", "green")
                        save(true)
                    } catch(e){
                        try {
                            let json = JSON.parse(y(text))
                            user = json
                            log("Imported encoded data.", "green")
                            save(true)
                        } catch(e){
                            log("Unable to decode data file.", "red")
                        }
                    }
                };
                reader.readAsText(file);
            }
		};

        //WIPE DATA
        options.wipeData.btn.onclick = () => {
            wipeData()
        }
	}

	window.onload = () => initMenu();
}());
