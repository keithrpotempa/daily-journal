// ALL API Related Components Go Here
// I added this import beyond the exercises requirements to allow
// this app to refreshEntries once it has saved a new entry
import refresh from './journal.js'

const API = {
    url: 'http://localhost:8088',
    expand: '_expand=mood&_expand=instructor',
    getJournalEntries () {
        return fetch(`${this.url}/entries?${this.expand}`)
            .then(response => response.json())
    },
    getJournalEntry (entryId) {
        return fetch(`${this.url}/entries/${entryId}?${this.expand}`)
            .then(response => response.json())
    },
    editJournalEntry (entry) {
        console.log(entry)
        document.querySelector("#journalDate").value = entry.date
        document.querySelector("#entry-id").value = entry.id
        document.querySelector("#mood").value = entry.moodId
        document.querySelector("#concepts").value = entry.conceptsCovered
        document.querySelector("#language").value = entry.language
        document.querySelector("#instructor").value = entry.instructorId
        // Since these are arrays created by carriage returns,
        // They need to be split apart again
        document.querySelector("#content").value = entry.content.join('\n');
        document.querySelector("#exercises").value = entry.exercises.join('\n');
    },
    saveJournalEntry (entryObject) {
        // If there is an id, the user is editing an existing entry
        if (entryObject.id) {
            return fetch(`${this.url}/entries/${entryObject.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(entryObject)
            })
        // If there is no id, the user is saving a new entry
        } else {
            return fetch(`${this.url}/entries/`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(entryObject)
            })
        } 
    },
    clearFields () {
        const fields = ["#entry-id", "#journalDate", "#mood", "#concepts", "#language", "#content", "#exercises"]

        fields.forEach(field => {
            document.querySelector(field).value = document.querySelector(field).defaultValue;
        })
    }, 
    deleteJournalEntry (id) {
        return fetch(`${this.url}/entries/${id}`, {method: "DELETE"})
            .then(response => response.json())
            .then(refresh.entries)
    },
    getMoods () {
        return fetch(`${this.url}/moods`)
            .then(response => response.json())
    },
    getInstructors () {
        return fetch(`${this.url}/instructors`)
            .then(response => response.json())
    }
}

export default API;