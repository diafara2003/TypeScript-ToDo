export type Currency = 'USD' | 'COL';


export interface ExpensiveItem {
    id?: number,
    title: string,
    cost: Price
}

export interface Price {
    cost: number,
    currency: Currency
}


export interface IExpensives {

    espenses: ArrayList<ExpensiveItem>,
    finalCurrency: Currency,
    add(item: ExpensiveItem): boolean
    get(index: number): ExpensiveItem | null,
    getTotal(): string,
    remove(id: number): boolean
}

export class ArrayList<T>{
    private items: T[];
    constructor() {
        this.items = [];
    }
    add(item: T): void {
        this.items.push(item);
    }
    get(index: number): T | null {
        const item: T[] = this.items.filter((x, i) => {
            return i === index;
        });

        if (item.length === 0) return null;
        else return item[0];
    }

    getAll(): T[] {
        return this.items;
    }

}

export class Expenses implements IExpensives {
    espenses: ArrayList<ExpensiveItem>;
    finalCurrency: Currency;
    private count: number = 0;

    constructor(currency: Currency) {
        this.finalCurrency = currency;
        this.espenses = new ArrayList<ExpensiveItem>();
    }

    add(item: ExpensiveItem): boolean {
        item.id = this.count;
        this.count++;
        this.espenses.add(item);
        return true;
    }

    get(index: number): ExpensiveItem | null {
        return this.espenses.get(index);

    }

    getAll(): ExpensiveItem[] {
        return this.espenses.getAll();
    }

    getTotal(): string {
        const total: number = this.getAll().reduce( (acumulador, item) => {
            return acumulador += this.ConvertCurrency(item, this.finalCurrency);
        }, 0);

        return `${this.finalCurrency} ${total.toFixed(2).toString() }`;
    }

    remove(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    private ConvertCurrency(item: ExpensiveItem, currency: Currency): number {
        const _factor: number = 3850;
       
        
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
                default :return 0;
        }
    }


}
