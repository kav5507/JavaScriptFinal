(async () => { 

	const eventlist = document.querySelector('#events table')
	const menutable = document.querySelector('#menu table')

	const getEvents = async () => {
		const response = await fetch('/api/events')
		const events = await response.json()
		return events
	}

	

	const displayEventItems = async (events) => {
		events.forEach(({_id, name, location, dates,hours}) => {
			const tr = document.createElement('tr')

			eventlist.appendChild(tr)
			const tdname = document.createElement('td')
			tdname.textContent = name
			tr.appendChild(tdname)

			const tdlocation = document.createElement('td')
			tdlocation.textContent = location
			tr.appendChild(tdlocation)

			const tddates = document.createElement('td')
			tddates.textContent = dates
			tr.appendChild(tddates) 

			const tdhours = document.createElement('td')
			tdhours.textContent = hours
			tr.appendChild(tdhours) 

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


	displayEventItems(await getEvents())
	displayMenuItems(await getMenu())

})()