let lasteventId = 0;

const getEvents = async () => {
    const response = await fetch('/api/events')
    const {id,name,location,dates,hours} = await response.json()
    



}