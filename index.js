let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

// Контейнер, куда будем добавлять задачи
const listElement = document.querySelector(".to-do__list");
// Форма для добавления новых задач
const formElement = document.querySelector(".to-do__form");
// Поле для ввода текста
const inputElement = document.querySelector(".to-do__input");

// Функция загрузки задач из хранилища
function loadTasks() {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : items;
}

// Функция создания элемента задачи
function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    // Устанавливаем текст задачи
    textElement.textContent = item;

    // Кнопка удаления
    deleteButton.addEventListener('click', function() {
        clone.remove();
        const items = getTasksFromDOM();
        saveTasks(items);
    });

    // Кнопка копирования
    duplicateButton.addEventListener('click', function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        const items = getTasksFromDOM();
        saveTasks(items);
    });

    // Кнопак редактирования
    editButton.addEventListener('click', function() {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    // Сохранение изменений при завершении редактирования
    textElement.addEventListener('blur', function() {
        textElement.setAttribute('contenteditable', 'false');
        const items = getTasksFromDOM();
        saveTasks(items);
    });

    return clone;
}

// Функция получения задач из DOM
function getTasksFromDOM() {
    const itemsNamesElements = listElement.querySelectorAll('.to-do__item-text');
    const tasks = [];
    itemsNamesElements.forEach(function(element) {
        tasks.push(element.textContent);
    });
    
    return tasks;
}

// Функция сохранения задач в хранилище
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Обработчик отправки формы
formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskText = inputElement.value.trim();
    
    // Проверяем, что поле не пустое
    if (taskText !== '') {
        const newItem = createItem(taskText);
        listElement.prepend(newItem);
        const items = getTasksFromDOM();
        saveTasks(items);
        inputElement.value = '';
    }
});

// Инициализация приложения
items = loadTasks();
items.forEach(function(item) {
    const itemElement = createItem(item);
    listElement.append(itemElement);
});