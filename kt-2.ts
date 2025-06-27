interface Reception {
  delivery(): boolean;
  receive(): void;
}

abstract class Publisher {
  constructor(
    protected title: string,
    protected author: string,
    protected pubYear: number,
    protected copies: number
  ) {}

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getAuthor(): string {
    return this.author;
  }

  setAuthor(author: string): void {
    this.author = author;
  }

  getPubYear(): number {
    return this.pubYear;
  }

  setPubYear(year: number): void {
    this.pubYear = year;
  }

  getCopies(): number {
    return this.copies;
  }

  setCopies(copies: number): void {
    this.copies = copies;
  }

  abstract toString(): string;
}

class Book extends Publisher implements Reception {
  constructor(
    title: string,
    author: string,
    pubYear: number,
    copies: number,
    private pages: number
  ) {
    super(title, author, pubYear, copies);
  }

  getPages(): number {
    return this.pages;
  }

  setPages(pages: number): void {
    this.pages = pages;
  }

  delivery(): boolean {
    if (this.copies > 0) {
      this.copies--;
      return true;
    }
    return false;
  }

  receive(): void {
    this.copies++;
  }

  toString(): string {
    return `Книга: ${this.title} (${this.author}, ${this.pubYear}), стр: ${this.pages}, экз: ${this.copies}`;
  }
}

class Magazine extends Publisher implements Reception {
  constructor(
    title: string,
    author: string,
    pubYear: number,
    copies: number,
    private issue: number
  ) {
    super(title, author, pubYear, copies);
  }

  getIssue(): number {
    return this.issue;
  }

  setIssue(issue: number): void {
    this.issue = issue;
  }

  delivery(): boolean {
    if (this.copies > 0) {
      this.copies--;
      return true;
    }
    return false;
  }

  receive(): void {
    this.copies++;
  }

  toString(): string {
    return `Журнал: ${this.title} (${this.author}, ${this.pubYear}), выпуск №${this.issue}, экз: ${this.copies}`;
  }
}

class Reader {
  private items: Publisher[] = [];
  private static MAX_ITEMS = 3;

  constructor(private firstName: string, private lastName: string) {}

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(name: string): void {
    this.firstName = name;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(name: string): void {
    this.lastName = name;
  }

  getItems(): Publisher[] {
    return this.items;
  }

  borrow(item: Publisher & Reception): void {
    if (this.items.length >= Reader.MAX_ITEMS) {
      console.log(`${this.firstName} не может взять больше изданий.`);
      return;
    }

    if (item.delivery()) {
      this.items.push(item);
      console.log(`${this.firstName} взял: ${item.getTitle()}`);
    } else {
      console.log(`Издание "${item.getTitle()}" недоступно.`);
    }
  }

  returnItem(item: Publisher & Reception): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      item.receive();
      this.items.splice(index, 1);
      console.log(`${this.firstName} вернул: ${item.getTitle()}`);
    } else {
      console.log("Издание не найдено у читателя.");
    }
  }

  toString(): string {
    const titles = this.items.map(i => i.getTitle()).join(', ') || "ничего";
    return `Читатель: ${this.firstName} ${this.lastName}, на руках: ${titles}`;
  }
}

class Library {
  private items: Publisher[] = [];

  addItem(item: Publisher): void {
    this.items.push(item);
  }

  removeItem(item: Publisher): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  showItems(): void {
    this.items.forEach(item => {
      console.log(item.toString());
    });
  }
}




const library = new Library();

const book1 = new Book("Война и мир", "Толстой", 1869, 2, 1225);
const book2 = new Book("Мастер и Маргарита", "Булгаков", 1967, 1, 500);
const mag1 = new Magazine("Наука и жизнь", "Редакция", 2024, 3, 6);

library.addItem(book1);
library.addItem(book2);
library.addItem(mag1);

console.log("Издания в библиотеке:");
library.showItems();

const reader = new Reader("Анна", "Иванова");

console.log("\Выдача:");
reader.borrow(book1);
reader.borrow(book2);
reader.borrow(mag1);
reader.borrow(book1); 

console.log("Состояние читателя:");
console.log(reader.toString());

console.log("\n🔁 Возврат:");
reader.returnItem(book2);

console.log("\n👩 После возврата:");
console.log(reader.toString());

console.log("\n📚 Библиотека:");
library.showItems();
