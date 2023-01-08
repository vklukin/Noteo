import React, {useState} from 'react';
import axios from "axios";

const CreateNote = () => {
    const [heading, setHeading] = useState('');
    const [textarea, setTextarea] = useState('');

    function clearForm() {
        setHeading('');
        setTextarea('');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await axios.post('http://localhost:2000/api/post', {
            title: heading,
            text: textarea
        }).then(function (response) {
            console.log(response.data);
            clearForm()
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <main className="create">
            <form action="#" method="post" onSubmit={handleSubmit}>
                <input type="text"
                       placeholder="Введите заголовок"
                       value={heading}
                       className="input input-heading"
                       onChange={e => setHeading(e.target.value)}/>
                <textarea placeholder="Заметка..."
                          value={textarea}
                          className="input input-textarea"
                          onChange={e => setTextarea(e.target.value)}>
                </textarea>
                <button type="submit">Создать</button>
            </form>
        </main>
    );
}

export default CreateNote;