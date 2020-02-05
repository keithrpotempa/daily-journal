import FACTORY from './entryComponent.js';
import API from './data.js'
import refreshEntries from './journal.js';
import ENTRIES from './entriesDOM.js';

const eventListeners = {
    addSaveEventListener() {
        const saveBtn = document.querySelector(".save-button");
        saveBtn.addEventListener("click", () => {
            API.saveJournalEntry(FACTORY.makeEntryObject());
        })
    },
    addResetEventListener() {
        const resetBtn = document.querySelector(".reset-button");
        resetBtn.addEventListener("click", () => {
            API.clearFields();
        })
    },
    addMoodFilterEventListener() {
        const radioBtns = document.getElementsByName("moodfilter__button")
        radioBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const mood = e.target.value
                API.getJournalEntries()
                    .then(response => response.filter(response => {
                        return response.mood.toLowerCase() === mood
                    })).then(ENTRIES.entryRenderer)
            })
        })
    },
    addDeleteEventListener() {
        const deleteBtns = document.querySelectorAll(".delete-button");
        deleteBtns.forEach(btn => {
            const btnId = btn.id.split("--")[1]
            btn.addEventListener("click", () => {
                API.deleteJournalEntry(btnId);
            })
        })
    }
}

export default eventListeners;