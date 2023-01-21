const body= document.querySelector(".body2");

htmlRender();
function htmlRender(){
     const user = localStorage.getItem("connected");
     if (!user) {
        body.innerHTML = loginHTML();
     }else{
        body.innerHTML = tasksHMTL();
     }
     
}

function loginHTML(){
    return `<div class="loginPage">
        <img src="../style/1_uZwrqEnmN5y6PNM8rCAhSQ.jpeg" alt="">
        <div class="loginInfo">
            <h1>ENTRAR NO SISTEMA DE RECADOS</h1>
            <div class="inputs">
                <input class="userLogin" type="text" name="login" placeholder="User"/>
                <input class="passwordLogin" type="password" name="senha" placeholder="Password"/>
            </div>
            <button onclick="enterNow()"><h2>Enter</h2></button>
            <button><h3 onclick="body.innerHTML = createAccountHTML();">Create Account</h3></button> 
        </div>
    </div>`;
}

function createAccountHTML() {
    return `<div class="registerPage">
    <img src="../style/1_uZwrqEnmN5y6PNM8rCAhSQ.jpeg" alt="">
    <div class="registerInfo">
        <h1>CREATE AN ACCOUNT</h1>
        <div class="inputsColumn">
            <input class="user" type="email" name="user" placeholder="User" required/>
            <input class="password1" type="password" name="password" placeholder="Password"/>
            <input class="password2" type="password" name="password" placeholder="Repeat Password"/>
        </div>
        <button onclick="createAcoountNow()"><h2>Create Account Now</h2></button>
        <h3 onclick="body.innerHTML = loginHTML();" > Already have an account? Login</h3>
    </div>      
</div>`
}

function tasksHMTL() {
    let user = localStorage.getItem("connected");
    let tasksUser = JSON.parse( localStorage.getItem(user));
    let tasks;

    if(!tasksUser){
        tasks = [];
    }else{
        tasks = tasksUser;
    }

    return ` <div class="tasks">
    <div class="title" > 
        <h1>Meus recados</h1> 
        <button onclick="exit()"> Sair </button> 
    </div>
    <div class="inputsTasks">
        <input class="description" type="text" name="Descrição" placeholder="Descrição" />
        <div>
            <input class="details" type="text" name="Detalhamento" placeholder="Detalhamento"/>
            <button onclick="saveTask()"><h2>Salvar</h2></button>
        </div>
    </div>
    <div class="tasksList">
        <div class=tasksInfo>
            <div>#</div>
            <div>Descrição</div>
            <div>Detalhamento</div>
            <div>Ação</div>
        </div>
        ${
            tasks.map((element, i) => {return (`
            <div class="tasksClient">
                <div>${i+1}</div>
                <div>${element.description}</div>
                <div>${element.details}</div>
                <span class="buttonsTasks">
                    <button onclick="remove(${i})" class="remove">Apagar</button>
                    <button onclick="edit(${i})" class="edit">Editar </button>
                </span>
            </div>
            `)})
        }
    </div>      
</div>` 
}

function exit(){
    localStorage.removeItem("connected"); 
    body.innerHTML = loginHTML();
}

function remove(i){
    let user = localStorage.getItem("connected");
    let task = JSON.parse(localStorage.getItem(user));

    task.splice(i,1);

    localStorage.setItem(user,JSON.stringify(task));
    window.location.reload();
}

function edit(i){
    let user = localStorage.getItem("connected");
    let task = JSON.parse(localStorage.getItem(user));
    
    let newDescription = prompt('Edite sua Descrição');
    let newDetails = prompt('Edite seu detalhadamento');
    if(newDescription.length > 2 && newDetails.length >2){
        let newTask = {
            description: newDescription,
            details: newDetails
        }
    
        task[i] = newTask;
    
        localStorage.setItem(user,JSON.stringify(task));
        window.location.reload();
    }else{
        alert("Descrição e detalhes precisar ter pelo enos 3 caracteres");
    }
}

function enterNow(){
    let userLogin = document.querySelector(".userLogin").value;
    let passwordLogin = document.querySelector(".passwordLogin").value;
    const users = JSON.parse(localStorage.getItem("users"));

    const userFilter = users.filter(element => element.user === userLogin && element.password === passwordLogin);
    
    if(userFilter.length === 0){
        alert("Usuario inválido");
    }else{
        localStorage.setItem("connected", userLogin);
        body.innerHTML = tasksHMTL();
    }
}

function saveTask(){
    let description = document.querySelector(".description").value;
    let details = document.querySelector(".details").value;

    if(description.length > 2 && details.length > 2){
        let tasks = {
            details, 
            description
        }
    
        const user = localStorage.getItem('connected')
        if(!user){
            alert("usuario não conectado");
        } else{
            if (localStorage.getItem(user) === null) {
                localStorage.setItem(user, JSON.stringify([tasks]));
            } else {
                localStorage.setItem(user,JSON.stringify([
                    ...JSON.parse(localStorage.getItem(user)),tasks]));
            }
            window.location.reload()
        } 
    }else{
        alert("Descrição e detalhes precisar ter pelo enos 3 caracteres");
    }

}

function createAcoountNow(){
    let user =  document.querySelector(".user").value;
    let password = document.querySelector(".password1").value;
    let confirmPassword = document.querySelector(".password2").value;
    
    if(user.length < 3) {
        alert("o usuário precisa ter mais de 3 caracteres");
    }else{
        if (password === confirmPassword && password.length > 3){
            saveData(user,password);
        }else{
            alert("É necessário que as senhas tenham pelo menos 4 caracteres e sejam iguais");
        }
    }

    function saveData(user,password){
        userData = {
            user,
            password
        };
        if (localStorage.getItem('users') === null) {
            localStorage.setItem('users', JSON.stringify([userData]));
          } else {
            const users = JSON.parse(localStorage.getItem("users"));
    
            const userFilter = users.filter(element => element.user === user);
            
            if(userFilter.length === 0){                
                localStorage.setItem('users',JSON.stringify([
                    ...JSON.parse(localStorage.getItem('users')),userData]));

                  window.location.reload();
            }else{
                alert("Usuário já existe");
            }
          }  
    }
}
