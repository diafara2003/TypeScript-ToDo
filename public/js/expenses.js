"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expenses = exports.ArrayList = void 0;
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.items = [];
    }
    ArrayList.prototype.add = function (item) {
        this.items.push(item);
    };
    ArrayList.prototype.get = function (index) {
        var item = this.items.filter(function (x, i) {
            return i === index;
        });
        if (item.length === 0)
            return null;
        else
            return item[0];
    };
    ArrayList.prototype.getAll = function () {
        return this.items;
    };
    return ArrayList;
}());
exports.ArrayList = ArrayList;
var Expenses = /** @class */ (function () {
    function Expenses(currency) {
        this.count = 0;
        this.finalCurrency = currency;
        this.espenses = new ArrayList();
    }
    Expenses.prototype.add = function (item) {
        item.id = this.count;
        this.count++;
        this.espenses.add(item);
        return true;
    };
    Expenses.prototype.get = function (index) {
        return this.espenses.get(index);
    };
    Expenses.prototype.getAll = function () {
        return this.espenses.getAll();
    };
    Expenses.prototype.getTotal = function () {
        var _this = this;
        var total = this.getAll().reduce(function (acumulador, item) {
            return acumulador += _this.ConvertCurrency(item, _this.finalCurrency);
        }, 0);
        return this.finalCurrency + " " + total.toFixed(2).toString();
    };
    Expenses.prototype.remove = function (id) {
        throw new Error("Method not implemented.");
    };
    Expenses.prototype.ConvertCurrency = function (item, currency) {
        var _factor = 3850;
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'COL': return item.cost.cost * _factor;
                    default: return item.cost.cost;
                }
                break;
            case 'COL':
                switch (currency) {
                    case 'USD': return item.cost.cost / _factor;
                    default: return item.cost.cost;
                }
                break;
            default: return 0;
        }
    };
    return Expenses;
}());
exports.Expenses = Expenses;
