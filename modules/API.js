function getEventsList() {
    return (fetch('../sportData.json')
        .then((res) => res.json()))
}

export { getEventsList }