let usuario = undefined;

usuario = localStorage.getItem('usuario');
if (!usuario) {
    usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        window.location = '../index.html';
    }
}

const url = `/piton-4life/backend/conseguirEntrada.php?usuario=${usuario}`;

fetch(url)
    .then((response) => response.json())
    .then(mostrandoDatos)
    .catch(console.log);

function mostrandoDatos({entradas}){

    let articulos = document.querySelector('#articulos');
    let listArticulos = document.querySelector('.archivos');

    let fechaAnnio = [];
    let fechaMes = [];
    let sinFiltroAnnioMes = [];
    let arrayDatosFecha = [];
    let i = 0;

    let entradaId = undefined;
    let entradaTitulo = undefined;
    let entradaImagen = undefined;
    let entradaContenido = undefined;
    let entradaDescripcion = undefined;
    let entradaFecha = undefined;

    for(let informacionEntrada of entradas){
        
        entradaTitulo = informacionEntrada[0];
        entradaImagen = informacionEntrada[1];
        entradaContenido = informacionEntrada[2];
        entradaDescripcion = informacionEntrada[3];
        entradaFecha = informacionEntrada[4];
        entradaId = informacionEntrada[5];

        //Inicio de la entrada

        let divUbicar = document.createElement('div');
        divUbicar.setAttribute('id',entradaId);
        divUbicar.setAttribute('class','ubicar');
        articulos.appendChild(divUbicar);
        
        let divBackground = document.createElement('div');
        divBackground.setAttribute('id','background');
        divBackground.setAttribute('class','background');
        divUbicar.appendChild(divBackground);

        let img = document.createElement('img');
        img.setAttribute('src', `./imagenes/main.jpg`);
        img.setAttribute('style','width:100px;');
        img.setAttribute('style','height:100px;');
        divBackground.appendChild(img);
        
        let titulo = document.createElement('h3');
        titulo.setAttribute('class','titulo');
        divBackground.appendChild(titulo);
        
        let contenidoTitulo = document.createTextNode(entradaTitulo);
        titulo.appendChild(contenidoTitulo);

        let fecha = document.createElement('p');
        fecha.setAttribute('class','fecha');
        divBackground.appendChild(fecha);
        
        let contenidoFecha = document.createTextNode(entradaFecha);
        fecha.appendChild(contenidoFecha);

        //Trespuntos

        let divTresPuntos = document.createElement('div');
        divTresPuntos.setAttribute('class','tresPuntos');
        divBackground.appendChild(divTresPuntos);

        let pFocus = document.createElement('p');
        divTresPuntos.appendChild(pFocus);

        let tresPuntos = document.createElement('img');
        tresPuntos.setAttribute('src','./imagenes/tresPuntos.svg');
        tresPuntos.setAttribute('style','width:50px;');
        tresPuntos.setAttribute('style','height:50px;');
        pFocus.appendChild(tresPuntos);

        let buttonEditar = document.createElement('input');
        buttonEditar.setAttribute('type','button');
        buttonEditar.setAttribute('id','buttonEditar');
        buttonEditar.setAttribute('id',entradaId);
        buttonEditar.setAttribute('value','Editar articulo');
        buttonEditar.addEventListener('click',editarArticulo);
        divTresPuntos.appendChild(buttonEditar);

        let buttonEliminar = document.createElement('input');
        buttonEliminar.setAttribute('type','button');
        buttonEliminar.setAttribute('id','buttonEliminar');
        buttonEliminar.setAttribute('id',entradaId);
        buttonEliminar.setAttribute('value','Eliminar entrada');
        buttonEliminar.addEventListener('click',eliminarArticulo);
        divTresPuntos.appendChild(buttonEliminar);

        //Fin trespuntos

        let details = document.createElement('details');
        details.setAttribute('class','descripcion');
        divBackground.appendChild(details);

        let summary = document.createElement('summary');
        divBackground.appendChild(summary);

        var entrada = new DOMParser().parseFromString(entradaContenido,"text/html").body.firstChild;
        details.appendChild(entrada);

        let year = entradaFecha.split("-");

        var archivoAnnoMes = new Object();
        archivoAnnoMes.anno = year[0];
        archivoAnnoMes.mes = year[1];
        archivoAnnoMes.titulo = entradaTitulo;
        archivoAnnoMes.id = entradaId;

        var datosFecha = new Object();
        datosFecha.anno = year[0];
        datosFecha.mes = year[1];

        sinFiltroAnnioMes[i] = archivoAnnoMes;
        arrayDatosFecha[i] = datosFecha;
        fechaAnnio[i] = year[0];
        fechaMes[i] = year[1];
        i++;

    }

    let set = new Set( arrayDatosFecha.map( JSON.stringify ) )
    let conFiltroAnnioMes = Array.from( set ).map( JSON.parse );

    var yearUnico = [... new Set(fechaAnnio)];
    var mesUnico = [... new Set(fechaMes)];

    let indice = 0;

    for(let year of yearUnico){

        // ESTE BUCLE IMPRIME LI AÑOS
        let labelYear = document.createElement('label');
        labelYear.setAttribute('for',year);
        listArticulos.appendChild(labelYear);

        let textYear = document.createTextNode(year);
        labelYear.appendChild(textYear);

        let ckBoxYear = document.createElement('input');
        ckBoxYear.setAttribute('type','checkbox');
        ckBoxYear.setAttribute('id',year);
        listArticulos.appendChild(ckBoxYear);

        let liYear = document.createElement('li');
        liYear.setAttribute('class','YearArchivo');
        listArticulos.appendChild(liYear);

        // ESTE BUCLE PARA CADA AÑO IMPRIME LOS LI MESES
        for(let mes of mesUnico){
            
            for(let mesPorAnnio of conFiltroAnnioMes){

                if(mesPorAnnio.anno == year && mesPorAnnio.mes == mes){

                    let labelMes = document.createElement('label');
                    labelMes.setAttribute('for',indice);
                    liYear.appendChild(labelMes);

                    let textMes = document.createTextNode(mes);
                    labelMes.appendChild(textMes);

                    let ckBoxMes = document.createElement('input');
                    ckBoxMes.setAttribute('type','checkbox');
                    ckBoxMes.setAttribute('id',indice);
                    liYear.appendChild(ckBoxMes);

                    let liMonth = document.createElement('ul');
                    liMonth.setAttribute('class','MesArchivo');
                    liYear.appendChild(liMonth);

                    let ul = document.createElement('li');
                    ul.setAttribute('class','MesArchivo');
                    liMonth.appendChild(ul);

                    indice++;
                    // ESTE BUCLE POR CADA MES BUSCA LAS ENTRADAS CORRESPONDIENTES Y LAS IMPRIME EN FORMA DE ANCLA
                    for(let entrada of sinFiltroAnnioMes){

                        if(entrada.anno == year && entrada.mes == mes){
    
                            let aEntrada = document.createElement('a');
                            aEntrada.setAttribute('class','MesArchivo');
                            aEntrada.setAttribute('href', `#${entrada.id}`);
                            ul.appendChild(aEntrada);
    
                            let textEntrada = document.createTextNode(entrada.titulo);
                            aEntrada.appendChild(textEntrada);
        
                        }
    
                    }

                }

            }
        }
    }

}

function eliminarArticulo(e){
    
    const articuloEliminar = e.currentTarget.id;

    const url = `/piton-4life/backend/eliminarArticulo.php?id_entrada=${articuloEliminar}`;
    fetch(url)
        .then((response) => response.json())
        .then(window.location.reload())
        .catch(console.log);

}

//Preguntarle a manuel para otra solucion
function editarArticulo(e){

    const editarArticulo = e.currentTarget.id;

    localStorage.setItem('idEntrada',editarArticulo);

    window.location = './crearEntrada.html'

}