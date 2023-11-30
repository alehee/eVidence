export default class CsvParserService {
  static formatTimestamp(str) {
    return str.split(".")[0];
  }

  static parsePresence(accountEntrances, temporaryEntrances) {
    let rows = [];

    rows.push(["Imię", "Nazwisko", "Dział", "Godzina wejścia"]);
    accountEntrances.forEach((entrance) => {
      rows.push([
        entrance.account.name,
        entrance.account.surname,
        entrance.account.department.name,
        this.formatTimestamp(entrance.enter),
      ]);
    });

    rows.push(["====="]);

    rows.push(["Numer karty", "Imię", "Nazwisko", "Godzina wejścia"]);
    temporaryEntrances.forEach((entrance) => {
      rows.push([
        entrance.temporaryCard.id,
        entrance.name,
        entrance.surname,
        this.formatTimestamp(entrance.enter),
      ]);
    });

    return rows;
  }
}
