import moment from 'moment';
import 'moment/locale/ja';

moment.locale('ja');

function getContestName(isBeta, url) {
    return isBeta ? url.split("/")[4] : url.split("/")[2].split(".")[0];
}

function getDivision(contestName) {
    var division;
    if (contestName.indexOf('abc') != -1 || contestName.indexOf('ABC') != -1) division = 'ABC';
    else if (contestName.indexOf('arc') != -1 || contestName.indexOf('ARC') != -1) division = 'ARC';
    else if (contestName.indexOf('agc') != -1 || contestName.indexOf('AGC') != -1) division = 'AGC';
    else division = contestName.toUpperCase();
    return division;
}

function getTimes(division, contestName) {
    var times;
    if (division === "ABC" || division === "ARC" || division === "AGC") times = contestName.replace(/[^0-9]/g, "");
    else times = "000";
    return times;
}

function getLevel() {
    let level = $("#main-container").find(".col-sm-12").eq(1).find(".h2").eq(0).text()[0];
    return level;
}

function getTitle(elem) {
    let title = $("#main-container").find(".col-sm-12").eq(1).find(".h2").eq(0).text();
    title = title.slice(4);
    return title;
}

function getDate() {
    return Date.now();
}

function getProblemURL() {
    let problemURL = location.href;
    return problemURL;
}

//AtCoderの情報を含むオブジェクト
function AtCoderObject(division, times, level, title, contestName, url, date) {
    this.division = division;
    this.times = times;
    this.level = level;
    this.title = title;
    this.contestName = contestName;
    this.url = url;
    this.date = date;
    this.id = division + times + level;
}

//ページのAtCoderのオブジェクトを作成する
function makeAtCoderObject(url, contestName) {
    let atCoderObject = {};
    let division = getDivision(contestName);
    let times = getTimes(division, contestName);
    let level = getLevel();
    let title = getTitle();
    let date = getDate();
    let problemURL = getProblemURL();
    atCoderObject = new AtCoderObject(division, times, level, title, contestName, url, date);
    return atCoderObject;
}

//ページのコラムに書き込む
function drawButton(url, contestName, atCoderObject, items) {
    $("#main-container").find(".col-sm-12").eq(0).find("ul").eq(0).append("<li><a></a></li>");
    let id = atCoderObject.id;

    let $checkbox = $('<input type="checkbox" />').attr({id: id, value: id, name: "ckbx-style-12"});
    for (var j = 0; j < items['atcoder'].length; j++) if (items['atcoder'][j].id === id) $checkbox.prop('checked', true);

    let $div = $('<div></div>');
    $div.addClass('ckbx-style-12');
    $div.append($checkbox);
    $div.append($('<label></label>').attr({'for': id}));

    $("#main-container").find(".col-sm-12").eq(0).find("ul").eq(0).children("li").last().children("a").eq(0).append($div);

    $('#' + id).change(function(){
        let prop = $('#' + id).prop('checked');
        if (prop) {
            chrome.storage.local.get((items) => {
                items['atcoder'].push(atCoderObject);
                let newAtCoderObjects = {};
                let newAtCoderArray = [];
                for (var j = 0; j < items.atcoder.length; j++) newAtCoderObjects[items.atcoder[j]['id']] = items.atcoder[j];
                for (var x in newAtCoderObjects) newAtCoderArray.push(newAtCoderObjects[x]);
                items['atcoder'] = newAtCoderArray;
                chrome.storage.local.set(items);
            })
        } else {
            chrome.storage.local.get((items) => {
                let atCoderArray = items['atcoder'];
                let newAtCoderArray = atCoderArray.filter(value => {
                    return id != value.id
                });
                items['atcoder'] = newAtCoderArray;
                chrome.storage.local.set(items);
            })
        }
    })
}

//ページのテーブルに書き込む
function drawTable(url, contestName, atCoderObjects, items) {
    $("table thead tr").append('<th width="5%">Book</th>');
    $("table tbody tr").each(function (i, elem) {
        var id = atCoderObjects[i].id;

        var $checkbox = $('<input type="checkbox" />').attr({id: id, value: "" + i, name: "ckbx-style-12"});
        for (var j = 0; j < items['atcoder'].length; j++) if (items['atcoder'][j].id === id) $checkbox.prop('checked', true);

        var $div = $('<div></div>');
        $div.addClass('ckbx-style-12');
        $div.append($checkbox);
        $div.append($('<label></label>').attr({'for': id}));

        var $td = $('<td></td>').append($div);
        $(elem).append($td);

        $('#' + id).change(function () {
            var prop = $('#' + id).prop('checked');
            var atCoderObject = atCoderObjects[i];
            if (prop) {
                chrome.storage.local.get((items) => {
                    items['atcoder'].push(atCoderObject);
                    var newAtCoderObjects = {};
                    var newAtCoderArray = [];
                    for (var j = 0; j < items.atcoder.length; j++) newAtCoderObjects[items.atcoder[j]['id']] = items.atcoder[j];
                    for (var x in newAtCoderObjects) newAtCoderArray.push(newAtCoderObjects[x]);
                    items['atcoder'] = newAtCoderArray;
                    chrome.storage.local.set(items);
                })
            } else {
                chrome.storage.local.get((items) => {
                    var atCoderArray = items['atcoder'];
                    var newAtCoderArray = atCoderArray.filter(value => {
                        return id != value.id
                    });
                    items['atcoder'] = newAtCoderArray;
                    chrome.storage.local.set(items);
                })
            }
        });
    });
}

$(function () {

    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL('./../styles/checkboxes.css');
    (document.head || document.documentElement).appendChild(style);

    let url = location.href;
    let isBeta = url.search("beta") >= 0;
    let contestName = getContestName(isBeta, url);

    chrome.storage.local.get((items) => {
        if (!items['atcoder']) {
            items['atcoder'] = [];
            chrome.storage.local.set(items);
        }
        let atCoderObject = makeAtCoderObject(url, contestName);
        drawButton(url, contestName, atCoderObject, items);
    });

});










































