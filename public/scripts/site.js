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
})()