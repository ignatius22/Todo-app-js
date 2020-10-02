const Item = {
  id: '',
  title: '',
  description: '',
  dueDate: '',
  priority: 4,
  done: false,
};

const List = {
  name: 'nice',
  items: [],

};

 const todo = List.items.push("Shopping", "Buy Clothes", "Low", "13-02-2020");


export default { Item, List ,todo};
