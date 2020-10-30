"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expenses_1 = require("./expenses");
var btnAdd = document.querySelector('#btnAdd');
var txttitle = document.querySelector('#txttitle');
var txtcost = document.querySelector('#txtcost');
var ddlcurrency = document.querySelector('#ddlCurrency');
var expenses = new expenses_1.Expenses('USD');
btnAdd === null || btnAdd === void 0 ? void 0 : btnAdd.addEventListener('click', function (e) {
    if ((txttitle === null || txttitle === void 0 ? void 0 : txttitle.value) != '' && (txtcost === null || txtcost === void 0 ? void 0 : txtcost.value) != '') {
        var title = txttitle === null || txttitle === void 0 ? void 0 : txttitle.value;
        var currency = ddlcurrency === null || ddlcurrency === void 0 ? void 0 : ddlcurrency.value;
        var cost = parseFloat(txtcost.value);
        expenses.add({
            title: title,
            cost: {
                cost: cost,
                currency: currency
            }
        });
        render();
    }
    else
        alert('Campos obligatorios');
});
function render() {
    var html = '';
    expenses.getAll().forEach(function (c) {
        var id = c.id, title = c.title, cost = c.cost;
        html += "<div class=\"d-block\">\n       <div>\n       <span>" + cost.currency + "</span>\n       " + cost.cost + "\n       </div>\n       <div>" + title + "</div>\n       <div><button class=\"btn btn-danger\" data-id=\"" + id + "\">Eliminar</button></div>\n       </div>";
    });
    var _item = document.getElementById('items');
    if (_item != undefined)
        _item.innerHTML = html;
    $('#total').innerHTML = expenses.getTotal();
    $$('.btn-danger').forEach(function (c) {
        c.addEventListener('click', function (e) {
            var id = e.target.getAttribute('data-id');
            if (id != undefined) {
                expenses.remove(parseFloat(id));
                render();
            }
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
