import { useState } from 'react'
import './App.css'
import {initialFields} from './data.js'

function PlaceFields({ id, fieldsMap, handleInputChange, edit }) {
  const parentField = fieldsMap[id];
  const childIds = parentField.childIds;

  return (
    <li>
      {parentField.title}
      {': '}
      {parentField.input && edit ? (<input type="text" value={parentField.content} onChange={e => {handleInputChange(id, e.target.value)}} />) : (<span>{parentField.content}</span>)}
      {childIds.length > 0 && (
        <ol>
          {childIds.map(childId => (
            <PlaceFields
              key={childId}
              id={childId}
              fieldsMap={fieldsMap}
              handleInputChange={handleInputChange}
              edit={edit}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

function App() {
  const [fields, setFields] = useState(initialFields);
  const [edit, setEdit] = useState(true);

  function handleInputChange(id, newContent) {
    const currentField = fields[id];
    const nextField = {
      ...currentField,
      content: newContent
    }
    setFields({
      ...fields,
      [id]: nextField
    })
  }

  function toggleEdit() {
    edit ? setEdit(false) : setEdit(true);
  }

  const cv = fields[0];
  const sectionIds = cv.childIds;

  return (
    <>
      <h1>Resume</h1>
      <ol>
        {sectionIds.map(sectionId => (
          <PlaceFields
            key={sectionId}
            id={sectionId}
            fieldsMap={fields}
            handleInputChange={handleInputChange}
            edit={edit}
          />
        ))}      
      </ol>
      <button onClick={toggleEdit}>{edit ? "Save" : "Edit"}</button>
    </>
  )
}

export default App
