import Subject from "./Subject";
import Tag from "./Tag";

export default interface Payment {
  _id: string;
  amount: number;
  date: number;
  description?: string;
  subject: Subject;
  tags: [Tag];
}
