
import { Currency, Expenses } from "./expenses.js";

const btnAdd = document.querySelector('#btnAdd') as HTMLButtonElement;
const txttitle = <HTMLInputElement>document.querySelector('#txttitle');
const txtcost: HTMLInputElement | null = document.querySelector('#txtcost');
const ddlcurrency: HTMLOptionElement | null = document.querySelector('#ddlCurrency');

const expenses = new Expenses('USD');



btnAdd?.addEventListener('click', e => {
    if (txttitle?.value != '' && txtcost?.value != '') {
        const title: string = txttitle?.value;
        const currency: Currency = <Currency>ddlcurrency?.value;
        const cost: number = parseFloat(txtcost!.value);

        expenses.add({
            title: title,
            cost: {
                cost: cost,
                currency: currency
            }
        });

        render();
    } else alert('Campos obligatorios');
});


function render(): void {
    let html = '';

    expenses.getAll().forEach(c => {

        const { id, title, cost } = c;

        html += `<div class="d-block">
       <div>
       <span>${cost.currency}</span>
       ${cost.cost}
       </div>
       <div>${title}</div>
       <div><button class="btn btn-danger" data-id="${id}">Eliminar</button></div>
       </div>`;
    });

    const _item = document.getElementById('items');

    if (_item != undefined) _item.innerHTML = html;

    $('#total').innerHTML = expenses.getTotal();

    $$('.btn-danger').forEach(c => {
        c.addEventListener('click', e => {
            const id = (e.target as HTMLButtonElement).getAttribute('data-id');
            if (id != undefined){
                expenses.remove(parseFloat(id));

                render();
            }
        });
    });
}


function $(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement;

}

function $$(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;

}
