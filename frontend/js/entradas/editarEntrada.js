datos();

if(mostrandoDatosEntrada){
    let entrada = mostrandoDatosEntrada;
    console.log(entrada);
}



let ckEditor = document.querySelector('#editor1');
let contenidoCkEditor = document.createTextNode(entrada);
ckEditor.appendChild(contenidoCkEditor);

async function datos(){
    localStorage.getItem('idEntrada')

    const editarArticulo = localStorage.getItem('idEntrada');

    try{
        const url = `../backend/entradas/datosEntrada.php?id_entrada=${editarArticulo}`;
        
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const { entrada } = datos;
        mostrandoDatosEntrada(entrada);

    }catch(error){
        console.log(error);
    }
}


// hola();
// async function hola(){
        

//         // fetch(url)
//         //     .then((response) => response.json())
//         //     .then(mostrandoDatosEntrada)
//         //     .catch(console.log);

//         //     let ckEditor = document.querySelector('#editor1');
//         //     let contenidoCkEditor = document.createTextNode(entrada[2]);
//         //     ckEditor.appendChild(contenidoCkEditor);
//     }


async function mostrandoDatosEntrada( {  entrada  }  ){
    console.log(entrada[2]);

    return entrada[2];

    //buscar manera que se use esto sin el boton
    // let titulo = entrada[0];
    // let contenido = entrada[2];
    // let descripcion = entrada[3];

    // document.querySelector('#titulo').value = titulo;
    // document.querySelector('#descripcion').value = descripcion;

    // console.log(contenido);

    // let ckEditor = document.querySelector('#editor1');
    //     let contenidoCkEditor = document.createTextNode(entrada[2]);
    //     ckEditor.appendChild(contenidoCkEditor);
        
    
    
    // let contenidoCkEditor = document.createTextNode(contenido);
    // ckEditor.appendChild(contenidoCkEditor);

    // document.querySelector('#enviarDatos').addEventListener('click',function(){

    //     let ckEditorContenido = ckEditor.querySelector('body').innerHTML = contenido;
        
    //     datosEntradaModificado = [tituloModificado, descripcionModificado, ckEditorContenido];

    // })

}