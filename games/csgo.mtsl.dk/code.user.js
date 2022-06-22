// ==UserScript==
// @name         moPsEk - CSGO MTSL 2
// @namespace    http://tampermonkey.net/
// @description  moPsEk for CSGO MTSL Version 2
// @description:de moPsEk pour CSGO MTSL version 2
// @description:fr moPsEk
// @author       mopsfl
// @version      0.0.2
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
(function () {
	'use strict';

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
    let S={"=":"0","!":"1","?":"2",$:"3","%":"4","&":"5","/":"6","\\":"7","-":"8","+":"9"},w=Object.keys(S).join(""),v={0:"=",1:"!",2:"?",3:"$",4:"%",5:"&",6:"/",7:"\\",8:"-",9:"+"};function getUser(){return JSON.parse(y(localStorage.localsave))}function f(e){return decodeURIComponent(e.split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))}function y(e){let o=[],t="";for(let n=0;n<e.length;n++){let c=e[n];c.match(/[A-Z]/)||w.includes(c)?(t+=w.includes(c)?S[c]:c.toLowerCase(),o.push(parseInt(t,36)),t=""):t+=c}let n,c={},l=String.fromCharCode(o[0]),r=l,s=[l],i=256;for(let e=1;e<o.length;e++){let t=o[e];n=t<256?String.fromCharCode(o[e]):c[t]?c[t]:r+l,s.push(n),l=n[0],c[i]=r+l,i++,r=n}return f(s.join(""))}function m(e){return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(function(e,o){return String.fromCharCode("0x"+o)}))}function h(e){let o,t={},n=((e=m(e))+"").split(""),c=[],l=n[0],r=256;for(let e=1;e<n.length;e++)o=n[e],null!=t[l+o]?l+=o:(c.push(l.length>1?t[l]:l.charCodeAt(0)),t[l+o]=r,r++,l=o);return c.push(l.length>1?t[l]:l.charCodeAt(0)),c.map((e=>{let o=e.toString(36);return o.substring(0,o.length-1)+(o[o.length-1].match(/[0-9]/)?v[o[o.length-1]]:o[o.length-1].toUpperCase())})).join("")}function c_mmid(e){for(var o="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t.length,c=0;c<e;c++)o+=t.charAt(Math.floor(Math.random()*n));return o}let ic=0,liit=0;var itemNames=["bravo","breakout","brokenfang","cs20","csgoweapon","csgoweapon2","csgoweapon3","falchion","fracture","gamma","horizon","huntsman","phoenix","prisma","prisma2","spectrum","spectrum2","winteroffensive","snakebite","gamma2","clutch","chroma","chroma2","chroma3","shadow","collections/assault","collections/aztec","collections/dust","collections/inferno","collections/militia","collections/nuke","collections/office","collections/vertigo","vanguard","revolver","wildfire","glove","hydra","dangerzone","shatteredweb","collections/risingsun","collections/stmarc","collections/overpass","collections/norse","collections/mirage","collections/cobblestone","collections/havoc","collections/godsandmonsters","collections/alpha","collections/ancient","collections/baggage","collections/bank","collections/cache","collections/canals","collections/chopshop","collections/control","collections/dust2","collections/dust22021","collections/inferno2018","collections/italy","collections/lake","collections/mirage2021","collections/nuke2018","collections/safehouse","collections/train","collections/train2021","collections/vertigo2021","riptide","doppler-phases/phases","esports2013","esports2013winter","esports2014summer","dreamsandnightmares"];function uuidv4(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)))}

    //FUNCTIONS

	function getSaveDataString() {
		const a = h(JSON.stringify(user));
		return a;
	}

	function save(r) {
		localStorage['moPsEk_' + localStorage._moPsEk_uuid] = getSaveDataString();
		if (r) return location.reload();
	}

	//MAIN

	user = getUser();

	function log(message, color) {
		console.info(`%c${ message }`, `background-color:black;padding:5px;border-left:solid 4px ${ color };color:white`);
	}

    function dlFile(e, t, n) {
        if (!(e ?? t ?? n)) return log('Could not create file. (Missing attr)', 'red');
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
        <h1><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png" style="width: 45px;height: auto;" loading="lazy"></img> moPsEk</h1>
        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/icons8-wrench-100.png" style="width: 17px;height: auto;" loading="lazy"></img> General</h1>
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
        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/icons8-cloud-folder-90.png" style="width: 17px;height: auto;" loading="lazy"></img> Data Managment</h1>
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
           <div class="upgrade-desc">Wipes all your data saved in your browser. <strong style="color:darkred">(This will delete all your data stored in the localstorage!)</strong></div>
           <div style="position: absolute;top: 14px;right: 0;">
               <button class="button red" style="float: right;position: static;" data-mm_wipd>Wipe</button>
           </div>
        </div>
        <h1 style="font-size:20px;border-bottom:solid 1px gray"><img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png" style="width: 17px;height: auto;" loading="lazy"></img> moPsEk</h1>
        <div class="upgrade">
           <p class="upgrade-desc">Script Version<span style="float:right">v.${GM_info.script.version}</span></p>
        </div>
        <div class="upgrade">
           <p class="upgrade-desc">Author <span style="float:right; user-select:text">${GM_info.script.author}</span></p>
        </div>
        <div class="upgrade">
           <p class="upgrade-desc">Automatic Update<span style="float:right; user-select:text">${GM_info.script.options.check_for_updates == true ? "Yes" : "No" }</span></p>
        </div>
        <div class="upgrade">
           <p class="upgrade-desc">Client UUID <span style="float:right; user-select:text">${localStorage._moPsEk_uuid}</span></p>
        </div>
        `;
		document.querySelector('#nav').appendChild(btnClone);
		document.querySelector('#pages').appendChild(pageClone);
		btnClone.innerHTML = '<img src="https://github.com/mopsfl/moPsEk/raw/main/assets/bulldog--v2.png%202x.png"></img> moPsEk';
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

            return dlFile(`mtslData_${localStorage._moPsEk_uuid}.encoded`, "txt", data)
		};
        options.exportData.btn2.onclick = () => {
			const data = getUser()
            if(!data) return log("Unable to get current client data", "red");

            return dlFile(`mtslData_${localStorage._moPsEk_uuid}.raw`, "txt", JSON.stringify(data,null,2))
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

    //SETUP
    try{
        log('Initalizing moPsEk', 'yellow');
		if (!localStorage.getItem('_moPsEk_uuid')) {
			localStorage.setItem('_moPsEk_uuid', uuidv4());
            log('moPsEk client uuid created sucessfully!', 'green');
		}
		if (!localStorage.getItem('moPsEk_' + localStorage._moPsEk_uuid)) {
            localStorage.setItem('moPsEk_' + localStorage._moPsEk_uuid, getSaveDataString(getUser()));
            log('moPsEk client savedata created sucessfully!', 'green');
		}
        localStorage.localsave = localStorage['moPsEk_' + localStorage._moPsEk_uuid];
        log(`moPsEk setup sucessfully! Client UUID : ${localStorage._moPsEk_uuid}`, 'green');

        window.onload = () => {
            initMenu()
            fetch("https://raw.githubusercontent.com/mopsfl/moPsEk/main/games/csgo.mtsl.dk/compatible_versions.json")
                .then(res => res.json())
                .then(data => {
                 let game_version = document.querySelector("#version-version").innerText

                 if(!data.compatible_versions.includes(game_version)){
                     log("This game version might not be fully compatible with moPsEk.", "red")
                     alert("moPsEk Info\n\nThis game version might not be fully compatible with moPsEk.\nBe sure it's up to date!")
                 } else log(`Game Version '${game_version}' compatible!`, 'green');

                if(GM_info.script.options.run_at != "document-start"){
                    GM_setClipboard("// @run-at       document-start")
                    alert("moPsEk Info\n\n@run-at is not set to 'document-start'\nThis might cause the mod menu to not work correctly.\n\nAdd the string in your clipboard to the script.")
                }
            })
        };
    } catch(e){
        log("Unable to load moPsEk","red")
        log(e, "red")
    }
}());
