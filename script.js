// New VueJS instance
new Vue({
  name: 'notebook',

  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data () {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id'),
    }
  },

  // Computed properties
  computed: {
    notePreview () {
      // Markdown rendered to HTML
      return marked(this.selectedNote.content)
    },
    buttonTitle() {
      return `${this.notes.length} note(s) already`
    },
    selectedNote() {
      return this.selectedId ? this.notes.find(n => n.id === this.selectedId) : null;
    }
  },

  // Change watchers
  watch: {
    selectedNote: {
      handler: 'saveNotes',
      deep: true
    },
    selectedId (val) {
      localStorage.setItem('selected-id', val)
      console.log('selecionou',val)
    }
  },

  methods: {
    saveNotes(val, oldVal) {
      console.log('new note:', val, 'old note:', oldVal)
      localStorage.setItem('notes', JSON.stringify(this.notes))
      this.reportOperation('saving')
    },
    reportOperation (opName) {
      console.log('The', opName, 'operation was completed!')
    },
    addNote() {
      const time = Date.now();
      const note = {
        id: String(time),
        title: `New note ${this.notes.length + 1}`,
        content: '**Hi!** this notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formating',
        created: time,
        favorite: false
      }
      this.notes.push(note)
    },
    removeNote() {
      this.notes = this.notes.filter(n => n.id !== this.selectedId)
      this.selectedId = null
    },
    favoriteNote() {
      this.selectedNote.favorite = !this.selectedNote.favorite;
    },
    selectNote(id) {
      this.selectedId = id;
    }
  },

  /* created () {
    this.content = localStorage.getItem('content') || 'You can write in **markdown**'
  }, */
})
