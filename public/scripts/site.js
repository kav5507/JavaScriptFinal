(async () => { 

	const eventlist = document.querySelector('#events table')
	const menutable = document.querySelector('#menu table')
	

	const getEvents = async () => {
		const response = await fetch('/api/events')
		const events = await response.json()
		return events
	}

	const displayEventNames = async (events) => {
		events.forEach(({_id, name, location, dates, hours}) => {
			const tr = document.createElement('tr')	
			eventlist.appendChild(tr)
			tr.setAttribute("class", _id)

			const tdname = document.createElement('td')
			tdname.setAttribute("width", "40%")
			const a = document.createElement('a')
			a.textContent = name
			tdname.appendChild(a)
			eventlist.appendChild(tdname)

			const tdbutton = document.createElement('td')
			const button = document.createElement('button')
			tdbutton.setAttribute("width", "5%")
			tdbutton.setAttribute("class", `a${_id}`)
			button.innerHTML = 'Details'
			button.name = `a${_id}`

			eventlist.appendChild(tdbutton)
			tdbutton.appendChild(button)
		
			const tdlocation = document.createElement('td')
			tdlocation.textContent = location
			tdlocation.style.visibility = "hidden"
			tdlocation.setAttribute("class", `a${_id}`)
			eventlist.appendChild(tdlocation)
			
			const tddates = document.createElement('td')
			tddates.textContent = dates
			tddates.style.visibility = "hidden"
			tddates.setAttribute("class", `a${_id}`)
			eventlist.appendChild(tddates)

			const tdhours = document.createElement('td')
			tdhours.textContent = hours
			tdhours.style.visibility = "hidden"
			tdhours.setAttribute("class", `a${_id}`)
			eventlist.appendChild(tdhours)	
		})
	}
	
	const getMenu = async () => {
		const response = await fetch('/api/menu')
		const menu = await response.json()
		return menu
	}

	const displayMenuItems = async (menu) => {
		menu.forEach(({_id, name, description, price}) => {
			const tr = document.createElement('tr')

			menutable.appendChild(tr)
			const tdname = document.createElement('td')
			tdname.textContent = name
			tr.appendChild(tdname)

			const tddescription = document.createElement('td')
			tddescription.textContent = description
			tr.appendChild(tddescription)

			const tdprice = document.createElement('td')
			tdprice.textContent = price
			tr.appendChild(tdprice) 
		})
	}

	/*
	const clearTable = async () => {
		const a = document.querySelector('#events')
		const b = document.querySelector('table')
		a.removeChild(b)
	}
	*/

	
	displayEventNames(await getEvents())
	displayMenuItems(await getMenu())

	document.querySelectorAll('button').forEach((c) => {
		c.onclick = function() {
			const clickedButtonName = c.name
			
			const az = document.querySelectorAll(`.${clickedButtonName}`)
			for (var i = 0; i < az.length; i++)
				{az[i].style.visibility = "visible"}
		}
		
	})

	const getMenuSelectItems = async (menu) => {
		const selectItem = document.querySelector('#selectItem')
		menu.forEach(({_id, name}) => {
			const option = document.createElement('option')
			option.setAttribute("value", _id)
			option.innerHTML = name
			selectItem.appendChild(option)
		})
	}

	const getEventSelectEvents = async (events) => {
		const selectEvent = document.querySelector('#selectEvent')
		events.forEach(({_id, name}) => {
			const option = document.createElement('option')
			option.setAttribute("value", _id)
			option.innerHTML = name
			selectEvent.appendChild(option)
		})
	}
	 
	const populateItems = async () => {
		const itemName = document.querySelector('#menuName-input')
		const id = document.querySelector('#selectItem').value
		console.log(itemName, id)
		const response = await fetch(`/api/menu/${id}`)
		console.log(response)
		const {name, description, price } = await response.json()
		console.log(name)
		itemName.innerHTML = name
	}

	// added this for test
	const populateMenuItemDetails = async () => {
		const menuId = document.querySelector('#selectItem').value;
		const response = await fetch(`/api/menu/${_id}`);
		const { name, description, price } = await response.json();
		
		document.querySelector('#menuName-input').value = name;
		document.querySelector('#menuDescription-input').value = description;
		document.querySelector('#menuPrice-input').value = price;
	};
	
	const populateEventDetails = async () => {
		const eventId = document.querySelector('#selectEvent').value;
		const response = await fetch(`/api/events/${_id}`);
		const { name, location, dates, hours } = await response.json();
		
		document.querySelector('#eventName-input').value = name;
		document.querySelector('#eventLocation-input').value = location;
		document.querySelector('#eventDates-input').value = dates;
		document.querySelector('#eventHours-input').value = hours;
	};
	// Insert
	const addItem = async () => {
		const name = document.getElementById('menuName-input').value;
		const description = document.getElementById('menuDescription-input').value;
		const price = document.getElementById('menuPrice-input').value;
	
		const response = await fetch('/api/menu', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, description, price })
		});
	
		if (response.ok) {
			console.log('Added');
		} else {
			console.error('Failed');
		}
	};
	
	document.querySelector('#formAddItem').addEventListener('submit', function(event) {
		event.preventDefault(); // Prevent form submission -- not sure if this is really needed
		addItem();
	});
	
	const addEvent = async () => {
		const name = document.getElementById('eventName-input').value;
		const location = document.getElementById('eventLocation-input').value;
		const dates = document.getElementById('eventDates-input').value;
		const hours = document.getElementById('eventHours-input').value;

		const response = await fetch('/api/events', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, location, dates, hours })
		});
	
		if (response.ok) {
			console.log('Added');
		} else {
			console.error('Failed');
		}
	};
	
	document.querySelector('#formAddEvent').addEventListener('submit', function(event) {
		event.preventDefault(); // Prevent form submission -- not sure if this is really needed
		addEvent();
	});


	// Dawson -- Working on update and delete
	


	// Delete

	const deleteMenuItem = async () => {
		const menuId = document.querySelector('#selectItem').value;
		const response = await fetch(`/api/menu/${menuId}`, {
			method: 'DELETE'
		});
	
		if (response.ok) {
			console.log('Menu item deleted successfully');
			// Optionally, remove the item from the dropdown or refresh the list
			document.querySelector(`#selectItem option[value="${menuId}"]`).remove();
		} else {
			console.error('Failed to delete the menu item');
		}
	};
	
	const deleteEvent = async () => {
		const eventId = document.querySelector('#selectEvent').value;
		const response = await fetch(`/api/events/${eventId}`, {
			method: 'DELETE'
		});
	
		if (response.ok) {
			console.log('Event deleted successfully');
			// Optionally, remove the item from the dropdown or refresh the list
			document.querySelector(`#selectEvent option[value="${eventId}"]`).remove();
		} else {
			console.error('Failed to delete the event');
		}
	};
	

	const btnAddItem = document.querySelector('#formAddItem')
	const btnAddEvent = document.querySelector('#formAddEvent')
	const selectItem = document.querySelector('#selectItem')
	selectItem.addEventListener('change', populateItems)

	const selectEvent = document.querySelector('#selectEvent')


	document.querySelector('#btnDeleteItem').addEventListener('click', function(event) {
		event.preventDefault(); // Prevent form submission
		deleteMenuItem();
	});
	
	document.querySelector('#btnDeleteEvent').addEventListener('click', function(event) {
		event.preventDefault(); // Prevent form submission
		deleteEvent();
	});
	

	getMenuSelectItems(await getMenu())
	getEventSelectEvents(await getEvents())

})()