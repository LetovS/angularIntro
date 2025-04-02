export interface ITourType{
  name: 'Групповой' | 'Одиночный' | 'Все',
  code: 'group' | 'single' | 'all'
}

/*
Get tours type
*/
export function getToursType(): ITourType [] {
  return [
    {name: 'Групповой', code:'group'},
    {name: 'Одиночный', code:'single'},
    {name: 'Все', code: 'all'}
  ];
}


export interface IDateFilter{
  date?: Date;
}
