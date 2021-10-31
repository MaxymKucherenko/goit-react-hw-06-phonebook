import { useState } from 'react';
import { connect } from 'react-redux';
import contactsActions from '../redux/contacts/contacts-action';

function Form({ onAdd, items }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const findName = items.find((contact) => contact.name === name);
    if (findName) {
      alert(`${findName.name} is already in contacts.`);
      reset();
      return;
    }
    onAdd(name, number);
    reset();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Имя
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Телефон
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          onChange={handleInputChange}
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
}

const mapStateToProps = ({ contacts: { items } }) => ({
  items,
});
const mapDispatchToProps = (dispatch) => ({
  onAdd: (name, number) => dispatch(contactsActions.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
