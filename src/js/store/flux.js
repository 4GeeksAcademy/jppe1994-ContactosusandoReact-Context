import { redirect } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [
				
			],
			contactToEdit: {

			}
		

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setContacts: (contacts) => { 
				setStore({ contacts: contacts })
			},
			deleteContact: (indexToDelete) => {
				// const store = getStore();
				// setStore({ contacts: store.contacts.filter((contact, index) => index != indexToDelete) });
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/jppe1994/contacts/"+indexToDelete, requestOptions)
					.then((response) => response.text())
					.then((result) => {
						console.log(result)
						fetch ('https://playground.4geeks.com/contact/agendas/jppe1994/contacts')
						.then((response)=> response.json() )
						.then((data)=> setStore({ contacts: data.contacts }))
					})
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				
				fetch ('https://playground.4geeks.com/contact/agendas/jppe1994/contacts')
				.then((response)=> response.json() )
				.then((data)=> setStore({ contacts: data.contacts }))

				
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
