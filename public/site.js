
let ignoreId = -1

const getEvents = async () => {
        const response = await fetch(`/api/events`)
        const { _id, name, location, dates, hours } = await response.json()
        ignoreId = _id
        document.querySelector('.events-list').textContent = name
}

getEvents()
/*
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    
    const eventslist = document.querySelector('.events-list')
    eventslist.appendChild(ul)
    ul.appendChild(li)
    const span = document.createElement('span')
            span.textContent = 'test'
            li.appendChild(span)

    let ignoreId = -1        
    const fetchEvents = async () => {
       
            const response = await fetch('/api/events');
            const { _id, name, location, dates, hours } = await response.json();
            document.querySelector('.events-list span').textContent = name
    }

    fetchEvents()
    
    const displayEvents = events => {

        events.forEach(({ name, location, dates, hours }) => {
            const ul = document.createElement('ul')
            const li = document.createElement('li')
            eventslist.appendChild(ul)
            ul.appendChild(li)

            const span = document.createElement('span')
            span.textContent = {name}
            li.appendChild(span)
    })}

    displayEvents(await fetchEvents('/api/events'))
    console.log(events)
    */
