import React, { useState } from "react";
import "./Sort.scss";
// Деструктуризация объекта props. Мы извлекаем labels, onSelect и defaultSelect из пропсов, переданных в компонент.
const Sort = ({ labels, onSelect, defaultSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  //функция для обновления состояния
  const toggleSort = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    //Вызов функции onSelect, переданной через пропсы, с аргументом option
    onSelect(option);
    setIsOpen(!isOpen);
    //Изменение состояния isOpen на противоположное значение.
    
  };

  return (
    <div className="sort">
          {/* обработчик события onClick, который вызывает функцию toggleSort. */}
      <div className="sort__label" onClick={toggleSort}>
        {defaultSelect.label} 
        {/* Отображение значения label из объекта defaultSelect */}
      </div>
{/* isOpen && (: Условный рендеринг. Если isOpen равно true, то отображается следующий блок кода. */}
      {isOpen && (
        <div className="sort__content">
            {/* Проверка наличия labels и итерация по массиву labels с помощью метода map. */}
          {labels &&
            labels.map((item) => (
              <div
                key={item.id}
                className="sort__item"
                onClick={() => handleOptionClick(item)}
              >
                {/* обработчик события onClick, который вызывает функцию handleOptionClick с аргументом item. */}
                {item.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Sort;
