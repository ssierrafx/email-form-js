document.addEventListener('DOMContentLoaded', () => {
    
    const campos = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionamos los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc')
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    // Asignar eventos
    inputEmail.addEventListener('blur', validar)
    inputCC.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)
    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        reiniciarFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')
            reiniciarFormulario();

            //Crear una alerta
            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente'
            formulario.appendChild(alertaExito)
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000)
    }

    function validar(e) {
            if(e.target.value.trim() === '' && e.target.id !== 'cc'){
                mostrarAlerta(`El campo ${e.target.id} no puede estar vacío.`, e.target.parentElement);
                campos[e.target.name] = '';
                comprobarCampo();
                return;
            } 
            if (e.target.id === 'email' && !validarEmail(e.target.value)){
                mostrarAlerta(`El ${e.target.id} no es válido`, e.target.parentElement);
                campos[e.target.name] = '';
                comprobarCampo();
                return;
            }
            if (e.target.id === 'cc'){
                if (!validarEmail(e.target.value)){
                    mostrarAlerta(`El ${e.target.id} no es válido`, e.target.parentElement);
                    if (e.target.value === ''){
                        limpiarAlerta(e.target.parentElement)
                    }
                    return;
                }
            }
        limpiarAlerta(e.target.parentElement)   
        // Asignar los valores
        campos[e.target.name] = e.target.value.trim().toLowerCase();
        // Comprobar el objeto campos
        comprobarCampo();
    } 

    function mostrarAlerta(mensaje, ref) {
        limpiarAlerta(ref);
        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        // Inyectar el error al formulario
        ref.appendChild(error)
    }

    function limpiarAlerta(ref) {
        // Eliminando las alertas
        const alerta = ref.querySelector('.bg-red-600')
        if (alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        // Expresion regular
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarCampo() {
        if (Object.values(campos).includes('')){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }

    function reiniciarFormulario(){
        campos.email = ''
        campos.asunto = ''
        campos.mensaje = ''

        formulario.reset();
        comprobarCampo();
        
        Array.from(formulario.children).forEach(e => {
            limpiarAlerta(e);
        })
    }

})

