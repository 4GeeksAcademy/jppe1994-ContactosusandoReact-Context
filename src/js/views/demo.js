import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	const deleteContact = (id) => {
		actions.deleteContact(id);
	};

	const setContactToEdit=(contact) =>{
		store.contactToEdit = contact;
	}

	return (
		<div className="container">
			<ul className="list-group">
				{store.contacts.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item "
							>
							<div className= "row row1 fs-4">
								<div className= "col">
									<img src="https://i.pinimg.com/474x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg" alt="contact-photo" className="img-circle mt-1"></img>
								</div>
								<div className= "col mx-5 my-4">
									<div className= "row">
										<div className= "col">
											{item.name}
										</div>	
									</div>
								
									<div className= "row">
										<div className= "col">
											{item.address}
											
										</div>	
									</div>
									<div className= "row">
										<div className= "col">
											{item.phone}
										</div>	
									</div>
								
									<div className= "row">
										<div className= "col">
											{item.email}
										</div>	
									</div>
								</div>
								<div className= "col d-flex justify-content-end pt-5 mx-0">
									<div>
										<Link to="/edit" >
										<button className="btn btn-success mx-2 " onClick={()=>setContactToEdit(item)}>
											Edit contact

												</button>
										</Link>
									</div>
									<div>
										<button className="btn btn-success" onClick={()=>actions.deleteContact(item.id)}>
											Delete

										</button>
									</div>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Add Contact</button>
			</Link>
		</div>
	);
};