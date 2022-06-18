const url = 'https://script.google.com/macros/s/AKfycbw-wYROkriDz6LG0JR4mVen0Wb3pmTr3-YYKYMwXBeYoAT75g2FWiSXedJS4M3-WfdR/exec';
const $d = document
const $novedadesOptions = $d.getElementById('novedadesOptions');
const numE = document.getElementById('numE');
const nomE = document.getElementById('nomE');
const $area = document.getElementById('area');
const btnAgregar = document.getElementById('btnAgregar');
const btnEnviar = document.getElementById('btnEnviar');
const $trash = document.getElementById('icon');
const $tbody = document.getElementById('tbody');

async function getNovedades(){
    try{
        const req = await fetch(url+'?req=novedades');
        const novedades = await req.json();
        let novedadesTags = novedades.map(e => `<li class="form__option">${e}</li>`);
        $novedadesOptions.innerHTML = novedadesTags.join('');
    }catch(err){
        console.log(err);
    }

}

window.addEventListener('load',getNovedades);

async function getEmpleado(){
    try{
        const req = await fetch(url+'?req=empleados');
        const empleados = await req.json();
      
        for(let i = 0; i < empleados.length; i++){
          if(empleados[i][0] == numE.value) {
            nomE.value = empleados[i][1];
            $area.value = empleados[i][2];
            break;
          }
        }
    }catch(err){
        console.log(err);
    }

}

numE.addEventListener('focusout',getEmpleado);
numE.addEventListener('input',() => {
nomE.value = '';
$area.value = '';
});


$trash.addEventListener('click',() => {
    const $rows = document.querySelectorAll('tr.selected');
    const $table = document.getElementById('table');
    
    $rows.forEach(e => e.remove());
    
    if($tbody.children.length == 0) $trash.classList.add('hide');
})

btnAgregar.addEventListener('click',c => {
    const $fecha = document.getElementById('inputDate');
    const $numE = document.getElementById('numE');
    const $nomE = document.getElementById('nomE');
    const $area = document.getElementById('area');
    const $novedad = document.getElementById('novedad');
    const $detalle = document.getElementById('detalle');
    const novedadAgregada = `<td>${$fecha.value}</td><td>${$numE.value}</td><td>${$nomE.value}</td><td>${$area.value}</td><td>${$novedad.value}</td><td>${$detalle.value}</td>`;
    
    const $trNuevo = document.createElement('tr');
    
    $trNuevo.classList.add('trBody');
    
    $trNuevo.addEventListener('click',() => $trNuevo.classList.toggle('selected'));
    
    $trNuevo.innerHTML = novedadAgregada;
    
    $tbody.appendChild($trNuevo);
    
    if($trash.classList.contains('hide')) $trash.classList.remove('hide');
    
});

async function registrarDatos(datosRegistro){

    const dataOjb = {
      data: datosRegistro,
      email: 'jdavid@g.com'
    }
  
    const json = JSON.stringify(dataOjb);
    
    const content = {
        "method": "post",
        "Content-type":"application/json",
        "body": json
    };
  
    try{
        const req = await fetch(url,content);
        const res = await req.json();
  
    }catch(err){
      console.log(err)
    }
    
    
}

btnEnviar.addEventListener('click', e => {
    let datosRegistros = [];
    const $rows = $tbody.querySelectorAll('tr');
    $rows.forEach(el => {
        let ar = [];
        const $cells = el.children;
        const n = $cells.length;
        const index = datosRegistros.length;
        
        for(let i=0; i < n;i++){
            ar.push($cells.item(i).innerHTML)
        }
        
        datosRegistros.push(ar);
        
    })
    
    registrarDatos(datosRegistros);
    
    $tbody.querySelectorAll('tr').forEach(row => row.remove());
    
})



/*  

*****************************************************************************************************
********************************** Caja de seleccion personalizada **********************************
*****************************************************************************************************

Este es el codigo que controla el funcionamiento
de las cajas de seleccion.

*/

const $formOptionsDiv = document.querySelectorAll('.form__options-div');

$formOptionsDiv.forEach(e => {
const $formOptionsInput = e.querySelector('.form__input');
const $formOptionsContainer = e.querySelector('.form__options-container');
const $formOptions = $formOptionsContainer.querySelectorAll('.form__option');

$formOptionsInput.addEventListener('input',() => {
    const text = $formOptionsInput.value.toUpperCase();
    if(text != ''){
    $formOptions.forEach(o => {
        if(!$formOptionsContainer.classList.contains('active')) $formOptionsContainer.classList.add('active');
        o.classList.add('hide');
        if(o.innerHTML.toUpperCase().includes(text)) o.classList.remove('hide');
    });
    }else{
    $formOptions.forEach(o => {
        o.classList.remove('hide');
    });

    }

})

$formOptionsInput.addEventListener('click',() => {
    $formOptionsContainer.classList.toggle('active');
    
})

e.addEventListener('click',el => {
    if(el.target.classList.contains('form__option')){
    const selected = el.target.innerHTML;
    $formOptionsInput.value = selected;
    $formOptionsContainer.classList.remove('active');
    }
})

})


/* ***************************************************************************************************** */