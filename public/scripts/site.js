(async () => { 

	const eventlist = document.querySelector('#events table')
	const menutable = document.querySelector('#menu table')

	

	
	
	const getEvents = async () => {
		const response = await fetch('/api/events')
		const events = await response.json()
		return events
	}

	//for index.html. Initially displays all events but with details hidden
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

	//for menu.html
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
	
	//resets fields to autopopulate
	document.querySelector('#txtEditMenuName').value = ""
	document.querySelector('#txtEditMenuDescription').value = ""
	document.querySelector('#txtEditMenuPrice').value = ""
	document.querySelector('#txtEditEventName').value = ""
	document.querySelector('#txtEditEventLocation').value = ""
	document.querySelector('#txtEditEventDates').value = ""
	document.querySelector('#txtEditEventHours').value = ""
	document.getElementById('menuName-input').value = ""
	document.getElementById('menuDescription-input').value = ""
	document.getElementById('menuPrice-input').value = ""
	document.getElementById('eventName-input').value = ""
	document.getElementById('eventLocation-input').value = ""
	document.getElementById('eventDates-input').value = ""
	document.getElementById('eventHours-input').value = ""

	/*
	const clearTable = async () => {
		const a = document.querySelector('#events')
		const b = document.querySelector('table')
		a.removeChild(b)
	}
	*/

	//for admin.html. Gets names for update select options and displays
	const getMenuSelectItems = async (menu) => {
		const selectItem = document.querySelector('#selectItem')
		const option = document.createElement('option')
		option.innerHTML = "Please select a menu item"
		selectItem.appendChild(option)

		menu.forEach(({_id, name, description, price}) => {
			const option = document.createElement('option')
			option.setAttribute("value", _id)
			option.innerHTML = name
			selectItem.appendChild(option)
		})
		
	}

	//for admin.html. Gets names for update select options and displays
	const getEventSelectEvents = async (events) => {
		const selectEvent = document.querySelector('#selectEvent')
		const option = document.createElement('option')
		option.innerHTML = "Please select an event"
		selectEvent.appendChild(option)

		events.forEach(({_id, name}) => {
			const option = document.createElement('option')
			option.setAttribute("value", _id)
			option.innerHTML = name
			selectEvent.appendChild(option)
		})
	}
	 
	//populates update fields based on selected option
	const populateItems = async () => {
		const option = document.querySelector('#selectItem')
		const id = option.options[option.selectedIndex].value
	
		if (id === 'Please select a menu item') { 
			document.querySelector('#txtEditMenuName').value = ""
			document.querySelector('#txtEditMenuDescription').value = ""
			document.querySelector('#txtEditMenuPrice').value = ""
			return
		}
		const response = await fetch(`/api/menu/${id}`)
		const item = await response.json()
		document.querySelector('#txtEditMenuName').value = item.name
		document.querySelector('#txtEditMenuDescription').value = item.description
		document.querySelector('#txtEditMenuPrice').value = item.price

	}

	//populates update fields based on selected option
	const populateEvents = async () => {
		const option2 = document.querySelector('#selectEvent')
		const id2 = option2.options[option2.selectedIndex].value

		if (id2 === 'Please select an event') { 
			document.querySelector('#txtEditEventName').value = ""
			document.querySelector('#txtEditEventLocation').value = ""
			document.querySelector('#txtEditEventDates').value = ""
			document.querySelector('#txtEditEventHours').value = "" 
			return
		}
		const response2 = await fetch(`/api/events/${id2}`)
		const event = await response2.json()
		document.querySelector('#txtEditEventName').value = event.name
		document.querySelector('#txtEditEventLocation').value = event.location
		document.querySelector('#txtEditEventDates').value = event.dates
		document.querySelector('#txtEditEventHours').value = event.hours

	}

	/* added this for test
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
	*/
		
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
		document.getElementById('menuName-input').value = ""
		document.getElementById('menuDescription-input').value = ""
		document.getElementById('menuPrice-input').value = ""

		//deletes and reportpulate select options with new item
		const select = document.querySelector('#selectItem')
		select.remove()

		const nSelect = document.createElement('select')
		nSelect.setAttribute('id', 'selectItem')
		const form = document.querySelector('#formUpdateItem')
		form.prepend(nSelect)
		const selectItem = document.querySelector('#selectItem')
		selectItem.addEventListener('change', populateItems)
		document.querySelector('#txtEditMenuName').value = ""
		document.querySelector('#txtEditMenuDescription').value = ""
		document.querySelector('#txtEditMenuPrice').value = ""

		getMenuSelectItems(await getMenu())
		
		

	};
	
	document.querySelector('#formAddItem').addEventListener('submit', function(menu) {
		menu.preventDefault(); // Prevent form submission -- not sure if this is really needed
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

		document.getElementById('eventName-input').value = ""
		document.getElementById('eventLocation-input').value = ""
		document.getElementById('eventDates-input').value = ""
		document.getElementById('eventHours-input').value = ""

		//deletes and reportpulate select options with new event
		const select = document.querySelector('#selectEvent')
		select.remove()

		const nSelect = document.createElement('select')
		nSelect.setAttribute('id', 'selectEvent')
		const form = document.querySelector('#formUpdateEvent')
		form.prepend(nSelect)
		const selectItem = document.querySelector('#selectEvent')
		selectItem.addEventListener('change', populateEvents)
		document.querySelector('#txtEditEventName').value = ""
		document.querySelector('#txtEditEventLocation').value = ""
		document.querySelector('#txtEditEventDates').value = ""
		document.querySelector('#txtEditEventHours').value = "" 

		getEventSelectEvents(await getEvents())
	};

	document.querySelector('#formAddEvent').addEventListener('submit', function(event) {
		event.preventDefault(); // Prevent form submission -- not sure if this is really needed
		addEvent();
		
	});
	
	//Update

	const updateMenuItem = async () => {
		const id = document.querySelector('#selectItem').value;
		const name = document.getElementById('txtEditMenuName').value;
		const description = document.getElementById('txtEditMenuDescription').value;
		const price = document.getElementById('txtEditMenuPrice').value;

		//updates DB 
		const response = await fetch(`/api/menu/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, description, price })

			})
			if (response.ok) {
				console.log('Added');
			} else {
				console.error('Failed');
			}

			//sets select value to new name
			const option = document.querySelector('#selectItem')
			option.options[option.selectedIndex].innerHTML = name 
	};

	document.querySelector('#btnUpdateItem').addEventListener('click', function(event) {
		event.preventDefault(); // Prevent form submission
		updateMenuItem();
	});

	const updateEvent = async () => {
		const id = document.querySelector('#selectEvent').value;
		const name = document.getElementById('txtEditEventName').value;
		const location = document.getElementById('txtEditEventLocation').value;
		const dates = document.getElementById('txtEditEventDates').value;
		const hours = document.getElementById('txtEditEventHours').value;

		//updates DB
		const response = await fetch(`/api/events/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, location, dates, hours})

			})
			if (response.ok) {
				console.log('Added');

			} else {
				console.error('Failed');
			}
		
			//sets select value to new name
			const option = document.querySelector('#selectEvent')
			option.options[option.selectedIndex].innerHTML = name 
	};

	document.querySelector('#btnUpdateEvent').addEventListener('click', function(event) {
		event.preventDefault(); // Prevent form submission
		updateEvent();
	});
	

	// Delete

	const deleteMenuItem = async () => {
		const menu = document.querySelector('#selectItem');
		const menuId = menu.options[menu.selectedIndex].value
		const response = await fetch(`/api/menu/${menuId}`, {
			method: 'DELETE'
		});
	
		if (response.ok) {
			console.log('Menu item deleted successfully');
			// Optionally, remove the item from the dropdown or refresh the list
			document.querySelector(`#selectItem option[value="${menuId}"]`).remove();
			document.querySelector('#txtEditMenuName').value = ""
			document.querySelector('#txtEditMenuDescription').value = ""
			document.querySelector('#txtEditMenuPrice').value = ""
		} else {
			console.error('Failed to delete the menu item');
		}
	};

	document.querySelector('#btnDeleteItem').addEventListener('click', function(event) {
		event.preventDefault(); // Prevent form submission
		deleteMenuItem();
	});
	
	const deleteEvent = async () => {
		const item = document.querySelector('#selectEvent');
		const eventId = item.options[item.selectedIndex].value
		const response = await fetch(`/api/events/${eventId}`, {
			method: 'DELETE'
		});
	
		if (response.ok) {
			console.log('Event deleted successfully');
			// Optionally, remove the item from the dropdown or refresh the list
			document.querySelector(`#selectEvent option[value="${eventId}"]`).remove();
			document.querySelector('#txtEditEventName').value = ""
			document.querySelector('#txtEditEventLocation').value = ""
			document.querySelector('#txtEditEventDates').value = ""
			document.querySelector('#txtEditEventHours').value = "" 
		} else {
			console.error('Failed to delete the event');
		}
	};
	
	document.querySelector('#btnDeleteEvent').addEventListener('click', function(event) {
		event.preventDefault(); // Prevent form submission
		deleteEvent();
	});

	//for admin.html. Sets listener on selection change
	const selectItem = document.querySelector('#selectItem')
	selectItem.addEventListener('change', populateItems)

	const selectEvent = document.querySelector('#selectEvent')
	selectEvent.addEventListener('change', populateEvents)



	getMenuSelectItems(await getMenu())
	getEventSelectEvents(await getEvents())
	
	

	
	



})()