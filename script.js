/*
1.Выбрать поле для игры
2.Заполнить игровое поле карточками(тегами li)
3.Сделать клик по карточкам
4.Сделать переворачивание карточек
	 4.1 Размещаем картинки для каждой карточки
	 4.2 Показываем картинку
5. Если выбрано 2 картинки проверяем на совпадение
	 5.1 Если картинки совпадают, то удаляем карточки
	 5.2 Перевернуть все выбранные карточки
6.Если все карточки удалены, вывести окно с перезапуском игры
7.При клике на кнопку перезагрузить обновляем страничку
*/

//выбираем блок игрового поля в документе и помещаем его в коробку(переменную)
var cardsField=document.querySelector("#cards");
//проверяем с помощью консоли, выбрали ли поле
console.dir(cardsField);
//кнопка перезагрузки помещаем в коробку
var resetBlock=document.querySelector("#reset");
var resetBtn=document.querySelector("#reset-btn");
//количество карточек помешаем в коробку(переменную)
var countCards=16;

//сделали масив для набора карточек
var images=[
		1,2,3,4,
		5,6,7,8,
		1,2,3,4,
		5,6,7,8,
]
//console.dir(images);
//удаленные карточки
var delectedCards=0;
//создаем коробку для хранения выбранных картинок
var selected=[];
var pause=false;
//п.2 Заполнить игровое поле карточками li
//создаем цикл, итерации начиная с 0, цикл выполняется пока итерация меньше 16
for (var i=0 ; i < countCards; i=i+1) {
	//создаем карточку в документе и помещаем ее в коробку(переменную)
	var li=document.createElement("li");
	//создаем для каждого элемента li номер id
	li.id=i;
	//помещаем переменную li в єлемент поле 
	cardsField.appendChild(li);
}

//Сделать клик по карточкам
cardsField.onclick= function (event) {
console.dir(event);
    if (pause==false) {
    	//создаем коробку для элемента по которому кликнули
	    var element=event.target;
	//делаем чтобы клик был только по карточкам li и проверять по классу active выбирали ли уже эту карточку
	if (element.tagName=="LI" && element.className !="active") {
		//помещаем картинку в коробку масив с выбранными картинками
		selected.push(element);
		element.className="active";
		//определяем номер id картинки
		var img=images[element.id];
		//при клике на карточку открывается картинка
        element.style.backgroundImage="url(images/"+ img +".png)";
       
       //Если картинки совпадают, то удаляем карточки
       if (selected.length==2) {
       	   pause=true;
       	
           if (images[selected[0].id]==images[selected[1].id]) {
		       selected[0].style.visibility="hidden";
		       selected[1].style.visibility="hidden";
		       //увелич кол-во удаленных карточек на 2
		       delectedCards=delectedCards+2;
		       };
		       //карточки переворачиваем с задержкой
		      setTimeout(refreshCards,600);
		      
	              }
           }
    }
	
//console.dir(selected);
}

//функция возвращает случайного числа от 1 до 6
/*function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
}*/
//очищать карточки от класса актив, если они не совпали
//Перевернуть все выбранные карточки
function refreshCards() {
for (var i = 0; i < countCards; i=i+1) {
	cardsField.children[i].className="";
	cardsField.children[i].style.backgroundImage='url("images/back.png")';
}
//Если все карточки удалены, вывести окно с перезапуском игры
if (delectedCards==countCards) {
	resetBlock.style.display="block";
}
//очистить масив
    selected=[];
    pause=false;
}
//При клике на кнопку перезагрузить обновляем страничку
resetBtn.onclick= function(){
    //shuffle(images);
	location.reload();
}