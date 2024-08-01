interface Itags {
  tag: string;
  id: string;
}

interface IField {
  value: string;
  modifier: string;
  label: string;
}

export interface IContact {
  id: string;
  avatar_url: string;
  fields: {
    "first name": IField[];
    "last name": IField[];
    email: IField[];
  };
  tags: Itags[];
}
