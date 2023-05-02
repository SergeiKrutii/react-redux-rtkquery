import { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { useAddContactMutation } from "../redux/contacts/contacts-createApi";
import "react-toastify/dist/ReactToastify.css";

const Form = styled.form({
  border: "2px solid black",
  width: 400,
  padding: 15,
});
const Button = styled.button({
  border: "1px solid black",
  borderRadius: 5,
  cursor: "pointer",
});

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [addContact] = useAddContactMutation();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = (e) => {
    setName("");
    setNumber("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    addContact(newContact);
    reset();
  };

  return (
    <>
      <ToastContainer autoClose={2000} theme="dark" />
      <Form action="" onSubmit={onSubmit}>
        <p>Name</p>
        <input
          onChange={onInputChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <p>Number</p>
        <input
          onChange={onInputChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <br />
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};

export default ContactForm;