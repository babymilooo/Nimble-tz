interface Itags {
  tag: string;
  id: string;
}

export interface IContact {
  id: string;
  avatar_url: string;
  fields: {
    "first name": {
        value: string;
        modifier: string;
        label: string;
    };
    "last name": {
        value: string;
        modifier: string;
        label: string;
    };
    email: {
        value: string;
        modifier: string;
        label: string;
    };
  };
  tags: Itags[];
}
