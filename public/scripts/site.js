let lasteventId = 0;

const getEvents = async () => {
    const response = await fetch('/api/events')
    const {id,name,location,dates,hours} = await response.json()
}


const getMenu = async () => {
	const response = await fetch('/api/menu')
	const { _id, name, description, price } = await response.json()
	ignoreId = _id
	document.querySelector('.menu h5').textContent = name
	document.querySelector('.menu .description').textContent = description
    document.querySelector('.menu .price').textContent = price
}


getMenu()