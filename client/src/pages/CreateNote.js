import React, {useState} from 'react';
import axios from "axios";

function CreateNote() {
    const [heading, setHeading] = useState('');
    const [textarea, setTextarea] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await axios.post('http://localhost:2000/api/post', {
            title: heading,
            text: textarea
        }).then(function (response) {
            console.log('Ответ сервера успешно получен!');
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <main className="create">
            <div className="content__wrapper">
                <form action="#" method="post" onSubmit={handleSubmit}>
                    <input type="text"
                           placeholder="Введите заголовок"
                           value={heading}
                           onChange={e => setHeading(e.target.value)}/>
                    <textarea placeholder="Заметка..."
                              defaultValue={textarea}
                              onChange={e => setTextarea(e.target.value)}>
                    </textarea>
                    <input type="submit" value="Создать"/>
                </form>
            </div>
        </main>
    );
}

export default CreateNote;