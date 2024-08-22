import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const EditHome = () => {
    const { store, actions } = useContext(Context);

    const details =store.contactToEdit;

    const [name, setName] = useState(details.name || "");
    const [email, setEmail] = useState(details.email || "");
    const [address, setAddress] = useState(details.address || "");
    const [phone, setPhone] = useState(details.phone || "");

    function handleSubmit(event) {
        event.preventDefault();
        const contact = {
            name: name,
            email: email,
            phone: phone,
            address: address,
        };
        const config = {
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch(`https://playground.4geeks.com/contact/agendas/jppe1994/contacts/${store.contactToEdit.id}`, config)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // Resetear los valores del formulario a vacíos después de que se envíen los datos
                setName("");
                setEmail("");
                setAddress("");
                setPhone("");
				fetch ('https://playground.4geeks.com/contact/agendas/jppe1994/contacts')
						.then((response)=> response.json() )
						.then((data)=> actions.setContacts(data.contacts))
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center fs-1 fw-bold">
                    Add a new contact
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="fullName" className="fw-bold">Full Name</label>
                    <input type="text" className="form-control" id="fullName" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="fw-bold">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="phone" className="fw-bold">Phone</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="address" className="fw-bold">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Save Contact</button>
            </form>
        </div>
    );
};
