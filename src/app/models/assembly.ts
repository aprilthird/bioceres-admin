export class Assembly {
  id?: Number;
  name: String;
  deadline: String;
  publishDate: String;
  fiscalYear: String;
  date: String;
  description: String;
  isOpen: Boolean;

  constructor(id?: Number, name: String = "", deadline: String = "",
              publishDate: String = "", fiscalYear: String = "", date: String = "",
              description: String = "", isOpen: Boolean = true) {
    this.id = id;
    this.name = name;
    this.deadline = deadline;
    this.publishDate = publishDate;
    this.fiscalYear = fiscalYear;
    this.date = date;
    this.description = description;
    this.isOpen = isOpen;
  }

  public parsedDeadlineString(): String {
    return Date.parse(this.deadline as string).toLocaleString().toString();
  }

  public parsedPublishDateString(): String {
    return Date.parse(this.publishDate as string).toLocaleString().toString();
  }

  public parsedDateString(): String {
    return Date.parse(this.date as string).toLocaleString().toString();
  }
}
