import React from 'react';

function CreateNote() {
    return (
        <main className="create">
            <div className="content__wrapper">
                <form action="" method="post">
                    <input type="text" name="heading" placeholder="Введите заголовок"/>
                    <textarea name="area" placeholder="Заметка..."></textarea>
                    <input type="submit" value="Создать"/>
                </form>
            </div>
        </main>
    );
}

export default CreateNote;