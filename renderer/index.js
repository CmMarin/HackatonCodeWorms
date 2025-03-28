document.addEventListener('DOMContentLoaded', () => {
    // New Note Button
    document.querySelector('.new-note-btn').addEventListener('click', () => {
      window.electronAPI.send('open-input-window')
    })
  
    // Receive new notes
    window.electronAPI.receive('new-note', (noteData) => {
      const notesGrid = document.querySelector('.notes-grid')
      
      const noteCard = document.createElement('div')
      noteCard.className = 'note-card'
      noteCard.innerHTML = `
        <div class="note-content">${noteData.content}</div>
        <div class="note-meta">
          <span>${noteData.category}</span>
          <span>Just now</span>
        </div>
      `
      
      notesGrid.prepend(noteCard)
    })
  
    // Handle note completion
    document.querySelectorAll('.small-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        e.target.closest('.reminder-item').remove()
      })
    })
  })