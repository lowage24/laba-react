import React, { useState } from 'react';
import uuid from 'react-uuid';
export default function TodoList() {
	const initNotes = [
        {id:uuid(),name:'Task1' },
        {id:uuid(),name:'Task2' },
        {id:uuid(),name:'Task3' },
        {id:uuid(),name:'Task4' },
    ]
	const [end,setEnd] = useState(false)
    const [notes, setNotes] = useState(initNotes);
	const [obj, setObj] = useState({});
	const [editId, setEditId] = useState(null);
	function delItem(id){
        setNotes(notes.filter(note => note.id!==id))
    }
	const result = notes.map(note => {
		return <ul class="checkbox" key={note.id}>
            <li class='li'><input  type="checkbox"  checked = {end} onClick={()=>setEnd(!end)}/>
            <p>{note.finished}</p>
            <span class = {end&&'finished'} >  {note.name}</span>
			<button class = 'btn'onClick={() => delItem(note.id)}>Delete</button>
			<button class = 'btn'onClick={() => setEditId(note.id)}>Edit</button></li>
		</ul>;
	});

	function getValue(prop) {
		if (editId) {
			return notes.reduce((res, note) => note.id === editId ? note[prop] : res, '');
		} else {
			return obj[prop];
		}
	}
	
	function changeItem(prop, event) {
		if (editId) {
			setNotes(notes.map(note =>
				note.id === editId ? {...note, [prop]: event.target.value} : note
			));
		} else {
			setObj({...obj, [prop]: event.target.value});
		}
	}
	
	function saveItem() {
		if (editId) {
			setEditId(null);
		} else {
			setNotes([...notes, obj]);
		}
	}
	
	return <div class="block1">
        <div >
		<label >Add and edit Todo:  </label>
		<input class="input__main" value={getValue('name')} onChange={event => changeItem('name', event)}/>
		<button class="submit__btn" onClick={saveItem}>submit</button>

		{result}
        </div>
	</div>;
}