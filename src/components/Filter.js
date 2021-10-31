import React from 'react';
import { connect } from 'react-redux';
import contactsActions from '../redux/contacts/contacts-action';

const Filter = ({ handleChange, filter }) => (
  <>
    <p>Find contacts by name</p>
    <input
      type="text"
      onChange={(e) => handleChange(e.currentTarget.value)}
      value={filter}
    />
  </>
);

const mapStateToProps = ({ contacts: { filter } }) => ({
  filter: filter,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (value) => dispatch(contactsActions.changeFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
