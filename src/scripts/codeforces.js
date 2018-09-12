import moment from 'moment';
import 'moment/locale/ja';

moment.locale('ja');

function getContestTime(url) {
    let contestTime = url.split("/")[4];
    return contestTime;
}

function getContestName() {
    let contestName = $("#sidebar").find("table").eq(0).find("th").eq(0).children().eq(0).text();
    contestName = contestName.replace("Codeforces", "");
    contestName = contestName.replace("codeforces", "");
    return contestName;
}

function getContestRound() {
    let contestRound = $("#sidebar").find("table").eq(0).find("th").eq(0).children().eq(0).text();
    contestRound = contestRound.match(/Round +.\d+/);
    if (!contestRound) return "None";
    contestRound = (contestRound[0].replace("Round", "")).trim();
    return contestRound;
}

function getLevel(elem) {
    let level = $(elem).children().eq(0).children().eq(0).text();
    return level.trim();
}

function getTitle(elem) {
    let title = $(elem).children().eq(1).find("a").eq(0).text();
    return title;
}

function getProblemUrl(elem) {
    let problemUrl = $(elem).children().eq(1).find("a").eq(0).attr("href");
    return "http://codeforces.com" + problemUrl;
}

function getSolvedPeople(elem) {
    let solvedPeople = $(elem).children().eq(3).find("a").eq(0).text();
    return solvedPeople.substr(2);
}

function getDate() {
    return Date.now();
}

function CodeforcesObject(contestTime, contestRound, contestName, problemUrl, level, title, solvedPeople, date) {
    this.contestTime = contestTime;
    this.contestRound = contestRound;
    this.contestName = contestName;
    this.url = problemUrl;
    this.level = level;
    this.title = title;
    this.solvedPeople = solvedPeople;
    this.date = date;
    this.id = contestTime + level;
}

function makeCodeforcesObjects(url, contestTime, contestName, contestRound) {
    let codeforcesObjects = [];
    $("#pageContent table tbody").eq(0).children().each(function (_i, elem) {
        if (_i == 0) return;
        let level = getLevel(elem);
        let title = getTitle(elem);
        let problemUrl = getProblemUrl(elem);
        let solvedPeople = getSolvedPeople(elem);
        let date = getDate();
        codeforcesObjects.push(new CodeforcesObject(contestTime, contestRound, contestName, problemUrl, level, title, solvedPeople, date));
    })
    return codeforcesObjects;
}

function drawTable(codeforcesObjects, items) {
    let $tbody = $("#pageContent table tbody").eq(0);
    $tbody.children().eq(0).append("<th style='width: 5rem' class='top right'>Book</th>");
    $tbody.children().each(function (_, elem) {
        if (_ != 0) {
            if (_ % 2 == 1) $(elem).append("<td class='dark'></td>");
            else $(elem).append("<td></td>")
        }
    });
    $tbody.children().each(function (_, elem) {
        ($(elem).children().eq(3).removeClass('right'));
    });
    $tbody.children().each(function (_, elem) {
        if (_ == 0) return;
        let i = _ - 1;
        let id = codeforcesObjects[i].id;

        let $checkbox = $('<input type="checkbox" />').attr({id: id, value: "" + i, name: "ckbx-style-12"});
        for (let j = 0; j < items['codeforces'].length; j++) if (items['codeforces'][j].id === id) $checkbox.prop('checked', true);

        let $div = $('<div></div>');
        $div.addClass('ckbx-style-12');
        $div.append($checkbox);
        $div.append($('<label></label>').attr({'for': id}));

        $(elem).children().eq(4).append($div);

        $('#' + id).change(function () {
            let prop = $('#' + id).prop('checked');
            let codeforcsObject = codeforcesObjects[i];
            if (prop) {
                chrome.storage.local.get((items) => {
                    items['codeforces'].push(codeforcsObject);
                    let newCodeforcesObjects = {};
                    let newCodeforcesArray = [];
                    for (let j = 0; j < items.codeforces.length; j++) newCodeforcesObjects[items.codeforces[j]['id']] = items.codeforces[j];
                    for (let x in newCodeforcesObjects) newCodeforcesArray.push(newCodeforcesObjects[x]);
                    items['codeforces'] = newCodeforcesArray;
                    chrome.storage.local.set(items);
                })
            } else {
                chrome.storage.local.get((items) => {
                    let codeforcesArray = items['codeforces'];
                    let newCodeforcesArray = codeforcesArray.filter(value => {
                        return id != value.id
                    });
                    items['codeforces'] = newCodeforcesArray;
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
    let contestTime = getContestTime(url);
    let contestName = getContestName();
    let contestRound = getContestRound();

    chrome.storage.local.get((items) => {
        if (!items['codeforces']) {
            items['codeforces'] = [];
            chrome.storage.local.set(items);
        }
        let codeforcesObjects = makeCodeforcesObjects(url, contestTime, contestName, contestRound);
        drawTable(codeforcesObjects, items);
    });

});










































